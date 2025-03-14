import defaultFlag from "../assets/images/logo.svg";
import { Dialect } from "../types/mainLayoutInterface";
import { Theme } from "../types/secondLayoutInterface";

export const defaultDialects: Dialect[] = [
  {
    dialect_id: 1,
    dialect_name: "Egyptian",
    logo_url: defaultFlag,
    subtitle: "Masry - مصري",
  },
  {
    dialect_id: 2,
    dialect_name: "Levantine",
    logo_url: defaultFlag,
    subtitle: "Shami - شامي",
  },
  {
    dialect_id: 3,
    dialect_name: "Gulf",
    logo_url: defaultFlag,
    subtitle: "Khaliji - خليجي",
  },
  {
    dialect_id: 4,
    dialect_name: "Moroccan",
    logo_url: defaultFlag,
    subtitle: "Maghrebi - مغربي",
  },
  {
    dialect_id: 5,
    dialect_name: "Iraqi",
    logo_url: defaultFlag,
    subtitle: "Iraqi - عراقي",
  },
];

// Use this for testing
export const defaultThemes: Theme[] = [
  {
    theme_id: 1,
    theme_name: "Salutations and Greetings",
    subtitle: "",
    logo_url: "https://images.aralects.com/greetings.png",
  },
  {
    theme_id: 2,
    theme_name: "Names and Introductions",
    subtitle: "",
    logo_url: "https://images.aralects.com/chat.png",
  },
  {
    theme_id: 3,
    theme_name: "Food and Drink Culture",
    subtitle: "",
    logo_url: "https://images.aralects.com/food.png",
  },
  {
    theme_id: 4,
    theme_name: "Family",
    subtitle: "",
    logo_url: "https://images.aralects.com/house.png",
  },
  {
    theme_id: 5,
    theme_name: "Family",
    subtitle: "-",
    logo_url: "-",
  },
];

// Use this for testing
export const defaultFormattedScreens: any[] = [
  {
    sentenceId: 7,
    languageHighLight: "shuu 'akhbaarak",
    languagesentence: "yaa rfii'ee , shuu 'akhbaarak ?",
    translationHighLight: "My friend, how are you doing?",
    promptTranslation: "My friend, how are you doing?",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/7_word.wav",
    translationSentence: "يَا رْفِيقَي ، شُو أَخْبَارَك ؟",
    highlightedSecondLanguage: "شُو أَخْبَارَك",
    promptAudio: "https://audio.aralects.com/leb/greetings/7.wav",
    promptid: 1,
  },
  {
    sentenceId: 1,
    languageHighLight: "il-Hamdillaah",
    languagesentence: "'anaa mniiH il-yoom , il-Hamdillaah .",
    translationHighLight: "I am good today, thankfully.",
    promptTranslation: "I am good today, thankfully.",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/1_word.wav",
    translationSentence: "أَنَا مْنِيح اليَوم ، الحَمْدِلله .",
    highlightedSecondLanguage: "الحَمْدِلله",
    promptAudio: "https://audio.aralects.com/leb/greetings/1.wav",
    promptid: 6,
  },
  {
    sentenceId: 2,
    languageHighLight: "SabaaH il-kheer",
    languagesentence: "SabaaH il-kheer yaa Habiibii , kiifak ?",
    translationHighLight: "Good morning my dear, how are you?",
    promptTranslation: "Good morning my dear, how are you?",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/2_word.wav",
    translationSentence: "صَبَاح الخَير يَا حَبِيبَي ، كِيفَك ؟",
    highlightedSecondLanguage: "صَبَاح الخَير",
    promptAudio: "https://audio.aralects.com/leb/greetings/2.wav",
    promptid: 11,
  },
  {
    sentenceId: 3,
    languageHighLight: "masaa l-kheer",
    languagesentence: "masaa l-kheer , shuu 'akhbaarak yaa saamir ?",
    translationHighLight: "Good evening, how’s it going, Samer?",
    promptTranslation: "Good evening, how’s it going, Samer?",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/3_word.wav",
    translationSentence: "مَسَا الخَير ، شُو أَخْبَارَك يَا سَامِر ؟",
    highlightedSecondLanguage: "مَسَا الخَير",
    promptAudio: "https://audio.aralects.com/leb/greetings/3.wav",
    promptid: 13,
  },
  {
    sentenceId: 4,
    languageHighLight: "kiifak",
    languagesentence: "'anaa tameem , 'inta kiifak ?",
    translationHighLight: "I'm fine, how are you?",
    promptTranslation: "I'm fine, how are you?",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/4_word.wav",
    translationSentence: "أَنَا تَمِام ، إِنْتَ كِيفَك ؟",
    highlightedSecondLanguage: "كِيفَك",
    promptAudio: "https://audio.aralects.com/leb/greetings/4.wav",
    promptid: 18,
  },
  {
    sentenceId: 5,
    languageHighLight: "kiifik",
    languagesentence: "'ana mish mniiH , 'inti kiifik ?",
    translationHighLight: "I am not good, how are you?",
    promptTranslation: "I am not good, how are you?",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/5_word.wav",
    translationSentence: "أَنَا مِشْ مْنِيحْ ، إِنْتِ كِيفِك ؟",
    highlightedSecondLanguage: "كِيفِك",
    promptAudio: "https://audio.aralects.com/leb/greetings/5.wav",
    promptid: 24,
  },
  {
    sentenceId: 6,
    languageHighLight: "maꜤ is-saleemiħ",
    languagesentence: "maꜤ is-saleemiħ , bshuufak bukraħ .",
    translationHighLight: "Goodbye, see you tomorrow.",
    promptTranslation: "Goodbye, see you tomorrow.",
    Highlightedaudio: "https://audio.aralects.com/leb/greetings/6_word.wav",
    translationSentence: "مَع السَّلِامِة ، بْشُوفَك بُكْرَة .",
    highlightedSecondLanguage: "مَع السَّلِامِة",
    promptAudio: "https://audio.aralects.com/leb/greetings/6.wav",
    promptid: 25,
  },
];

// Use this for testing
export const defaultPromptStatusArray: {
  prompt_id: number;
  status: boolean;
}[] = [
  {
    prompt_id: 1,
    status: false,
  },
  {
    prompt_id: 6,
    status: false,
  },
  {
    prompt_id: 11,
    status: false,
  },
  {
    prompt_id: 13,
    status: false,
  },
  {
    prompt_id: 18,
    status: false,
  },
  {
    prompt_id: 24,
    status: false,
  },
  {
    prompt_id: 25,
    status: false,
  },
];
