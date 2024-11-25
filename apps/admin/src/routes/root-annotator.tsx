import { AppContainer, AppContent, AppHeader } from "@/components/AppContainer";
import { LexemeDetails } from "@/components/LexemeDetails";
import { RootHeader } from "@/components/RootHeader";
import { RootList } from "@/components/RootList";
import { Logo, RootListItem } from "@repo/ui";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router-dom";

const rootItems: RootListItem[] = [
  { lexemes: 24, avatar: "", root: "ك.و.ن" },
  { lexemes: 17, avatar: "", root: "ك.ن.و" },
  { lexemes: 20, avatar: "", root: "و.ك.ن" },
  { lexemes: 33, avatar: "", root: "و.ن.ك" },
  { lexemes: 28, avatar: "", root: "ن.ك.و" },
];

const LEXEMES = [
  "كان",
  "يكون",
  "كانت",
  "كانوا",
  "كانون",
  "كانوات",
  "كانوني",
  "كانواتي",
  "كانوان",
  "كانواتن",
  "كانواته",
  "كانواني",
  "كانواتين",
  "كانواتها",
  "كانوانه",
  "كانواتهم",
  "كانواتهما",
  "كانوانها",
  "كانواتهمي",
  "كانواتهمان",
];

const RootAnnotatorEmpty = () => {
  return (
    <div className="h-full px-2 py-4">
      <div className="bg-muted/40 flex h-full flex-col items-center justify-center gap-y-4 rounded-lg border">
        <Logo className="text-muted-foreground/40" />
        <h2 className="text-lg">Select a root to start</h2>
      </div>
    </div>
  );
};

const RootAnnotatorDetails = () => {
  const [searchParams] = useSearchParams();
  const roots = searchParams.getAll("root");
  const lexeme = searchParams.get("lexeme");

  if (roots.length === 0) return <RootAnnotatorEmpty />;

  return (
    <div className="flex flex-col gap-y-4 overflow-hidden py-4">
      <RootHeader roots={roots} lexemes={LEXEMES} />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={lexeme}
          initial={{
            // scale: 0.9,
            translateX: 25,
            opacity: 0,
          }}
          animate={{
            // scale: 1,
            translateX: 0,
            opacity: 1,
          }}
          exit={{
            // scale: 0.9,
            translateX: -50,
            opacity: 0,
          }}
        >
          <LexemeDetails lexeme={lexeme} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const RootAnnotator = () => {
  return (
    <AppContainer>
      <AppHeader />
      <AppContent className="grid grid-cols-[300px_1fr] gap-x-4 px-4">
        <div className="flex h-full flex-grow flex-col py-4">
          <RootList className="sticky top-[66px]" items={rootItems} />
        </div>

        <RootAnnotatorDetails />
      </AppContent>
    </AppContainer>
  );
};
