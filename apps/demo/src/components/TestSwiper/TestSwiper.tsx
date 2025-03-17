import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Virtual, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import axios from 'axios';
import { getPrompts } from '../../Api';
import { useLocation, useNavigate } from 'react-router-dom';
import PronounceComponent from '../PromptComponent/PromptComponent';
import classes from '../PromptComponent/PromptComponent.module.scss';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import congratsImage from '../../assets/PopupImages/congratsImage.png';
import bothMans from '../../assets/PopupImages/bothMans.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/virtual';
import 'swiper/css/keyboard';
import { defaultFormattedScreens, defaultPromptStatusArray } from '../../testing-data/data';

interface HighlightedText {
    HighlightedTextLatin: string;
    HighlightedTextArabic: string;
    HighlightedTextReferenceAudio: string;
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

function TestSwiper() {
    const location = useLocation();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [screens, setScreens] = useState<any[]>([]);
    const [isArabic, setIsArabic] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isSecondPopupOpen, setSecondPopupOpen] = useState(false);
    const [promptStatusArray, setPromptStatusArray] = useState<{ prompt_id: number; status: boolean }[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [levelHeight, setLevelHeight] = useState(1);
    const { height: windowHeight } = useWindowSize();

    // Calculate heights based on window size
    const containerHeight = Math.min(windowHeight, 750); // Max height from app.scss
    const headerHeight = 30;  // Approximate header height
    const progressBarHeight = 30; // Approximate progress bar height
    const contentPadding = 20; // Total vertical padding (20px top + 20px bottom)
    
    const availableHeight = containerHeight - headerHeight - progressBarHeight - contentPadding;
    const contentHeight = Math.floor(availableHeight * 0.6); // 60% of available space

    useEffect(() => {
        const url = getPrompts;
        const promptObject = {
            dialect_id: location.state?.dialect_id ?? 1,
            theme_id: location.state?.theme_id ?? 1,
        };

        axios.post(url, promptObject, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    const promptData = response.data;
                    let formattedScreens: any[] = [];
                    let promptStatusArray: { prompt_id: number; status: boolean }[] = [];

                    const sortedPrompts = Object.keys(promptData)
                        .filter((key) => key.startsWith('prompt_'))
                        .map((key) => promptData[key])
                        .sort((a, b) => a.prompt_id - b.prompt_id);

                    sortedPrompts.forEach((prompt) => {
                        promptStatusArray.push({
                            prompt_id: prompt.prompt_id,
                            status: false,
                        });

                        const highlightedTexts = Object.values(prompt.highlighted_text) as HighlightedText[];
                        if (highlightedTexts.length > 0) {
                            const allLatinHighlights = highlightedTexts
                                .map((ht) => ht.HighlightedTextLatin)
                                .join(' ');
                            const allArabicHighlights = highlightedTexts
                                .map((ht) => ht.HighlightedTextArabic)
                                .join(' ');
                            const firstHighlightAudio = highlightedTexts[0].HighlightedTextReferenceAudio;

                            formattedScreens.push({
                                sentenceId: prompt.sentence_id,
                                languageHighLight: allLatinHighlights,
                                languagesentence: prompt.prompt_text_latin,
                                translationHighLight: prompt.literate_translation,
                                promptTranslation: prompt.figurative_translation,
                                Highlightedaudio: firstHighlightAudio,
                                translationSentence: prompt.prompt_text_arabic,
                                highlightedSecondLanguage: allArabicHighlights,
                                promptAudio: prompt.prompt_audio,
                                promptid: prompt.prompt_id,
                            });
                        }
                    });

                    setPromptStatusArray(promptStatusArray);
                    setScreens(formattedScreens);
                }
            })
            .catch((error) => console.log('Error fetching API data:', error));
    }, [location]);

    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

    const handlePrimaryClick = () => {
        navigate('/choose-theme');
    };

    const handleSecondaryPopUpClick = () => {
        navigate('/');
    };

    const handleSecondaryClick = () => {
        setSecondPopupOpen(true);
        setPopupOpen(false);
    };

    useEffect(() => {
        if (promptStatusArray.length > 0 && promptStatusArray.every((item) => item.status)) {
            setPopupOpen(true);
        }
    }, [promptStatusArray]);

    return (
        <div className={classes.allSwipeCont}>
            {isRecording && (
                <div
                    className={classes.recordingBorder}
                    style={{
                        transition: 'all 0.05s ease-out',
                        padding: `${Math.min(levelHeight * 3, 24)}px`,
                        opacity: Math.max(0.4, Math.min(1, levelHeight * 0.2)),
                        transform: `scale(${1 + Math.min(levelHeight * 0.01, 0.03)})`,
                    }}
                />
            )}
            <Header isArabic={isArabic} toggleLanguage={toggleLanguage} />

            {/* Progress Bar */}
            <div className={classes.numberBarCont}>
                <span className={classes.numberStyle}>
                    {index + 1}/{screens.length}
                </span>
                <div className={classes.progressBar}>
                    <div
                        className={classes.progressFill}
                        style={{
                            width: screens.length > 0 ? `${((index + 1) / screens.length) * 100}%` : '0%',
                            transition: 'width 400ms ease-out'
                        }}
                    ></div>
                </div>
            </div>

            {/* Swiper Container */}
            <div style={{ 
                height: `${containerHeight}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '50px'
            }}>
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    onSlideChange={(swiper: SwiperType) => setIndex(swiper.activeIndex)}
                    modules={[Mousewheel, Virtual, Keyboard]}
                    mousewheel={{
                        forceToAxis: true,
                        sensitivity: 1,
                        thresholdDelta: 50
                    }}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: true
                    }}
                    virtual={{
                        addSlidesAfter: 1,
                        addSlidesBefore: 1
                    }}
                    touchEventsTarget="container"
                    threshold={20}
                    touchRatio={1}
                    touchAngle={45}
                    grabCursor={true}
                    resistance={true}
                    resistanceRatio={0.85}
                    speed={400}
                    style={{
                        height: `${availableHeight}px`,
                        width: '100%',
                    }}
                >
                    {screens.map((screen, i) => (
                        <SwiperSlide 
                            key={i}
                            virtualIndex={i}
                            style={{
                                height: '100%',
                                width: '100%',
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                                touchAction: 'pan-y'
                            }}
                        >
                            <div style={{
                                height: `${contentHeight}px`,
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                gap: '0.95rem', // Use rem instead of % for more predictable spacing
                            }}>
                                <PronounceComponent
                                    {...screen}
                                    index={index}
                                    isArabic={isArabic}
                                    toggleLanguage={toggleLanguage}
                                    setIsRecording={setIsRecording}
                                    setLevelsHeight={setLevelHeight}
                                    screenLength={screens.length}
                                    screens={screens}
                                    setPromptStatusArray={setPromptStatusArray}
                                    promptStatusArray={promptStatusArray}
                                    resetState={{}}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Popups */}
            {isPopupOpen && (
                <Popup
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    text1="Congratulations!"
                    text2={`You've finished lesson 1.1 successfully with a score of ${index + 1}/${screens.length}`}
                    btnText="Continue"
                    btnText2="Next"
                    imageProp={congratsImage}
                    secondBtnApear={true}
                    bothBtns={false}
                    onSecondaryClick={handleSecondaryClick}
                />
            )}

            {isSecondPopupOpen && (
                <Popup
                    isOpen={isSecondPopupOpen}
                    onClose={() => setSecondPopupOpen(false)}
                    text1="What to do next?"
                    text2="You can start another dialect to start with or complete your test in Masry as much as you want!"
                    btnText="Continue with another theme"
                    btnText2="Go to dialect selection"
                    imageProp={bothMans}
                    bothBtns={true}
                    onPrimaryClick={handlePrimaryClick}
                    secondBtnApear={false}
                    onSecondaryClick={handleSecondaryPopUpClick}
                />
            )}
        </div>
    );
}

export default TestSwiper; 