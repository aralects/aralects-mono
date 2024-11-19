import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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

export type RootHeaderProps = {
  rootName: string;
  inflections: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const RootHeader = React.forwardRef<HTMLDivElement, RootHeaderProps>(
  ({ className, inflections, rootName, ...props }, ref) => {
    const [query, setQuery] = useState("");

    const filteredInflections = useMemo(() => {
      return inflections.filter((inflection) => inflection.includes(query));
    }, [query, inflections]);

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col", className)}
        {...props}
      >
        <div className="flex w-fit items-center gap-x-4">
          <div className="rounded-t-lg border border-b-0 p-4">
            <span className="text-xl font-bold" dir="rtl">
              {rootName}
            </span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
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
              {filteredInflections.map((inflection, index) => (
                <Badge size="md" key={index} dir="rtl">
                  {inflection}
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
