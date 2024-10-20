import {
  InputWithHistory,
  RootList,
  RootListItem,
  StatusSelect,
} from "@repo/ui";
import Navbar from "../layout/Navbar";

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

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="row-start-2 mx-auto flex flex-col items-center gap-8 sm:items-start">
        <InputWithHistory history="Some previous text" full />
        <StatusSelect />
        <RootList items={rootItems} />
      </main>
    </div>
  );
}

export default App;
