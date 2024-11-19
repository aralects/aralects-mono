"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Input } from "@repo/ui";
import { Button } from "@repo/ui";
import { Checkbox } from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";

interface FilterItem {
  id: string;
  name: string;
  avatar?: string;
  stats?: {
    [key: string]: number;
  };
}

interface FilterModalProps {
  items: FilterItem[];
  onApply: (selected: string[]) => void;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({
  items,
  onApply,
  title,
  isOpen,
  onClose,
}: FilterModalProps) {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>([]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleToggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selected.length === filteredItems.length) {
      setSelected([]);
    } else {
      setSelected(filteredItems.map((a) => a.id));
    }
  };

  const selectAllState = React.useMemo(() => {
    if (selected.length === 0) return false;
    if (selected.length === filteredItems.length) return true;
    return "indeterminate";
  }, [selected.length, filteredItems.length]);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md bg-zinc-950 text-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-zinc-800 bg-zinc-900 pl-9"
            />
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-800 p-2">
              <span className="text-sm font-semibold">Select all</span>
              <Checkbox
                checked={selectAllState}
                onCheckedChange={handleSelectAll}
                className="h-4 w-4 data-[state=indeterminate]:bg-zinc-800 data-[state=indeterminate]:text-white"
              />
            </div>
            <div className="max-h-[200px] overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 border-b border-zinc-800 p-2 last:border-b-0 hover:bg-zinc-800/50"
                >
                  {item.avatar && (
                    <Avatar className="h-8 w-8 bg-zinc-700">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    {item.stats && (
                      <p className="truncate text-xs text-zinc-400">
                        {Object.entries(item.stats)
                          .map(([key, value]) => `${value} ${key}`)
                          .join(" - ")}
                      </p>
                    )}
                  </div>
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              {selected.length} selected
            </span>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
