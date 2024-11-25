import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { PropsOf } from "~/lib/utils";
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";

import { NavLink, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Filter, Plus } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ColumnWithDividers,
  FancyScrollArea,
  Search,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const roots = searchParams.getAll("root");

  const rootsLookup = useMemo(
    () =>
      roots.reduce(
        (acc, root) => {
          acc[root] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    [roots],
  );

  // append root to search params
  const handleOpenInTab = (e: React.MouseEvent, root: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (roots.includes(root)) return;
    searchParams.append("root", root);
    setSearchParams(searchParams);
  };

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
            <NavLink
              to={{
                search: "?root=" + item.root + "&activeRoot=" + item.root,
              }}
              key={index}
              className={clsx(
                "hover:bg-accent flex cursor-pointer items-center rounded-lg p-2",
                rootsLookup[item.root]
                  ? "bg-accent/80 text-accent-foreground"
                  : "has-[button:hover]:bg-transparent",
              )}
            >
              <div className="flex items-center space-x-2">
                <Badge size="sm">{item.lexemes} Lexemes</Badge>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={item.avatar} alt="Avatar" />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </div>
              <span className="ml-auto text-xl font-semibold">{item.root}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    disabled={!!rootsLookup[item.root]}
                    variant="ghost"
                    onClick={(e) => handleOpenInTab(e, item.root)}
                    className="hover:bg-accent/60 h-auto w-auto shrink-0 rounded-full p-2"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open in tab</TooltipContent>
              </Tooltip>
            </NavLink>
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
