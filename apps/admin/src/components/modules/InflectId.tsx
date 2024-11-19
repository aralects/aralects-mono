"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

const inflectOptions = [
  { value: "MS", label: "MS" },
  { value: "FS", label: "FS" },
  { value: "P", label: "P" },
  { value: "MP", label: "MP" },
  { value: "FP", label: "FP" },
];

export default function InflectId({
  value = "",
  onChange = (value: string) => console.log(value),
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[60px] w-[220px] text-base">
        <SelectValue placeholder="Link to inflect ID" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {inflectOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-base"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
