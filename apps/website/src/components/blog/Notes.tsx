'use client';

import * as React from 'react';
import { Input } from '@repo/ui';
import { Button } from '@repo/ui';
import { Pencil } from 'lucide-react';

export default function Notes({
  value = '',
  onChange = (value: string) => console.log(value),
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative w-[220px]">
      <Input
        placeholder="Notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[60px] text-base pr-10"
      />
      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8">
        <Pencil className="h-5 w-5" />
      </Button>
    </div>
  );
}
