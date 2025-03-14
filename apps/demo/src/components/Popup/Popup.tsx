import React from "react";
import classes from "./Popup.module.scss";
import logoPopUp from "../../assets/PopupImages/logopopup.png";

interface PopupProps {
  imageProp: string;
  isOpen: boolean;
  onClose: () => void;
  text1: string;
  text2: string;
  btnText: string;
  btnText2: string;
  secondBtnApear: boolean;
  bothBtns: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  text1,
  text2,
  btnText,
  btnText2,
  imageProp,
  secondBtnApear,
  bothBtns,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.popup}>
        {secondBtnApear || bothBtns ? (
          <button className={classes.btnExitStyle} onClick={onClose}>
            x
          </button>
        ) : (
          ""
        )}
        <div className={classes.firstPart}>
          <img src={logoPopUp} alt="logo icon" className={classes.iconImage} />
          <img src={imageProp} alt="Image 2" className={classes.BackImage} />
        </div>
        <div
          className={
            secondBtnApear
              ? classes.secondPart
              : bothBtns
                ? classes.secondPartheight
                : classes.secondPart
          }
        >
          <span className={classes.titleStyle}>{text1}</span>
          <span className={classes.subtitle}>{text2}</span>

          {bothBtns ? (
            <>
              <button
                className={classes.btnStyle + " " + classes.secondStyle}
                onClick={onSecondaryClick || onClose}
              >
                {btnText2}
              </button>
              <button
                className={classes.btnStyle}
                onClick={onPrimaryClick || onClose}
              >
                {btnText}
              </button>
            </>
          ) : secondBtnApear ? (
            <button
              className={classes.btnStyle + " " + classes.secondStyle}
              onClick={onSecondaryClick || onClose}
            >
              {btnText2}
            </button>
          ) : (
            <button
              className={classes.btnStyle}
              onClick={onPrimaryClick || onClose}
            >
              {btnText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
