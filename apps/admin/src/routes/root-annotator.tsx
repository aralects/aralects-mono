import { AppContainer, AppContent, AppHeader } from "@/components/AppContainer";
import { LexemeDetails } from "@/components/LexemeDetails";
import { RootHeader } from "@/components/RootHeader";
import { RootList, RootListItem } from "@repo/ui";

const rootItems: RootListItem[] = [
  { lexemes: 24, avatar: "", root: "ك.و.ن" },
  { lexemes: 17, avatar: "", root: "ك.ن.و" },
  { lexemes: 20, avatar: "", root: "و.ك.ن" },
  { lexemes: 33, avatar: "", root: "و.ن.ك" },
  { lexemes: 28, avatar: "", root: "ن.ك.و" },
  { lexemes: 12, avatar: "", root: "ن.و.ك" },
  { lexemes: 24, avatar: "", root: "ك.و.ن" },
  { lexemes: 17, avatar: "", root: "ك.ن.و" },
  { lexemes: 20, avatar: "", root: "و.ك.ن" },
  { lexemes: 33, avatar: "", root: "و.ن.ك" },
  { lexemes: 28, avatar: "", root: "ن.ك.و" },
  { lexemes: 12, avatar: "", root: "ن.و.ك" },
  { lexemes: 20, avatar: "", root: "و.ك.ن" },
  { lexemes: 33, avatar: "", root: "و.ن.ك" },
  { lexemes: 28, avatar: "", root: "ن.ك.و" },
  { lexemes: 12, avatar: "", root: "ن.و.ك" },
  { lexemes: 24, avatar: "", root: "ك.و.ن" },
  { lexemes: 17, avatar: "", root: "ك.ن.و" },
  { lexemes: 20, avatar: "", root: "و.ك.ن" },
  { lexemes: 33, avatar: "", root: "و.ن.ك" },
  { lexemes: 28, avatar: "", root: "ن.ك.و" },
  { lexemes: 12, avatar: "", root: "ن.و.ك" },
];

export const RootAnnotator = () => {
  return (
    <AppContainer>
      <AppHeader />
      <AppContent className="grid grid-cols-[300px_1fr] gap-x-4 px-4">
        <div className="flex h-full flex-grow flex-col py-4">
          <RootList items={rootItems} />
        </div>

        <div className="flex flex-col gap-y-4 py-4">
          <RootHeader
            rootName="ك.و.ن"
            inflections={[
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
            ]}
          />
          <LexemeDetails lexemeName="كان" />
        </div>
      </AppContent>
    </AppContainer>
  );
};
