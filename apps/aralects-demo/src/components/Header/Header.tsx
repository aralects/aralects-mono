import classes from "./Header.module.scss";
import languageSign from "../../assets/pronounceImages/languageSign.png";
import logoImage from "../../assets/images/logoImage.png";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    isArabic: boolean;
    toggleLanguage: () => void;
}
function Header({ isArabic, toggleLanguage }: HeaderProps) {
    const navigate = useNavigate();

    const backNavigate = () => {
        navigate("/choose-theme");
    }

    return (
        <>
            <img src={logoImage} alt="logo icon" className={classes.logoStyle} />
            <div className={classes.Header}>
                <button className={classes.btnExitStyle} onClick={backNavigate}>
                    <span className={classes.exitStyle}>x</span>
                </button>
                <button className={classes.languageCont} onClick={toggleLanguage}>
                    <span className={classes.LanguageInside}>
                        {isArabic ? "Arabic" : "English"}
                    </span>
                    <img src={languageSign} className={classes.imageLanguage} />
                </button>
            </div>
        </>
    );
}

export default Header;
