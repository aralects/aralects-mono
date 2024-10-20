import { InputWithHistory, RootList, StatusSelect } from "@repo/ui";

export default function IndexRoute() {
  return (
    <main className="row-start-2 mx-auto flex flex-col items-center gap-8 sm:items-start">
      <InputWithHistory history="Some previous text" full />
      <StatusSelect />
      <RootList items={[]} />
    </main>
  );
}
