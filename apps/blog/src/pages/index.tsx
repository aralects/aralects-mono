import * as React from "react";
import type { HeadProps, PageProps } from "gatsby";
import {
  InputWithHistory,
  RootList,
  RootListItem,
  StatusSelect,
} from "@repo/ui";

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

function IndexPage(_: PageProps): JSX.Element {
  return (
    <div
      className={`grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20`}
    >
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <InputWithHistory history="Some previous text" full />
        <StatusSelect />
        <RootList items={rootItems} />
      </main>
    </div>
  );
}

export default IndexPage;

export function Head(_: HeadProps): JSX.Element {
  return <title>Home Page</title>;
}
