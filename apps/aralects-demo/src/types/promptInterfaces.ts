
interface HighlightedText {
	HighlightedTextLatin: string;
	HighlightedTextReferenceAudio: string;
	HighlightedTextArabic: string;
}

interface PromptData {
	prompt_id: number;
	sentence_id: number;
	prompt_text_latin: string;
	literate_translation: string;
	figurative_translation: string;
	prompt_audio: string;
	prompt_text_arabic: string;
	highlighted_text: { [key: string]: HighlightedText };
	screenLength: number;
}

interface ApiResponse {
	[key: string]: PromptData;
}

export type { HighlightedText, PromptData, ApiResponse };
