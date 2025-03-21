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

  // Pre-initialize audio context and request permissions on component mount
  useEffect(() => {
    // Create audio context early to reduce delay on first click
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // For iOS, we need user interaction to resume, so we'll do this later
        if (audioContextRef.current.state === 'suspended' && 
            !(/iPad|iPhone|iPod/.test(navigator.userAgent))) {
          audioContextRef.current.resume().catch(console.error);
        }
        
        // Pre-create analyzer
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 1024;
        analyserRef.current.minDecibels = -90;
        analyserRef.current.maxDecibels = -10;
        analyserRef.current.smoothingTimeConstant = 0.85;
        
      } catch (error) {
        console.warn('Failed to pre-initialize audio context:', error);
      }
    }

    // Pre-request microphone permissions
    const requestPermission = async () => {
      try {
        // Directly request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
        setHasPermission(true);
      } catch (error) {
        console.warn('Failed to request microphone permission:', error);
      }
    };

    requestPermission();
    
    // Check for MediaRecorder API support
    if (!window.MediaRecorder) {
      console.warn('MediaRecorder API is not supported on this browser.');
    }
    
    // Clean up on unmount
    return () => {
      stopRecording();
    };
  }, []);

  useEffect(() => {
    if (isHolding) {
        startLevelMonitoring();
    }
  }, [isHolding]);

  useEffect(() => {
    // Handle audio interruptions (iOS specific)
    const handleVisibilityChange = () => {
      if (document.hidden && isHolding) {
        // Page is hidden or app switched, stop recording
        setIsHolding(false);
        setIsRecording(false);
        stopRecording();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isHolding]);

  // Immediately start capturing audio on press
  const startRecording = async () => {
    // Set state immediately for instant feedback
    setIsHolding(true);
    setIsRecording(true);
    setIsInitializing(true);
    
    // Set initial visual feedback values
    setLevels(new Array(10).fill(3));
    setLevelsHeight(3);
    
    // Start timer immediately for visual feedback
    recordingTimerRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 100);
    }, 100);
    
    try {
      // Clean up any existing resources first - do this quickly
      cleanupExistingResources();

      // Reset states
      setAudioURL(null);
      audioChunksRef.current = [];
      setRecordingDuration(0);

      // Get audio stream - this should now be instant since we pre-requested permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Setup audio context if not already initialized
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // iOS Safari often initializes AudioContext in suspended state
      if (audioContextRef.current.state === 'suspended') {
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
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
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
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            callGradioApi(audioBlob);
          }
        } catch (error) {
          console.error('Error handling recorded audio:', error);
        }
      };

      // Start recording
      mediaRecorder.start();

      startLevelMonitoring();
      
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
    // Stop media recorder and tracks
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.warn('Error stopping media recorder:', e);
      }
    }
    
    // Release media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
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
        console.warn('Error disconnecting source:', e);
      }
      sourceRef.current = null;
    }
    
    // Keep analyser but reset
    
    // Clear animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Clear timer but create a new one immediately
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    // Reset audio chunks
    audioChunksRef.current = [];
    
  };

  const startLevelMonitoring = () => {
    
    // If analyzer isn't available yet, use fake data until it is
    if (!analyserRef.current) {
      // Use fake data until analyzer is ready
      const fakeLevelUpdate = () => {
        if (!isHolding) return;
        
        // Create a gentle "waiting" animation
        const randomVariation = Math.random() * 0.5 + 4.5; // 4.5-5 range
        setLevels(new Array(10).fill(randomVariation));
        setLevelsHeight(randomVariation);
        
        // Continue until analyzer is ready or recording stops
        if (analyserRef.current) {
          startRealLevelMonitoring();
        } else if (isHolding) {
          setTimeout(fakeLevelUpdate, 100);
        }
      };
      
      fakeLevelUpdate();
      return;
    }
    
    startRealLevelMonitoring();
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
        console.error('Analyser no longer available. Stopping level monitoring.');
        return;
      }

      try {
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average volume level
        const average = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(20, (average / 8) * 20); // Even more sensitive normalization
        
        // Set a minimum level when holding but not speaking
        const finalLevel = normalizedLevel < 4 ? 2 : normalizedLevel;
        
        setLevels(new Array(10).fill(finalLevel));
        setLevelsHeight(finalLevel);
        
        // Continue monitoring
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      } catch (error) {
        console.error('Error in updateLevels:', error);
        // Still try to continue monitoring
        animationFrameRef.current = requestAnimationFrame(updateLevels);
      }
    };
    
    updateLevels();
  };

  const stopRecording = () => {
    try {
      // Stop media recorder and tracks
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        streamRef.current = null;
      }

      // Clean up audio context and nodes
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }

      // Only close AudioContext if needed
      // We'll keep it open to improve responsiveness for the next recording
      // if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      //   audioContextRef.current.close().catch(console.error);
      //   audioContextRef.current = null;
      // }

      // Clean up animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Clear timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }

      // Reset states
      setRecordingDuration(0);
      setLevels(new Array(10).fill(3));
      setLevelsHeight(0);
      setIsInitializing(false);
      
      // Keep audioContextRef and analyserRef alive for faster initialization next time
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  };

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
      console.warn('Gradio client not available');
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
    setIsHolding(false);
    setIsRecording(false);
    stopRecording();
  };

  // Prevent context menu from appearing
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <p className={classes.micTitle}>
        {isGradioLoading 
          ? "Connecting to server..."
          : loadingGradio
            ? "Processing..."
            : isHolding
              ? isInitializing
                ? "Initializing..." 
                : `Recording${".".repeat(Math.floor(recordingDuration / 500) % 4)}`
              : "Hold to record"}
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
