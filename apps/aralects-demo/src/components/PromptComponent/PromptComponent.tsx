import React, { useEffect, useRef, useState } from "react";
import classes from "./PromptComponent.module.scss";
import VolumeImage from "../../assets/pronounceImages/Volume.png";
import VoiceRecording from "../VoiceRecording/VoiceRecording";



interface PronunciationPayload {
    index: number;
    letter: string;
    result: boolean;
}

interface PronunciationFeedbackItem {
    highlighted_text_id: string;
    highlighted_text_latin: string;
    highlighted_text_latin_payload: PronunciationPayload[];
    highlighted_text_arabic: string;
    highlighted_text_arabic_payload: PronunciationPayload[];
}

interface Screen {
    promptid: number;
    languageHighLight: string;
    translationHighLight: string;
    languagesentence: string;
    translationSentence: string;
    highlightedSecondLanguage: string;
    promptTranslation: string;
    promptAudio: string;
    Highlightedaudio: string;
}


interface PromptComponentProps {
    sentenceId: number,
    languageHighLight: string;
    translationHighLight: string;
    languagesentence: string;
    translationSentence: string;
    highlightedSecondLanguage: string;
    promptTranslation: string;
    promptAudio: string;
    isArabic: boolean;
    Highlightedaudio: string;
    resetState: () => void;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    toggleLanguage?: () => void;
    index: number;
    screenLength: number;
    promptStatusArray: { prompt_id: number; status: boolean }[];
    screens: Screen[];
    setPromptStatusArray: React.Dispatch<React.SetStateAction<{ prompt_id: number; status: boolean }[]>>;
    setIsRecording: (value: boolean) => void;
    setLevelsHeight: (value: number) => void
}

const PromptComponent: React.FC<PromptComponentProps> = ({
    sentenceId,
    languageHighLight,
    promptAudio,
    languagesentence,
    translationSentence,
    highlightedSecondLanguage,
    promptTranslation,
    isArabic,
    Highlightedaudio,
    screens,
    promptStatusArray,
    index,
    setPromptStatusArray,
    setIsRecording,
    setLevelsHeight
}) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const promptAudioRef = useRef<HTMLAudioElement | null>(null);



    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackContent, setFeedbackContent] = useState<React.ReactNode>(null);
    const [isPerfect, setIsPerfect] = useState(false);
    const [result, setResult] = useState<PronunciationFeedbackItem | any>(null);
    const [payload, setPayload] = useState<any>([]);


    const wordData = [
        {
            "span": "1",
            "word_ar": "الحَمْدُ",
            "word_lat": "il-Hamdu",
            "definition_lit": "the praise",
            "definition_fig": "praise",
            "definition_span": "A term ",
            "pronunciation": "il-Hamdu",
            "notes": "This is often used in Islamic prayers",
            "highlighted": true,
            "translation": "5"
        },
        {
            "span": "2",
            "word_ar": "الله",
            "word_lat": "Allah",
            "definition_lit": "God (in Arabic)",
            "definition_fig": "the supreme ",
            "definition_span": "",
            "pronunciation": "Allah",
            "notes": "The central concept in Islam",
            "highlighted": true,
            "translation": "6"
        },

    ];



    const wordDataArabic = [
        {
            "span": "1",
            "word_ar": "كتاب",
            "word_lat": "Kitab",
            "definition_lit": "كتاب",
            "definition_fig": "عمل مكتوب",
            "definition_span": "كتاب الله",
            "pronunciation": "Ki-tab",
            "notes": "شائع الاستخدام",
            "highlighted": true,
            "translation": "1"
        },
        {
            "span": "2",
            "word_ar": "شمس",
            "word_lat": "Shams",
            "definition_lit": "شمس",
            "definition_fig": "النجم في ",
            "definition_span": "الشمس ساطعة",
            "pronunciation": "Shams",
            "notes": "رمز للحياة",
            "highlighted": false,
            "translation": "2"
        },
        {
            "span": "3",
            "word_ar": "قمر",
            "word_lat": "Qamar",
            "definition_lit": "قمر",
            "definition_fig": " للأرض",
            "definition_span": "",
            "pronunciation": "Qa-mar",
            "notes": "يظهر ليلاً",
            "highlighted": true,
            "translation": "3"
        },
        {
            "span": "4",
            "word_ar": "جبل",
            "word_lat": "Jabal",
            "definition_lit": "جبل",
            "definition_fig": "شكل طبيعية",
            "definition_span": "الجبل مرتفع",
            "pronunciation": "Ja-bal",
            "notes": "موجود في سلاسل الجبال",
            "highlighted": false,
            "translation": "4"
        },
        {
            "span": "5",
            "word_ar": "نهر",
            "word_lat": "Nahr",
            "definition_lit": "نهر",
            "definition_fig": "  يتدفق طبيعيًا",
            "definition_span": "النهر يجري",
            "pronunciation": "Na-hr",
            "notes": "يصب في البحر أو المحيط",
            "highlighted": true,
            "translation": "5"
        }
    ];






    useEffect(() => {
        if (!result) return;
        const currentPromptId = screens[index]?.promptid;
        const currentPromptIndex = promptStatusArray.findIndex(
            (item) => item.prompt_id === currentPromptId
        );

        if (currentPromptIndex !== -1) {
            const currentPrompt = promptStatusArray[currentPromptIndex];
            if (isPerfect && currentPrompt.status === false) {
                setPromptStatusArray((prevStatusArray) => {
                    const updatedStatusArray = [...prevStatusArray];
                    updatedStatusArray[currentPromptIndex] = {
                        ...updatedStatusArray[currentPromptIndex],
                        status: true,
                    };
                    return updatedStatusArray;
                });

            }
        } else {
            console.log('No matching prompt status found for promptId:', currentPromptId);
        }
    }, [promptStatusArray, screens, isPerfect]);


    const handleVolumeClick = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handlePromptAudioClick = () => {
        if (promptAudioRef.current) {
            promptAudioRef.current.play();
        }
    };


    const highlightText = (sentence: string, highlightWord: string, isArabic: boolean) => {
        const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null); // Track active word index
        const tooltipRef = useRef<HTMLDivElement>(null);

        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setActiveWordIndex(null); // Close tooltip when clicking outside
            }
        };

        useEffect(() => {
            if (activeWordIndex !== null) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [activeWordIndex]);

        const handleTooltipToggle = (index: number) => {
            setActiveWordIndex((prevIndex) => (prevIndex === index ? null : index));
        };

        const wordsWithPunctuation = sentence.split(/(\s+|\p{P}+)/gu);
        const cleanWord = (word: string) => {
            const isArabic = /[\u0600-\u06FF]/.test(word);
            const cleaned = isArabic
                ? word.replace(/[^أ-ي0-9a-zA-Z\u0600-\u06FF\s]/g, '').toLowerCase()
                : word.replace(/^[^\w'Ꜥħ]+|[^\w'Ꜥħ]+$/g, '').toLowerCase();
            return cleaned.trim() === '' ? null : cleaned; // Return null for empty words
        };
        const wordsWithoutPunctuation = wordsWithPunctuation
            .map(cleanWord) // Clean words and filter out nulls
            .filter(word => word !== null)
        const isSentenceArabic = /[\u0600-\u06FF]/.test(sentence);

        return (
            <div style={{ direction: isSentenceArabic ? 'rtl' : 'ltr', textAlign: isSentenceArabic ? 'left' : 'left' }}>
                {wordsWithPunctuation.map((word, index) => {
                    const cleanWordResult = cleanWord(word);
                    const isPunctuation = /^[\p{P}]+$/u.test(word);


                    // Skip punctuation (just render the punctuation with a different class)
                    if (isPunctuation) {
                        return (
                            <span key={index} className={classes.punctuationClass}>
                                {word}
                            </span>
                        );
                    }
                    const wordIndex = wordsWithoutPunctuation.indexOf(cleanWordResult ? cleanWordResult : '');
                    const isHighlight = highlightWord.toLowerCase().includes(cleanWordResult ? cleanWordResult : '');
                    const className = isHighlight ? classes.highLightText : classes.noPunctuationClass;

                    return (
                        <React.Fragment key={index}>
                            <span
                                className={className}
                                onClick={() => handleTooltipToggle(wordIndex)}
                                style={{
                                    direction: isArabic && !isPunctuation ? 'rtl' : 'ltr',
                                    textAlign: isArabic && !isPunctuation ? 'right' : 'left',
                                }}
                            >
                                {word}
                            </span>

                            {activeWordIndex === wordIndex && (
                                <div
                                    className={`${classes.tooltipContainer} ${classes.tooltipVisible}`}
                                    ref={tooltipRef}
                                    style={{ textAlign: isArabic ? 'right' : 'left' }}
                                >
                                    {
                                        (isArabic ? wordDataArabic : wordData)[wordIndex] && (
                                            (isArabic ? wordDataArabic : wordData)[wordIndex].definition_span ? (
                                                <div key={wordIndex} className={classes.tooltipText} style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                                                    <div className={classes.spansWords}>
                                                        {/* Split and display the parts of the span, but filter out empty strings */}
                                                        {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_span
                                                            .split(" ")
                                                            .filter(part => part.trim() !== "")  // This filters out empty or whitespace-only parts
                                                            .map((part, partIndex) => (
                                                                <span key={partIndex} className={classes.wordPart}>
                                                                    {part}
                                                                </span>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className={classes.lineSeperate} />
                                                    <span className={classes.secondword}>
                                                        {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_lit}
                                                    </span>
                                                    <div className={classes.lineSeperate} />
                                                    <div className={classes.firstInfo}>
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                        <div className={classes.lineColumn} />
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                    </div>
                                                    <div className={classes.lineSeperate} />
                                                    <div className={classes.firstInfo}>
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                        <div className={classes.lineColumn} />
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                    </div>
                                                    <div className={classes.lineSeperate} />
                                                    <div className={classes.firstInfo}>
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                        <div className={classes.lineColumn} />
                                                        <span className={classes.thirdword}>
                                                            {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={wordIndex} className={classes.tooltipText} style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                                                    <span className={classes.secondword}>
                                                        {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_lit}
                                                    </span>
                                                    <div className={classes.lineSeperate} />
                                                    <span className={classes.secondword}>
                                                        {(isArabic ? wordDataArabic : wordData)[wordIndex].definition_fig}
                                                    </span>
                                                    <div className={classes.lineSeperate} />
                                                    <span className={classes.secondword}>
                                                        {(isArabic ? wordDataArabic : wordData)[wordIndex].pronunciation}
                                                    </span>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            )}

                        </React.Fragment>
                    );
                })}
            </div>
        );
    };










    const highlightTextForTranslation = (sentence: string, highlightWord: string) => {
        const parts = sentence.split(highlightWord);
        if (parts.length === 1) return <span>{sentence}</span>;

        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && (
                    <span className={classes.highLightTextNew}>{highlightWord}</span>
                )}
            </React.Fragment>
        ));
    };



    const renderHighlightedPart = (highlightWord: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => {
        return <span className={classes.highLightTextBtn}>{highlightWord}</span>;
    };


    useEffect(() => {
        if (!result) return;

        setPayload(result);
        const perfect = result.highlighted_text_latin_payload.every(
            (item: { result: boolean }) => item.result === true
        );
        setIsPerfect(perfect);

        setShowFeedback(true);
    }, [result]);



    useEffect(() => {
        if (payload) {
            setFeedbackContent(
                <div className={classes.feedbackContainer}>
                    <div className={classes.messageHighligths}>
                        <span
                            className={`${classes.feedbackMessage} ${isPerfect ? classes.successText : classes.errorText}`}
                        >
                            {isPerfect ? "Mumtaz!" : "Try Again!"}
                        </span>
                    </div>
                    <span className={classes.highLightTextBtn}>
                        {isArabic
                            ? (payload.highlighted_text_arabic_payload && Array.isArray(payload.highlighted_text_arabic_payload))
                                ? payload.highlighted_text_arabic_payload.map((item: { result: any; letter: string }, index: React.Key | null | undefined) => (
                                    <span key={index} style={{ color: item.result ? "green" : "red" }}>
                                        {item.letter}
                                    </span>
                                ))
                                : null
                            : (payload.highlighted_text_latin_payload && Array.isArray(payload.highlighted_text_latin_payload))
                                ? payload.highlighted_text_latin_payload.map((item: { result: any; letter: string }, index: React.Key | null | undefined) => (
                                    <span key={index} style={{ color: item.result ? "green" : "red" }}>
                                        {item.letter}
                                    </span>
                                ))
                                : null
                        }

                    </span>
                </div>
            );
        }
    }, [payload, isArabic]);

    return (
        <>
            <div className={classes.allComponent}>
                <div className={classes.pronounceTable}>
                    <div className={classes.titleContainer}>
                        <span className={classes.titleStyle}>Pronounce the highlighted words</span>
                    </div>
                    {/* <div className={classes.lineSeperate} /> */}
                    <div className={classes.secondPartCont}>
                        <div className={classes.volumeCont} onClick={handleVolumeClick}>
                            <img src={VolumeImage} alt="volume icon" className={classes.imageStyle} />
                        </div>
                        <div className={classes.dataInside}>
                            <span className={classes.allText}>
                                {isArabic
                                    ? highlightText(translationSentence, highlightedSecondLanguage, true)
                                    : highlightText(languagesentence, languageHighLight, false)}
                            </span>
                            <div className={classes.secondLineSeperate} />
                            <div className={classes.tranlationLanguageContainer}>
                                <span className={classes.translationTitle}>Translation</span>
                            </div>

                            <div>
                                <span className={classes.allText1}>
                                    {highlightTextForTranslation(promptTranslation, "")}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <audio ref={audioRef} src={promptAudio ? promptAudio : "https://audio.aralects.com/promt1_highlighted_word.wav"} />
                <audio ref={promptAudioRef} src={Highlightedaudio ? Highlightedaudio : "https://audio.aralects.com/promt1_highlighted_word.wav"} />
            </div>

            {!showFeedback && (
                <div className={classes.downText} onClick={handlePromptAudioClick}>
                    {isArabic
                        ? renderHighlightedPart(highlightedSecondLanguage)
                        : renderHighlightedPart(languageHighLight)}
                </div>
            )}

            {showFeedback && (
                <div className={classes.downText} onClick={handlePromptAudioClick}>
                    {feedbackContent}
                </div>
            )}

            {/* Hide VoiceRecording if isPerfect is true and store in the array */}
            {!isPerfect && (
                <VoiceRecording
                    // referenceAudioUrl={`https://audio.aralects.com/promt1_highlighted_word.wav`}
                    setResult={setResult}
                    sentenceId={sentenceId}
                    setIsRecording={setIsRecording}
                    setLevelsHeight={setLevelsHeight}
                />
            )}
            {
                isPerfect ? (
                    <div className={classes.perfectMessage}>
                        <span className={classes.swipeSentenceStyle}>Swipe up for next question</span>
                    </div>
                ) : null
            }


        </>
    );
}

export default PromptComponent;