'use client';

import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';

export default function Component({
  onValueChange = (value: string) => console.log(value),
}: {
  onValueChange?: (value: string) => void;
}) {
  const POS = ['NOUN', 'VERB', 'ADJ', 'ADJ_COMP', 'NOUN_ACT'];

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[220px] h-[60px] text-base">
        <SelectValue placeholder="POS" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {POS.map((pos) => (
            <SelectItem key={pos} value={pos} className="text-base">
              {pos}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
