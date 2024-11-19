import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { z } from "zod";
import { SelectProps } from "@radix-ui/react-select";

const POS_VALUES = ["noun", "verb", "adj", "adj_comp", "noun_act"] as const;
const POS_OPTIONS = POS_VALUES.map((value) => ({
  value,
  label: value.toUpperCase(),
}));

// @todo move to constants file
export const posSchema = z.enum(POS_VALUES, { message: "POS is required" });

export type Pos = (typeof POS_OPTIONS)[number]["value"];

export const PosSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="min-w-48">
        <SelectValue placeholder="POS" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {POS_OPTIONS.map((pos) => (
            <SelectItem key={pos.value} value={pos.value}>
              {pos.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
