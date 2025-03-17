import { useState, useEffect, useRef } from "react";
import { CustomButton } from "../components/CustomButton.tsx";
import { Header } from "../components/Header.tsx";
import { Main } from "../components/Main.tsx";
import Logo from "../assets/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BackArrow from "../assets/images/back-arrow.png";
import classes from "./layouts.module.scss";
import { Theme } from "../types/secondLayoutInterface.ts";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.tsx";

export const SecondeLayout = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [dialectId] = useState<number>(
    location.state?.dialectId ??
      parseInt(localStorage.getItem("dialectId") || "0"),
  );
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [topShadowOpacity, setTopShadowOpacity] = useState(0);
  const [bottomShadowOpacity, setBottomShadowOpacity] = useState(1);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<Theme[]>(
          "https://api.aralects.com/v1/demo/GETthemes",
        );
        setThemes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch themes");
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleSelectTheme = (theme_id: number, theme_name: string) => {
    setSelectedThemeId(theme_id);
    localStorage.setItem("themeName", theme_name);
  };

  const promptNavigate = () => {
    navigate("/prompt", {
      state: {
        dialect_id: dialectId,
        theme_id: selectedThemeId,
      },
    });
  };

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
        <img
          className="back-arrow"
          src={BackArrow}
          alt="back-arrow"
          onClick={() => navigate("/")}
        />
        <img className="logo" src={Logo} alt="logo" />
      </Header>
      <Main>
        <div className="title_1">
          <h3>Choose your favored theme!</h3>
          <p>So we can choose a theme personalized for you.</p>
        </div>
        <div className="favored-themest-container">
          <div
            className="shadow--top shadow"
            style={{ opacity: topShadowOpacity }}
          />
          <div
            className="favored-themes"
            ref={contentRef}
            onScroll={handleScroll}
          >
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <p>{error}</p>
            ) : (
              themes
                .slice(0, 4)
                .map(({ theme_id, theme_name, subtitle, logo_url }, index) => (
                  <div
                    key={theme_id}
                    className={`theme-box theme-${index + 1} ${selectedThemeId === theme_id ? "selected" : ""}`}
                    onClick={() => handleSelectTheme(theme_id, theme_name)}
                  >
                    <div className="title">
                      <h2>{theme_name}</h2>
                      <p>{subtitle}</p>
                    </div>
                    <img src={logo_url} alt={`${theme_name} icon`} />
                  </div>
                ))
            )}
          </div>
          <div
            className="shadow--bottom shadow"
            style={{ opacity: bottomShadowOpacity }}
          />
        </div>
      </Main>
      <CustomButton>
        <button
          type="button"
          className={classes.actionBtn}
          onClick={promptNavigate}
          disabled={selectedThemeId ? false : true}
        >
          Yalla!
        </button>
      </CustomButton>
    </div>
  );
};
