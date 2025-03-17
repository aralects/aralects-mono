import { useState, useEffect, useRef } from "react";
import { CustomButton } from "../components/CustomButton.tsx";
import { Header } from "../components/Header.tsx";
import { Main } from "../components/Main.tsx";
import Logo from "../assets/images/logo.svg";
import SearchIcon from "../assets/images/search-icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./layouts.module.scss";
import Popup from "../components/Popup/Popup.tsx";
import maskImage from "../assets/PopupImages/MaskGroup.png";
import { Dialect } from "../types/mainLayoutInterface.ts";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.tsx";

export const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialects, setDialects] = useState<Dialect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // error state
  const [selectedDialectId, setSelectedDialectId] = useState<number | null>(
    null,
  );
  const [isPopupOpen, setPopupOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [topShadowOpacity, setTopShadowOpacity] = useState(0);
  const [bottomShadowOpacity, setBottomShadowOpacity] = useState(1);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchDialects = async () => {
      try {
        const response = await axios.get(
          "https://api.aralects.com/v1/demo/GETdialects",
        );
        setDialects(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchDialects();
  }, []);

  const filteredNationalities = dialects.filter(
    ({ dialect_name, subtitle }) =>
      dialect_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subtitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelectDialect = (dialectId: number, dialectName: string) => {
    setSelectedDialectId(dialectId);
    localStorage.setItem("dialectId", dialectId.toString());
    localStorage.setItem("dialectName", dialectName);
  };

  const handleContinue = () => {
    if (selectedDialectId !== null) {
      navigate("/choose-theme", { state: { dialectId: selectedDialectId } });
    } else {
      alert("Please select a dialect first!");
    }
  };

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setPopupOpen(true);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const currentScroll = element.scrollTop;

    // Calculate scroll percentage
    const scrollPercent = currentScroll / scrollHeight;

    // Top shadow appears as we scroll down
    setTopShadowOpacity(scrollPercent);
    // Bottom shadow fades as we scroll down
    setBottomShadowOpacity(1 - scrollPercent);
  };

  return (
    <div className="myroot">
      <Header>
        <img src={Logo} alt="logo" />
      </Header>
      <Main>
        <div className="title_1">
          <h3>Pick the dialect you want!</h3>
          <p>So we can choose a theme just for you!</p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Dialect"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIcon} alt="search-icon" className="search-icon" />
        </div>

        {/* Loading and Error Handling */}
        <div className="nationality-list-container">
          <div
            className="shadow--top shadow"
            style={{ opacity: topShadowOpacity }}
          />
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div
              className="nationality-list"
              ref={contentRef}
              onScroll={handleScroll}
            >
              {filteredNationalities.length > 0 ? (
                filteredNationalities.map(
                  ({ dialect_id, dialect_name, logo_url, subtitle }) => (
                    <div
                      key={dialect_id}
                      className={`nationality-box ${selectedDialectId === dialect_id ? "selected" : ""}`}
                      onClick={() =>
                        handleSelectDialect(dialect_id, dialect_name)
                      }
                    >
                      <div className="details">
                        <h2>{dialect_name}</h2>
                        <span>{subtitle}</span>
                      </div>
                      <img src={logo_url} alt={`${dialect_name} flag`} />
                    </div>
                  ),
                )
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}
          <div
            className="shadow--bottom shadow"
            style={{ opacity: bottomShadowOpacity }}
          />
        </div>
      </Main>
      <CustomButton>
        <button
          className={classes.actionBtn}
          onClick={handleContinue}
          disabled={selectedDialectId ? false : true}
        >
          Continue
        </button>
      </CustomButton>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => {
          localStorage.setItem("hasSeenPopup", "true");
          setPopupOpen(false);
        }}
        text1="Welcome to Aralects!"
        text2="Let's Master Pronunciation Together!"
        btnText="Continue"
        btnText2="Go to dialect selection"
        imageProp={maskImage}
        bothBtns={false}
        secondBtnApear={false}
      />
    </div>
  );
};
