import { Client } from "@gradio/client";
import React, { createContext, useContext, useEffect, useState } from "react";

const GradioContext = createContext<Client | null>(null);

const HF_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;

export const GradioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gradioClient, setGradioClient] = useState<Client | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const client = await Client.connect("aralects/PronunciationChecker", {
          hf_token: HF_TOKEN as `hf_${string}`,
        });
        setGradioClient(client);
      } catch (error) {
        console.error("Failed to connect to Gradio:", error);
      }
    };

    initializeClient();
  }, []);

  return (
    <GradioContext.Provider value={gradioClient}>
      {children}
    </GradioContext.Provider>
  );
};

export const useGradio = () => {
  const context = useContext(GradioContext);
  if (!context) {
    throw new Error("useGradio must be used within a GradioProvider");
  }
  return context;
};
