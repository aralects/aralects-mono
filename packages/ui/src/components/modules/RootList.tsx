import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { PropsOf } from "~/lib/utils";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";

import { Filter, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../core/avatar";
import { Badge } from "../core/badge";
import { Button } from "../core/button";
import { Card, CardContent, CardHeader, CardTitle } from "../core/card";
import { ColumnWithDividers } from "../core/column";
import { FancyScrollArea } from "../core/scroll-area";
import { Search } from "../core/search";

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
    <FancyScrollArea
      ref={ref}
      className={clsx("max-h-[600px] p-4", className)}
      {...props}
    >
      <ColumnWithDividers className="gap-y-2">
        {!items.length ? (
          <div className="flex min-h-[350px] items-center justify-center p-2">
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
    </FancyScrollArea>
  );
});
RootListItems.displayName = "RootListItems";

const RootList = React.forwardRef<HTMLDivElement, RootListProps>(
  ({ className, items = [], ...props }, ref) => {
    const [query, setQuery] = useState("");

    const filteredItems = useMemo(() => {
      return items.filter((item) => item.root.includes(query));
    }, [query, items]);

    return (
      <Card ref={ref} className={clsx("overflow-hidden", className)} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="text-2xl font-bold">Root List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="mb-4 flex items-center space-x-2 px-4">
            <Search
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search roots..."
            />
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter className="text-muted-foreground h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Plus className="text-muted-foreground h-5 w-5" />
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
