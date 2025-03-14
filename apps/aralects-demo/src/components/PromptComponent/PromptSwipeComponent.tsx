import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPrompts } from "../../Api.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import PronounceComponent from "./PromptComponent.tsx";
import classes from "./PromptComponent.module.scss";
import Header from "../Header/Header.tsx";
import Popup from "../Popup/Popup.tsx";
import congratsImage from "../../assets/PopupImages/congratsImage.png";
import bothMans from "../../assets/PopupImages/bothMans.png";
import { ApiResponse } from "../../types/promptInterfaces.ts";

function PronounceSwipeComponent() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const [index, setIndex] = useState(0);
	const [screens, setScreens] = useState<any[]>([]);
	const [isArabic, setIsArabic] = useState(false);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [isSecondPopupOpen, setSecondPopupOpen] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const [promptStatusArray, setPromptStatusArray] = useState<{ prompt_id: number; status: boolean }[]>([]);

	const [isRecording, setIsRecording] = useState(false);
	const [levelHeight, setLevelHeight] = useState(1);

	let touchStartY = 0;
	let touchEndY = 0;
	let isMouseDown = false;

	// Add these new states at the top with other states
	const [touchStartTime, setTouchStartTime] = useState(0);
	const [touchStartPos, setTouchStartPos] = useState(0);
	const [isSwiping, setIsSwiping] = useState(false);

	// Add touch event handling for two-finger scrolling
	let lastTouchY = 0;
	let touchCount = 0;

	const handleTouchStart = (e: React.TouchEvent) => {
		touchCount = e.touches.length;
		if (touchCount === 2) {
			lastTouchY = e.touches[0].clientY;
		} else {
			touchStartY = e.touches[0].clientY;
			setTouchStartTime(Date.now());
			setTouchStartPos(e.touches[0].clientY);
			setIsSwiping(true);
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (touchCount === 2) {
			e.preventDefault();
			const currentY = e.touches[0].clientY;
			const deltaY = lastTouchY - currentY;
			
			if (Math.abs(deltaY) > 20) {  // Threshold for two-finger scroll
				if (deltaY > 0 && index < screens.length - 1) {
					setIndex(current => Math.min(current + 1, screens.length - 1));
				} else if (deltaY < 0 && index > 0) {
					setIndex(current => Math.max(current - 1, 0));
				}
				lastTouchY = currentY;
			}
		} else if (isSwiping) {
			e.preventDefault();
		}
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchCount !== 2) {
			setIsSwiping(false);
			touchEndY = e.changedTouches[0].clientY;
			
			const deltaY = touchStartPos - touchEndY;
			const time = Date.now() - touchStartTime;
			const velocity = Math.abs(deltaY / time);
			
			const VELOCITY_THRESHOLD = 0.5;
			const DISTANCE_THRESHOLD = 50;
			
			if (velocity > VELOCITY_THRESHOLD || Math.abs(deltaY) > DISTANCE_THRESHOLD) {
				if (deltaY > 0 && index < screens.length - 1) {
					setIndex(current => Math.min(current + 1, screens.length - 1));
				} else if (deltaY < 0 && index > 0) {
					setIndex(current => Math.max(current - 1, 0));
				}
			}
		}
		touchCount = 0;
	};

	// Handle mouse down for desktop
	const handleMouseDown = (e: React.MouseEvent) => {
		isMouseDown = true;
		touchStartY = e.clientY;
	};

	// Handle mouse up for desktop
	const handleMouseUp = (e: React.MouseEvent) => {
		if (!isMouseDown) return;
		isMouseDown = false;
		touchEndY = e.clientY;
		handleSwipe();
	};

	// Enhanced wheel handling with smooth scrolling
	const handleWheel = (e: React.WheelEvent) => {
		if (isScrolling) return;

		const SCROLL_THRESHOLD = 30; // Increased threshold
		const SCROLL_DELAY = 800; // Increased delay to prevent double scrolls

		// Accumulate scroll delta
		const deltaY = Math.abs(e.deltaY);
		
		if (deltaY > SCROLL_THRESHOLD) {
			setIsScrolling(true);
			
			// Only allow one index change at a time
			if (e.deltaY > 0 && index < screens.length - 1) {
				setIndex(current => Math.min(current + 1, screens.length - 1));
			} else if (e.deltaY < 0 && index > 0) {
				setIndex(current => Math.max(current - 1, 0));
			}

			// Reset scrolling state after delay
			setTimeout(() => {
				setIsScrolling(false);
			}, SCROLL_DELAY);
		}
	};

	// Handle swipe logic
	const handleSwipe = () => {
		if (touchStartY - touchEndY > 50) {
			if (index < screens.length - 1) {
				setIndex(index + 1);
			}
		} else if (touchEndY - touchStartY > 50 && index > 0) {
			setIndex(index - 1);
		}
	};

	// Toggle between Arabic and English languages
	const toggleLanguage = () => {
		setIsArabic((prev) => !prev);
	};

	useEffect(() => {
		const url = getPrompts;
		const promptObject = {
			dialect_id: location.state?.dialect_id ?? 1,
			theme_id: location.state?.theme_id ?? 1,
		};

		axios
			.post(url, promptObject, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((response) => {
				if (response.status === 200) {
					const promptData: ApiResponse = response.data;
					let formattedScreens: any[] = [];
					let promptStatusArray: { prompt_id: number; status: boolean }[] = [];

					const sortedPrompts = Object.keys(promptData)
						.filter((key) => key.startsWith("prompt_"))
						.map((key) => promptData[key])
						.sort((a, b) => a.prompt_id - b.prompt_id);

					sortedPrompts.forEach((prompt) => {
						promptStatusArray.push({ prompt_id: prompt.prompt_id, status: false });

						const highlightedTexts = Object.values(prompt.highlighted_text);
						if (highlightedTexts.length > 0) {
							const allLatinHighlights = highlightedTexts.map(ht => ht.HighlightedTextLatin).join(" ");
							const allArabicHighlights = highlightedTexts.map(ht => ht.HighlightedTextArabic).join(" ");
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
			.catch((error) => console.log("Error fetching API data:", error));
	}, [location]);

	const handlePrimaryClick = () => {
		navigate("/choose-theme");
	};

	const handleSecondaryPopUpClick = () => {
		navigate("/");
	};


	const handleSecondaryClick = () => {
		setSecondPopupOpen(true);
		setPopupOpen(false);
	};
	useEffect(() => {
		if (promptStatusArray.length > 0 && promptStatusArray.every(item => item.status)) {
			setPopupOpen(true);
		}
	}, [promptStatusArray]);

	return (
		<div className={`${classes.allSwipeCont}`}>
			{isRecording &&
				<div
				className={classes.recordingBorder} 
					style={{
						transition: 'all 0.05s ease-out',
						padding: `${Math.min(levelHeight * 3, 24)}px`,
						opacity: Math.max(0.4, Math.min(1, levelHeight * 0.2)),
						transform: `scale(${1 + Math.min(levelHeight * 0.01, 0.03)})`,
					
					}} />
			}
			<Header isArabic={isArabic} toggleLanguage={toggleLanguage} />

			{/* Progress Bar */}
			<div className={classes.numberBarCont}>
				<span className={classes.numberStyle}>{index + 1}/{screens.length}</span>
				<div className={classes.progressBar}>
					<div className={classes.progressFill} style={{ width: screens.length > 0 ? `${((index + 1) / screens.length) * 100}%` : "0%" }}></div>
				</div>
			</div>

			{/* Swipe Container */}
			<div
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onWheel={handleWheel}
				className={classes.onTouchScreen}
			>
				<div 
					className={classes.screenWrapper}
					style={{ 
						transform: `translateY(-${index * 100}vh)`,
						transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
					}}
				>
					{screens.map((screen, i) => (
						<div key={i} className={classes.screen}>
							<PronounceComponent {...screen} index={index} isArabic={isArabic} toggleLanguage={toggleLanguage} setIsRecording={setIsRecording} setLevelsHeight={setLevelHeight} screenLength={screens.length} screens={screens} setPromptStatusArray={setPromptStatusArray} promptStatusArray={promptStatusArray} resetState={{}} />
						</div>
					))}
				</div>
			</div>
			{isPopupOpen && (
				<Popup
					isOpen={isPopupOpen}
					onClose={() => setPopupOpen(false)}
					text1="Congratulations!"
					text2={"You've finished lesson 1.1 successfully with a score of ${index + 1}/${screens.length}"}
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

export default PronounceSwipeComponent;
