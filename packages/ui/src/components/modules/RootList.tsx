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
        "ui--mx-6 ui--mb-6 ui-max-h-[360px] ui-overflow-auto ui-px-6 ui-pb-6",
        className
      )}
      {...props}
    >
      <ColumnWithDividers className="ui-gap-y-2">
        {!items.length ? (
          <div className="ui-flex ui-items-center ui-justify-center ui-p-2">
            <span className="ui-text-lg ui-text-muted-foreground">
              No results found
            </span>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="ui-flex ui-items-center ui-justify-between ui-rounded-lg ui-p-2 ui-px-4 ui-hover:bg-accent"
            >
              <div className="ui-flex ui-items-center ui-space-x-4">
                <Badge>{item.lexemes} Lexemes</Badge>
                <Avatar className="ui-h-8 ui-w-8">
                  <AvatarImage src={item.avatar} alt="Avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </div>
              <span className="ui-text-xl ui-font-semibold">{item.root}</span>
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
              "ui-h-5 ui-w-5 ui-text-muted-foreground ui-transition-all",
              isEmpty ? "ui-rotate-0 ui-scale-100" : "ui--rotate-90 ui-scale-0"
            )}
          />
          <Button
            className={clsx(
              "ui-absolute ui-h-5 ui-w-5 ui-text-muted-foreground ui-transition-all",
              isEmpty ? "ui--rotate-90 ui-scale-0" : "ui-rotate-0 ui-scale-100"
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
        <CardHeader className="ui-flex ui-flex-row ui-items-center ui-justify-between ui-space-y-0 ui-pb-2">
          <CardTitle className="ui-text-2xl ui-font-bold">Root List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="ui-flex ui-items-center ui-space-x-2 ui-pb-2">
            <RootListSearchBar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
            />
            <Button variant="outline" size="icon">
              <Filter className="ui-h-4 ui-w-4 ui-text-muted-foreground" />
            </Button>
          </div>
          <RootListItems items={filteredItems} />
        </CardContent>
      </Card>
    );
  }
);
RootList.displayName = "RootList";

export { RootList };
