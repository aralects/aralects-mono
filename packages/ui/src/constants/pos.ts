export const POS_VALUES = [
  "noun",
  "verb",
  "adj",
  "adj_comp",
  "noun_act",
] as const;

export const POS_OPTIONS = POS_VALUES.map((value) => ({
  value,
  label: value.toUpperCase(),
}));
