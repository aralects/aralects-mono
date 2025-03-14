import React, { useEffect, useState } from 'react';
import classes from './SplashScreen.module.scss';
import BackImage from "../../assets/pronounceImages/bg.png";
import logoSplash from "../../assets/images/splashLogo.png";

const SplashScreen: React.FC = () => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true); 
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={classes.splashScreen}>
            <img src={BackImage} alt="upper background" className={classes.middleImageStyle} />
            <div className={`${classes.splashLogo} ${showText ? classes.splashLogoAnimate : ''}`}>
                <img src={logoSplash} alt="logo splashed" className={classes.middleLogo} />
            </div>
        </div>
    );
};

export default SplashScreen;
