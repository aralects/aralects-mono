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
    avatar: '/c?height=40&width=40',
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

  return (
    <Card className="w-full max-w-md">
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
            className="pl-9"
          />
        </div>

        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-semibold">Annotator</span>
            <span className="text-sm text-muted-foreground">{selected.length} selected</span>
          </div>

          <div className="divide-y">
            {filteredAnnotators.map((annotator) => (
              <div key={annotator.id} className="flex items-center space-x-4 p-4 hover:bg-muted/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={annotator.avatar} alt={annotator.name} />
                  <AvatarFallback>{annotator.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{annotator.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {annotator.stats.root} Root - {annotator.stats.lexeme} Lexeme
                  </p>
                </div>
                <Checkbox
                  checked={selected.includes(annotator.id)}
                  onCheckedChange={() => handleToggle(annotator.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start p-0 h-auto font-normal hover:bg-transparent hover:underline"
          onClick={handleSelectAll}
        >
          Select all
        </Button>

        <div className="flex space-x-4">
          <Button className="flex-1" onClick={() => onApply(selected)}>
            Apply
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
