import classes from "./VoiceRecording.module.scss";
import { useState, useEffect, useRef } from "react";
import { useMicVAD } from "@ricky0123/vad-react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useGradio } from "../../services/GradioContext";

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

  const [isListening, setIsListening] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [levels, setLevels] = useState(new Array(10).fill(3));
  const [_, setAudioURL] = useState<string | null>(null); // Store the audio URL for download
  const [loadingGradio, setLoadingGradio] = useState<boolean>(false); // Store the audio URL for download

  // Create refs for managing the media recorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hook from @ricky0123/vad-react
  const vad = useMicVAD({
    onSpeechStart: () => {
      if (isHolding) {
        console.log("Speech started");
      }
    },
    onSpeechEnd: () => {
      if (isHolding) {
        console.log("Speech ended");
      }
    },
    startOnLoad: false // Don't start VAD immediately
  });

  const { userSpeaking } = vad;

  // Start/Stop recording logic
  const startRecording = () => {
    setAudioURL(null); // Reset the audio URL before starting a new recording
    audioChunksRef.current = []; // Clear previous audio chunks
    setIsHolding(true);
    setRecordingDuration(0);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl); // Set the audio URL for download
          if (audioChunksRef.current.length > 0) {
            callGradioApi(audioBlob); // Call Gradio API with the recorded audio
          }
        };

        mediaRecorder.start();

        // Start the recording duration timer
        recordingTimerRef.current = setInterval(() => {
          setRecordingDuration((prev) => prev + 100);
        }, 100);
      })
      .catch((error) => {
        console.error("Error accessing microphone: ", error);
        setIsHolding(false);
        setIsListening(false);
      });
  };

  const stopRecording = () => {
    setIsHolding(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setRecordingDuration(0);
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
    setLoadingGradio(true);
    setResult(null);
    try {
      const file = new File([audioBlob], "recording.webm", {
        type: "audio/webm",
      });
      // const response = await fetch(referenceAudioUrl ?? 'https://audio.aralects.com/promt1_highlighted_word.wav');
      // const referenceAudioBlob = await response.blob();

      const result = await client.predict("/run_demo", {
        dialect: returnDialectAcronym(localStorage.getItem("dialectName")),
        theme: returnThemeAcronym(localStorage.getItem("themeName")),
        sentence_id: sentenceId.toString(),
        // reference_audio: referenceAudioBlob ?? file,
        input_audio: file,
      });

      const data: [] | any = result?.data;

      console.log("Gradio API Response:", data[0]);
      setResult(data[0]);
    } catch (error) {
      console.error("Error calling Gradio API:", error);
      // setResult(true);
    }
    setLoadingGradio(false);
  };

  useEffect(() => {
    setIsRecording(isListening);

    // Start recording when user starts speaking
    if (isListening) {
      startRecording();
    }
  }, [isListening]);

  useEffect(() => {
    if (!isHolding) {
      setLevels(new Array(10).fill(3));
      setLevelsHeight(0);
      return;
    }

    // Create an interval to continuously update levels
    const interval = setInterval(() => {
      if (userSpeaking) {
        // When speaking, create dynamic levels
        const newLevel = Math.random() * 20 + 5; // Random between 5 and 25
        setLevels(new Array(10).fill(newLevel));
        setLevelsHeight(newLevel);
      }else {
        // When not speaking but holding, maintain a base level
        setLevels(new Array(10).fill(0));
        setLevelsHeight(0);
      }
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [userSpeaking, isHolding]);

  // Stop microphone when the app is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopRecording();
        setIsListening(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  // Add a new effect to control VAD start/stop
  useEffect(() => {
    if (isHolding) {
      vad.start(); // Start VAD when holding
    } else {
      vad.pause(); // Pause VAD when not holding
    }
  }, [isHolding]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsHolding(true);
    setIsListening(true);
    startRecording();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsHolding(false);
    setIsListening(false);
    stopRecording();
  };

  // Prevent context menu from appearing
  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      {/* <div className={classes.recordingBackground} /> */}
      <p className={classes.micTitle}>
        {loadingGradio
          ? "Loading..."
          : isHolding
            ? `Recording${".".repeat(Math.floor(recordingDuration / 500) % 4)}`
            : "Hold to record"}
      </p>
      <div className="flex flex-col items-center space-y-4">
        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onContextMenu={preventContextMenu}
          className={`${classes.mic} ${isHolding ? classes.recording : ""}`}
          disabled={loadingGradio}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {loadingGradio ? (
            <div className="loader" />
          ) : isListening ? (
            <div className={classes.barsContainer}>
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
                    animate={{ height: level / 3 }}
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
            </div>
          ) : (
            <Mic size={48} color="white" />
          )}
        </motion.button>

        {/* Display download link if audio is recorded */}
        {/* {audioURL && (
                    <a href={audioURL} download="recording.wav">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Download .WAV</button>
                    </a>
                )} */}
      </div>
    </div>
  );
};

export default VoiceRecording;
