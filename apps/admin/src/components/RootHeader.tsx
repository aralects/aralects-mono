import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import {
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
import { AnimatePresence, motion } from "motion/react";
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
    const rootTabs = searchParams.getAll("root");
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
      searchParams.delete("root");
      newRoots.forEach((r) => searchParams.append("root", r));
      setSearchParams(searchParams);
    };

    // make sure there is always an active root
    useEffect(() => {
      if (activeRoot && rootTabs.includes(activeRoot)) return;

      searchParams.delete("activeRoot");
      const newActiveRoot = rootTabs[0];
      searchParams.append("activeRoot", newActiveRoot);
      setSearchParams(searchParams);
    }, [activeRoot, rootTabs, searchParams, setSearchParams]);

    // make sure there is always an lexeme
    useEffect(() => {
      if (lexemes.find((l) => l === lexeme)) return;

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
          <AnimatePresence mode="popLayout" initial={false}>
            {roots.map((rootName) => (
              <motion.button
                layout
                key={rootName}
                className={clsx(
                  "cursor-pointer rounded-t-lg border border-b-0 py-2 pl-4 pr-2",
                  "hover:bg-accent/60 has-[button:hover]:bg-transparent",
                  rootName === activeRoot &&
                    "bg-accent/80 text-accent-foreground",
                )}
                onClick={(e) => handleSelectRoot(e, rootName)}
                initial={{ translateY: "100%", opacity: 0 }}
                animate={{
                  translateY: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 1000,
                    damping: 45,
                  },
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                onMouseUp={(e) => {
                  // middle mouse button (button 1)
                  if (e.button === 1) {
                    e.preventDefault();
                    handleCloseRoot(e, rootName);
                  }
                }}
              >
                <span className="mr-2 text-xl font-bold" dir="rtl">
                  {rootName}
                </span>
                <Button
                  asChild
                  variant="ghost"
                  onClick={(e) => handleCloseRoot(e, rootName)}
                  className="hover:bg-accent/60 pointer-events-auto h-auto w-auto rounded-full p-2"
                >
                  <span>
                    <X className="h-3 w-3" />
                  </span>
                </Button>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-background relative z-[1] h-[74px] rounded-b-lg rounded-tr-lg border">
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
                <Button
                  variant={lexeme === lex ? "default" : "secondary"}
                  key={index}
                  dir="rtl"
                  onClick={(e) => handleSelectLexeme(e, lex)}
                  className="rounded-full text-lg font-semibold"
                >
                  {lex}
                </Button>
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
