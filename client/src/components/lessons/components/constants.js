export const NAV_LINKS = [
  {
    link: "",
    name: "Stats",
  },
  {
    link: "spec",
    name: "Specifications",
  },
  {
    link: "practice",
    name: "Practices",
  },
];

export const SETTINGS_FIELDS = [
  {
    type: "number",
    alias: "repetitions",
    name: "Number of practice",
    value: 0,
  },
];

export const STAT_VALUES = [
  {
    id: "progress",
    name: "Progress",
    value: ({ progress, repetitions }) => `${progress} / ${repetitions}`,
  },
  {
    id: "last_visit",
    name: "Last practice",
    value: ({ last_visit }) => last_visit || "-/-",
  },
  {
    id: "started_at",
    name: "Started at",
    value: ({ started_at }) => started_at || "-/-",
  },
];