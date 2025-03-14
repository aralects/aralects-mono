import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { GradioProvider } from './services/GradioContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GradioProvider>
      <App />
    </GradioProvider>
  </StrictMode>,
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker registered:", reg))
    .catch((err) => console.error("Service Worker registration failed:", err));
}