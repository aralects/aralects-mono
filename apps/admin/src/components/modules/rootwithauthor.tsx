"use client";

import * as React from "react";
import { Search, UserPlus, X, Filter } from "lucide-react";
import { Button } from "@repo/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Input } from "@repo/ui";
import { Checkbox } from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { Badge } from "@repo/ui";
import { ScrollArea } from "@repo/ui";

interface Root {
  id: string;
  name: string;
  lexemes: number;
  avatar: string;
}

interface Annotator {
  id: string;
  name: string;
  avatar: string;
  stats: {
    root: number;
    lexeme: number;
  };
}

const roots: Root[] = [
  {
    id: "1",
    name: "كتب",
    lexemes: 15,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "قرأ",
    lexemes: 12,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "علم",
    lexemes: 20,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "فهم",
    lexemes: 8,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "درس",
    lexemes: 10,
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const annotators: Annotator[] = [
  {
    id: "1",
    name: "Benjamin Carter",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { root: 10, lexeme: 120 },
  },
  {
    id: "2",
    name: "William Harrison",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { root: 6, lexeme: 80 },
  },
  {
    id: "3",
    name: "Samuel Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { root: 13, lexeme: 90 },
  },
  {
    id: "4",
    name: "Daniel Brooks",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { root: 22, lexeme: 399 },
  },
  {
    id: "5",
    name: "Michael Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    stats: { root: 30, lexeme: 700 },
  },
];

export function RootWithAuthor() {
  const [filteredRoots, setFilteredRoots] = React.useState(roots);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const filteredAnnotators = annotators.filter((annotator) =>
    annotator.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selected.length === filteredAnnotators.length) {
      setSelected([]);
    } else {
      setSelected(filteredAnnotators.map((a) => a.id));
    }
  };

  const handleApply = () => {
    console.log("Selected annotators:", selected);
    setIsFilterOpen(false);
  };

  const selectAllState = React.useMemo(() => {
    if (selected.length === 0) return false;
    if (selected.length === filteredAnnotators.length) return true;
    return "indeterminate";
  }, [selected.length, filteredAnnotators.length]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredRoots(
      roots.filter((root) => root.name.toLowerCase().includes(query)),
    );
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl font-bold">Root List</CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsFilterOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder="Search roots..."
              value={search}
              onChange={handleSearchChange}
              className="pl-9"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8"
                onClick={() => {
                  setSearch("");
                  setFilteredRoots(roots);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="-mx-6 -mb-6 max-h-[350px] min-h-[350px] overflow-auto px-6 pb-6">
          <div className="space-y-2">
            {filteredRoots.map((root) => (
              <div
                key={root.id}
                className="hover:bg-accent flex items-center justify-between rounded-lg p-2 px-4"
              >
                <div className="flex items-center space-x-4">
                  <Badge>{root.lexemes} Lexemes</Badge>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={root.avatar} alt="Avatar" />
                    <AvatarFallback>{root.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xl font-semibold">{root.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="relative w-full max-w-md bg-zinc-950 text-white">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setIsFilterOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Filter by Annotator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
                <Input
                  placeholder="Search annotators..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-zinc-800 bg-zinc-900 pl-9"
                />
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900">
                <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                  <span className="text-lg font-semibold">Annotator</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-zinc-400">Select all</span>
                    <Checkbox
                      checked={selectAllState}
                      onCheckedChange={handleSelectAll}
                      className="h-5 w-5 data-[state=indeterminate]:bg-zinc-800 data-[state=indeterminate]:text-white"
                      aria-label="Select all annotators"
                    />
                  </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                  {filteredAnnotators.map((annotator) => (
                    <div
                      key={annotator.id}
                      className="flex items-center space-x-4 border-b border-zinc-800 p-4 last:border-b-0 hover:bg-zinc-800/50"
                    >
                      <Avatar className="h-10 w-10 bg-zinc-700">
                        <AvatarImage
                          src={annotator.avatar}
                          alt={annotator.name}
                        />
                        <AvatarFallback>
                          {annotator.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{annotator.name}</h3>
                        <p className="text-sm text-zinc-400">
                          {annotator.stats.root} Root - {annotator.stats.lexeme}{" "}
                          Lexeme
                        </p>
                      </div>
                      <Checkbox
                        checked={selected.includes(annotator.id)}
                        onCheckedChange={() => handleToggle(annotator.id)}
                        className="h-5 w-5"
                        aria-label={`Select ${annotator.name}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end border-t border-zinc-800 p-4">
                  <span className="text-sm text-zinc-400">
                    {selected.length} selected
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleApply}
                >
                  Apply
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-800 hover:bg-zinc-800"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
