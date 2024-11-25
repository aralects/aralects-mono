import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import {
  Badge,
  Button,
  FancyScrollArea,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui";
import { cn } from "~/lib/utils";
import { Search } from "~/components/core/search";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

export type RootHeaderProps = {
  roots: string[];
  lexemes: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const RootHeader = React.forwardRef<HTMLDivElement, RootHeaderProps>(
  ({ className, lexemes = [], roots, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const activeRoot = searchParams.get("activeRoot");
    const lexeme = searchParams.get("lexeme");

    const filteredLexemes = useMemo(() => {
      return lexemes.filter((inflection) => inflection.includes(query));
    }, [query, lexemes]);

    const handleSelectRoot = (_e: React.MouseEvent, root: string) => {
      searchParams.set("activeRoot", root);
      setSearchParams(searchParams);
    };

    const handleSelectLexeme = (_e: React.MouseEvent, newLexeme: string) => {
      if (lexeme === newLexeme) return;
      searchParams.set("lexeme", newLexeme);
      setSearchParams(searchParams);
    };

    const handleCloseRoot = (e: React.MouseEvent, root: string) => {
      e.stopPropagation();
      const roots = searchParams.getAll("root");
      const newRoots = roots.filter((r) => r !== root);
      setSearchParams({ root: newRoots });
    };

    // make sure there is always an active root
    useEffect(() => {
      if (activeRoot) return;

      searchParams.append("activeRoot", roots[0]);
      setSearchParams(searchParams);
    }, [activeRoot, roots, searchParams, setSearchParams]);

    // make sure there is always an lexeme
    useEffect(() => {
      if (lexeme) return;

      searchParams.append("lexeme", lexemes[0]);
      setSearchParams(searchParams);
    }, [lexeme, lexemes, searchParams, setSearchParams]);

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col", className)}
        {...props}
      >
        <div className="flex w-fit items-center">
          {roots.map((rootName) => (
            <button
              key={rootName}
              className={clsx(
                "cursor-pointer rounded-t-lg border border-b-0 py-2 pl-4 pr-2",
                "hover:bg-accent/60 has-[button:hover]:bg-transparent",
                rootName === activeRoot &&
                  "bg-accent/80 text-accent-foreground",
              )}
              onClick={(e) => handleSelectRoot(e, rootName)}
            >
              <span className="mr-2 text-xl font-bold" dir="rtl">
                {rootName}
              </span>
              <Button
                variant="ghost"
                onClick={(e) => handleCloseRoot(e, rootName)}
                className="hover:bg-accent/60 pointer-events-auto h-auto w-auto rounded-full p-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </button>
          ))}
        </div>

        <div className="relative h-[74px] rounded-b-lg rounded-tr-lg border">
          <div className="absolute inset-0 flex items-center gap-x-2 px-4">
            <Search
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              className="min-w-52"
              placeholder="Search lexemes..."
            />

            <FancyScrollArea
              orientation="horizontal"
              className="flex items-center gap-x-2 px-2 py-4"
            >
              {filteredLexemes.map((lex, index) => (
                <Badge
                  variant={lexeme === lex ? "default" : "secondary"}
                  size="md"
                  key={index}
                  dir="rtl"
                  className="cursor-pointer"
                  role="button"
                  onClick={(e) => handleSelectLexeme(e, lex)}
                >
                  {lex}
                </Badge>
              ))}
            </FancyScrollArea>

            <div className="ml-auto flex flex-shrink-0 items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Lexeme</TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-4" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Root</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Root</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
RootHeader.displayName = "RootHeader";

export { RootHeader };
