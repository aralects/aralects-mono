import { useEffect, useState } from 'react';
import './App.scss';
import homeIndicator from './assets/images/homeIndicator(black).png';
import statusBar from './assets/images/StatusBar(black).png';
import { MainLayout } from './layouts/mainLayout.tsx';
import { SecondeLayout } from './layouts/secondLayout.tsx';
import PronounceSwipeComponent from './components/PromptComponent/PromptSwipeComponent.tsx';
import SplashScreen from './components/SplashScreen/SplashScreen.tsx';
import BackImage from "./assets/pronounceImages/bg.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();

    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className='Background'>
        <span className="background-images"/>
        <span className="top-left-image"/>
        <div className={`App`}>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <>
              <img src={statusBar} alt="Status Bar" className="status-bar" />
              <img src={homeIndicator} alt="Home Indicator" className="home-indicator" />
              <img src={BackImage} alt="upper background" className="middleImageStyle" />
            </>
          )}

          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/choose-theme" element={<SecondeLayout />} />
            <Route path="/prompt" element={<PronounceSwipeComponent />} />
          </Routes>

       
        </div>
      </div>
    </Router>
  );
}

export default App;
