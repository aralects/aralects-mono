import classes from "./VoiceRecording.module.scss";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useGradio, useGradioLoading } from "../../services/GradioContext";

interface VoiceRecordingProps {
  setResult: any;
  sentenceId: number;
  setIsRecording: (value: boolean) => void;
  setLevelsHeight: (value: number) => void;
}

const VoiceRecording: React.FC<VoiceRecordingProps> = ({
  setResult,
  sentenceId,
  setIsRecording,
  setLevelsHeight,
}) => {
  const client = useGradio();
  // Added loading state to insure gradio loaded before using it
  const isGradioLoading = useGradioLoading();
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [levels, setLevels] = useState(new Array(10).fill(3));
  const [_, setAudioURL] = useState<string | null>(null);
  const [loadingGradio, setLoadingGradio] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [_hasPermission, setHasPermission] = useState<boolean>(false);

  // Refs for audio handling
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const MIN_RECORDING_TIME = 1500; // 1.5 seconds in milliseconds
  const MAX_RECORDING_TIME = 10000; // 10 seconds in milliseconds

  const recordingStartTimeRef = useRef<number>(0);

  // HTTP request to get the media with fallback
  const requestMediaWithFallback = async () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    try {
      // For Safari/iOS, we need to handle audio session differently
      if (isIOS || isSafari) {
        // Ensure audio context is created and resumed on user interaction
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }

        if (audioContextRef.current.state === "suspended") {
          await audioContextRef.current.resume();
        }

        // iOS Safari specific constraints
        const constraints = {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            // Safari/iOS specific settings
            sampleRate: 44100,
            channelCount: 1,
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
      }

      // Standard approach for other browsers
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "NotAllowedError" &&
        !window.isSecureContext
      ) {
        console.warn(
          "Running in insecure context. This should only be used for testing!",
        );

        // Legacy fallback (mainly for older browsers)
        if (navigator.mediaDevices === undefined) {
          type LegacyGetUserMedia = (
            constraints: MediaStreamConstraints,
            successCallback: (stream: MediaStream) => void,
            errorCallback: (error: Error) => void,
          ) => void;

          const oldGetUserMedia = ((navigator as any).getUserMedia ||
            (navigator as any).webkitGetUserMedia ||
            (navigator as any).mozGetUserMedia ||
            (navigator as any).msGetUserMedia) as
            | LegacyGetUserMedia
            | undefined;

          if (oldGetUserMedia) {
            return new Promise<MediaStream>((resolve, reject) => {
              oldGetUserMedia(
                {
                  audio:
                    isIOS || isSafari
                      ? {
                          echoCancellation: true,
                          noiseSuppression: true,
                          autoGainControl: true,
                          sampleRate: 44100,
                          channelCount: 1,
                        }
                      : true,
                },
                (stream) => resolve(stream),
                (err) => reject(err),
              );
            });
          }
        }
      }

      // If it's a permission error on iOS/Safari, try to show a more helpful message
      if (isIOS || isSafari) {
        if (error instanceof Error) {
          switch (error.name) {
            case "NotAllowedError":
              console.error(
                "Microphone access denied. On iOS, check your Safari settings and ensure microphone access is enabled.",
              );
              break;
            case "NotFoundError":
              console.error(
                "No microphone found. Please ensure your device has a working microphone.",
              );
              break;
            case "NotReadableError":
              console.error(
                "Microphone is already in use or not working properly.",
              );
              break;
          }
        }
      }

      throw error;
    }
  };

  // Pre-initialize audio context and request permissions on component mount
  useEffect(() => {
    // Create audio context early to reduce delay on first click
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();

        if (
          audioContextRef.current.state === "suspended" &&
          !/iPad|iPhone|iPod/.test(navigator.userAgent)
        ) {
          audioContextRef.current.resume().catch(console.error);
        }

        // Pre-create analyzer
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 1024;
        analyserRef.current.minDecibels = -90;
        analyserRef.current.maxDecibels = -10;
        analyserRef.current.smoothingTimeConstant = 0.85;
      } catch (error) {
        console.warn("Failed to pre-initialize audio context:", error);
      }
    }

    // Pre-request microphone permissions
    const requestPermission = async () => {
      try {
        // Directly request microphone access
        // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const stream = await requestMediaWithFallback();
        stream.getAudioTracks().forEach((track) => track.stop());
        setHasPermission(true);
      } catch (error) {
        console.warn("Failed to request microphone permission:", error);
      }
    };

    requestPermission();

    // Check for MediaRecorder API support
    if (!window.MediaRecorder) {
      console.warn("MediaRecorder API is not supported on this browser.");
    }

    // Clean up on unmount
    return () => {
      stopRecording();
    };
  }, []);

  useEffect(() => {
    if (isHolding) {
      startRealLevelMonitoring();
    }
  }, [isHolding]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isHolding) {
        setIsHolding(false);
        setIsRecording(false);
        stopRecording();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isHolding]);

  // Immediately start capturing audio on press
  const startRecording = async () => {
    console.log("Starting recording...");

    cleanupExistingResources();

    recordingStartTimeRef.current = Date.now();
    setIsHolding(true);
    setIsRecording(true);
    setIsInitializing(true);

    setLevels(new Array(10).fill(3));
    setLevelsHeight(3);

    try {
      setAudioURL(null);
      audioChunksRef.current = [];

      // Get audio stream
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const stream = await requestMediaWithFallback();
      streamRef.current = stream;

      // Setup audio context if not already initialized
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      // iOS Safari often initializes AudioContext in suspended state
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      // Setup analyzer if not already initialized
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 1024;
        analyserRef.current.minDecibels = -90;
        analyserRef.current.maxDecibels = -10;
        analyserRef.current.smoothingTimeConstant = 0.85;
      }

      // Connect source to analyzer
      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);

      // Set up media recorder
      // const mediaRecorder = new MediaRecorder(stream, {
      //   mimeType: 'audio/webm;codecs=opus'
      // });
      // Replaced the mimeType with the default browser one
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        try {
          const recordingDuration = Date.now() - recordingStartTimeRef.current;

          // Check duration before processing the audio
          if (recordingDuration < MIN_RECORDING_TIME) {
            console.log("Recording too short, discarding...");
            return;
          }

          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            callGradioApi(audioBlob);
          }
        } catch (error) {
          console.error("Error handling recorded audio:", error);
        }
      };

      // Start the media recorder
      mediaRecorder.start();

      // Finally, start the timer AFTER everything else is set up
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          const newDuration = prev + 100;
          console.log("Timer tick, updating duration to:", newDuration);
          return newDuration;
        });
      }, 100);
    } catch (error) {
      console.error("Error in recording setup:", error);
      setIsHolding(false);
      setIsRecording(false);
    } finally {
      setIsInitializing(false);
    }
  };

  // Faster cleanup method to use when starting a new recording
  const cleanupExistingResources = () => {
    console.log("Cleaning up resources");

    // Clear timer first
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // Reset duration
    setRecordingDuration(0);

    // Stop media recorder and tracks
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn("Error stopping media recorder:", e);
      }
    }

    // Release media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }

    // Disconnect but don't close audio context
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (e) {
        console.warn("Error disconnecting source:", e);
      }
      sourceRef.current = null;
    }

    // Keep analyser but reset

    // Clear animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset audio chunks
    audioChunksRef.current = [];
  };

  const startRealLevelMonitoring = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const updateLevels = () => {
      // Check if we should continue monitoring
      if (!isHolding) {
        return;
      }

      if (!analyserRef.current) {
        console.error(
          "Analyser no longer available. Stopping level monitoring.",
        );
        return;
      }

      try {
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume level
        const average =
          dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(20, (average / 8) * 20); // Even more sensitive normalization

        // Set a minimum level when holding but not speaking
        const finalLevel = normalizedLevel < 4 ? 2 : normalizedLevel;

        setLevels(new Array(10).fill(finalLevel));
        setLevelsHeight(finalLevel);

        // Continue monitoring
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      } catch (error) {
        console.error("Error in updateLevels:", error);
        // Still try to continue monitoring
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      }
    };

    updateLevels();
  };

  const stopRecording = () => {
    // Clear timer first
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    // Reset duration immediately
    setRecordingDuration(0);

    const recordingDuration = Date.now() - recordingStartTimeRef.current;

    // If recording is too short, just cleanup
    if (recordingDuration < MIN_RECORDING_TIME) {
      console.log("Recording too short, discarding...");
      // Release media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }

      // Reset visual states
      setLevels(new Array(10).fill(3));
      setLevelsHeight(0);
      setIsInitializing(false);
      return;
    }

    try {
      // Only stop mediaRecorder if recording is long enough
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      // Clean up audio context and nodes
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }

      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Reset states
      setLevels(new Array(10).fill(3));
      setLevelsHeight(0);
      setIsInitializing(false);

      // Release media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }

      // Keep audioContextRef and analyserRef alive for faster initialization next time
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  };

  // Add effect to handle max recording time
  useEffect(() => {
    let maxRecordingTimeout: NodeJS.Timeout;

    if (isHolding) {
      maxRecordingTimeout = setTimeout(() => {
        if (isHolding) {
          setIsHolding(false);
          setIsRecording(false);
          stopRecording();
        }
      }, MAX_RECORDING_TIME);
    }

    return () => {
      if (maxRecordingTimeout) {
        clearTimeout(maxRecordingTimeout);
      }
    };
  }, [isHolding]);

  const returnDialectAcronym = (dialectName: string | null) => {
    switch (dialectName?.toLowerCase()) {
      case "levantine":
        return "leb";
      case "egyptian":
        return "egy";
      case "maghrebi":
        return "mor";
      case "gulf":
        return "emir";

      default:
        return "";
    }
  };

  const returnThemeAcronym = (themeName: string | null) => {
    switch (themeName?.toLowerCase()) {
      case "names and introductions":
        return "introducing_yourself";
      case "salutations and greetings":
        return "greetings";
      case "food and drink culture":
        return "restaurant";
      case "family":
        return "family";

      default:
        return "";
    }
  };

  // GRADIO
  const callGradioApi = async (audioBlob: Blob) => {
    if (!client) {
      console.warn("Gradio client not available");
      setLoadingGradio(false);
      return;
    }

    setLoadingGradio(true);
    setResult(null);
    try {
      const file = new File([audioBlob], "recording.webm", {
        // type: "audio/webm",
        // Replaced the mimeType with the default browser one
        type: audioBlob.type,
      });

      const result = await client.predict("/run_demo", {
        dialect: returnDialectAcronym(localStorage.getItem("dialectName")),
        theme: returnThemeAcronym(localStorage.getItem("themeName")),
        sentence_id: sentenceId.toString(),
        input_audio: file,
      });

      const data: [] | any = result?.data;

      setResult(data[0]);
    } catch (error) {
      console.error("Error calling Gradio API:", error);
    }
    setLoadingGradio(false);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    startRecording();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();

    // Clear timer and reset duration first
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setRecordingDuration(0);

    // Then update other states
    setIsHolding(false);
    setIsRecording(false);
    stopRecording();
  };

  // Prevent context menu from appearing
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  console.log("Render: recordingDuration =", recordingDuration);

  return (
    <div className={classes.container}>
      <p className={classes.micTitle}>
        {isGradioLoading ? (
          "Connecting to server..."
        ) : loadingGradio ? (
          "Processing..."
        ) : isHolding ? (
          <div className={classes.recordingStatus}>
            {isInitializing || recordingDuration < MIN_RECORDING_TIME ? (
              <span className={classes.minTimeHint}>
                Don't start just yet...
              </span>
            ) : (
              <span className={classes.timer}>
                Recording{".".repeat(Math.floor(recordingDuration / 300) % 4)}
              </span>
            )}
          </div>
        ) : (
          "Hold to record"
        )}
      </p>
      <div className="flex flex-col items-center space-y-4">
        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onContextMenu={preventContextMenu}
          className={`${classes.mic} ${isHolding ? classes.recording : ""} ${isInitializing ? classes.initializing : ""}`}
          disabled={loadingGradio || isGradioLoading}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {loadingGradio ? (
            <div className="loader" />
          ) : isHolding ? (
            <div className={classes.barsContainer}>
              <div className={classes.bar}>
                {levels.map((level, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: level / 6 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className={classes.bar}>
                {levels.map((level, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: level / 5 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <div className={classes.bar}>
                {levels.map((level, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: level / 6 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Mic size={48} color="white" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default VoiceRecording;
