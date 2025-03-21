import { Client } from "@gradio/client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Update the context type to include loading state
interface GradioContextType {
  client: Client | null;
  loading: boolean;
}

const GradioContext = createContext<GradioContextType | null>(null);

const HF_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;

export const GradioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gradioClient, setGradioClient] = useState<Client | null>(null);
  // Added loading state to insure gradio loaded before using it
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        setLoading(true);
        const client = await Client.connect("aralects/PronunciationChecker", {
          hf_token: HF_TOKEN as `hf_${string}`,
        });
        setGradioClient(client);
      } catch (error) {
        console.error("Failed to connect to Gradio:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, []);

  return (
    <GradioContext.Provider value={{ client: gradioClient, loading }}>
      {children}
    </GradioContext.Provider>
  );
};

export const useGradio = () => {
  const context = useContext(GradioContext);
  if (!context) {
    throw new Error("useGradio must be used within a GradioProvider");
  }
  return context.client;
};

// Add a new hook to check loading state
export const useGradioLoading = () => {
  const context = useContext(GradioContext);
  if (!context) {
    throw new Error("useGradioLoading must be used within a GradioProvider");
  }
  return context.loading;
};
