'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Input } from '@repo/ui';
import { Button } from '@repo/ui';
import { Checkbox } from '@repo/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui';

interface Annotator {
  id: string;
  name: string;
  avatar: string;
  stats: {
    root: number;
    lexeme: number;
  };
}

const annotators: Annotator[] = [
  {
    id: '1',
    name: 'Benjamin Carter',
    avatar: '/placeholder.svg?height=40&width=40',
    stats: { root: 10, lexeme: 120 },
  },
  {
    id: '2',
    name: 'William Harrison',
    avatar: '/placeholder.svg?height=40&width=40',
    stats: { root: 6, lexeme: 80 },
  },
  {
    id: '3',
    name: 'Samuel Thompson',
    avatar: '/placeholder.svg?height=40&width=40',
    stats: { root: 13, lexeme: 90 },
  },
  {
    id: '4',
    name: 'Daniel Brooks',
    avatar: '/placeholder.svg?height=40&width=40',
    stats: { root: 22, lexeme: 399 },
  },
  {
    id: '5',
    name: 'Michael Anderson',
    avatar: '/placeholder.svg?height=40&width=40',
    stats: { root: 30, lexeme: 700 },
  },
];

export default function Component({
  onApply = (selected: string[]) => console.log(selected),
  onCancel = () => console.log('cancelled'),
}: {
  onApply?: (selected: string[]) => void;
  onCancel?: () => void;
}) {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const filteredAnnotators = annotators.filter((annotator) =>
    annotator.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selected.length === filteredAnnotators.length) {
      setSelected([]);
    } else {
      setSelected(filteredAnnotators.map((a) => a.id));
    }
  };

  // Calculate checkbox state
  const selectAllState = React.useMemo(() => {
    if (selected.length === 0) return false;
    if (selected.length === filteredAnnotators.length) return true;
    return 'indeterminate';
  }, [selected.length, filteredAnnotators.length]);

  return (
    <Card className="w-full max-w-md bg-zinc-950 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Filter by Annotator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search annotators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-zinc-900 border-zinc-800"
          />
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800">
            <span className="text-lg font-semibold">Annotator</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-zinc-400">Select all</span>
              <Checkbox checked={selectAllState} onCheckedChange={handleSelectAll} className="h-5 w-5" />
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {filteredAnnotators.map((annotator) => (
              <div
                key={annotator.id}
                className="flex items-center space-x-4 p-4 hover:bg-zinc-800/50 border-b border-zinc-800 last:border-b-0"
              >
                <Avatar className="h-10 w-10 bg-zinc-700">
                  <AvatarImage src={annotator.avatar} alt={annotator.name} />
                  <AvatarFallback>{annotator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{annotator.name}</h3>
                  <p className="text-sm text-zinc-400">
                    {annotator.stats.root} Root - {annotator.stats.lexeme} Lexeme
                  </p>
                </div>
                <Checkbox
                  checked={selected.includes(annotator.id)}
                  onCheckedChange={() => handleToggle(annotator.id)}
                  className="h-5 w-5"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end p-4 border-t border-zinc-800">
            <span className="text-sm text-zinc-400">{selected.length} selected</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onApply(selected)}>
            Apply
          </Button>
          <Button variant="outline" className="flex-1 border-zinc-800 hover:bg-zinc-800" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
