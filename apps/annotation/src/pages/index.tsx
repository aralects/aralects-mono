import localFont from "next/font/local";

import {
  ColorModeSelect,
  InputWithHistory,
  RootList,
  RootListItem,
  StatusSelect,
} from "@repo/ui";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
];

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
    >
      <ColorModeSelect />
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <InputWithHistory history="Some previous text" full />
        <StatusSelect />
        <RootList items={rootItems} />
      </main>
    </div>
  );
}
