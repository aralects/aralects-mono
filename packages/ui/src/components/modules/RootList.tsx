import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { PropsOf } from "~/lib/utils";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";

import { Filter, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../core/avatar";
import { Badge } from "../core/badge";
import { Button } from "../core/button";
import { Card, CardContent, CardHeader, CardTitle } from "../core/card";
import { ColumnWithDividers } from "../core/column";
import { Input, InputProps } from "../core/input";
import { ScrollArea } from "../core/scroll-area";

export type RootListItem = {
  lexemes: number;
  avatar: string;
  root: string;
};

export type RootListProps = PropsOf<typeof Card> & {
  items: RootListItem[];
};

const RootListItems = React.forwardRef<
  HTMLDivElement,
  ScrollAreaProps & {
    items: RootListItem[];
  }
>(({ className, items, ...props }, ref) => {
  return (
    <ScrollArea
      ref={ref}
      className={clsx(
        "-mx-6 -mb-6 max-h-[350px] min-h-[350px] overflow-auto px-6 pb-6",
        className,
      )}
      {...props}
    >
      <ColumnWithDividers className="gap-y-2">
        {!items.length ? (
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <span className="text-muted-foreground text-lg">
              No results found.
            </span>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="hover:bg-accent flex items-center justify-between rounded-lg p-2 px-4"
            >
              <div className="flex items-center space-x-4">
                <Badge>{item.lexemes} Lexemes</Badge>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.avatar} alt="Avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xl font-semibold">{item.root}</span>
            </div>
          ))
        )}
      </ColumnWithDividers>
    </ScrollArea>
  );
});
RootListItems.displayName = "RootListItems";

const RootListSearchBar = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "icon"> & { onClear: () => void }
>(({ onClear, value, ...props }, ref) => {
  const isEmpty = value === undefined || value === "";

  return (
    <Input
      ref={ref}
      value={value}
      {...props}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !isEmpty) {
          onClear();
        }
      }}
      icon={
        <>
          <Search
            className={clsx(
              "text-muted-foreground h-4 w-4 transition-all",
              isEmpty ? "rotate-0 scale-100" : "-rotate-90 scale-0",
            )}
          />
          <Button
            className={clsx(
              "text-muted-foreground absolute h-5 w-5 transition-all",
              isEmpty ? "-rotate-90 scale-0" : "rotate-0 scale-100",
            )}
            size="icon"
            variant="ghost"
            tabIndex={isEmpty ? -1 : 0}
            onClick={onClear}
          >
            <X />
          </Button>
        </>
      }
    />
  );
});
RootListSearchBar.displayName = "RootListSearchBar";

const RootList = React.forwardRef<HTMLDivElement, RootListProps>(
  ({ className, items, ...props }, ref) => {
    const [query, setQuery] = useState("");

    const filteredItems = useMemo(() => {
      return items.filter((item) => item.root.includes(query));
    }, [query, items]);

    return (
      <Card ref={ref} className={clsx("", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Root List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <RootListSearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
            />
            <Button variant="outline" size="icon">
              <Filter className="text-muted-foreground h-4 w-4" />
            </Button>
          </div>
          <RootListItems items={filteredItems} />
        </CardContent>
      </Card>
    );
  },
);
RootList.displayName = "RootList";

export { RootList };
