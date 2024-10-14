export type Status = {
  value: string;
  label: string;
  color: string;
};

export const STATUS_LOOKUP: Record<string, Status> = {
  done: {
    value: "done",
    label: "Done",
    color: "#46CE3A",
  },
  gloss: {
    value: "gloss",
    label: "Gloss",
    color: "#E8E8E8",
  },
  pass: {
    value: "pass",
    label: "Pass",
    color: "#3E5DFF",
  },
  check: {
    value: "check",
    label: "Check",
    color: "#FFD070",
  },
  drop: {
    value: "drop",
    label: "Drop",
    color: "#FF0000",
  },
};

export const STATUSES = Object.values(STATUS_LOOKUP);
