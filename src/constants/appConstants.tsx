//Titles
export const SESSIONS: string = "Sessions";

//Labels
export const DURATION: string = "Duration";
export const TIME: string = "Time";
export const DATE: string = "Date";
export const CHANNEL: string = "Channel";
export const FILTERS: string = "Filters";
export const SUBMIT: string = "Submit";
export const SELECT_DURATION: string = "Select Duration";
export const SELECT_CHANNEL: string = "Select Channel";
export const DD_MM_YYYY: string = "dd/mm/yyyy";
export const HH_MM: string = "hh:mm";
export const FROM: string = "From";
export const RESET: string = "Reset";

//Graph Titles
export const TOTAL_SESSIONS_PER_MIN: string = "Total Session per minute";
export const TOTAL_ORDERS_PER_MIN: string = "Total Orders per minute";
export const TOTAL_SESSIONS_PER_MIN_PRIMARY: string =
  "Azure Primary (Sessions/Min)";
export const TOTAL_SESSIONS_PER_MIN_SECONDARY: string =
  "Azure Secondary (Sessions/Min)";

//App Constants
export const PRIMARY: string = "Primary";
export const SECONDARY: string = "Secondary";
export const CHANNEL_LIST: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Desktop", value: "web" },
  { label: "Mobile Web", value: "mobileWeb" },
  { label: "iPhone App", value: "iPhoneApp" },
  { label: "Android App", value: "androidApp" },
];
export const DURATION_LIST: { label: string; value: number }[] = [
  { label: "5 Mins", value: 5 },
  { label: "10 Mins", value: 10 },
  { label: "15 Mins", value: 15 },
  { label: "20 Mins", value: 20 },
  { label: "30 Mins", value: 30 },
  { label: "60 Mins", value: 60 },
];

// Chart Constants
export const CHART = {
  TITLE_FONT_SIZE: 18,
  SUBTITLE_FONT_SIZE: 12,
  DATALABEL_FONT_SIZE: 10,
  ROTATION_0: 0,
  ROTATION_270: 270,
};

export const SESSIONS_CHART = {
  BAR_PERCENT: 0.95,
  CATEGORY_PERCENT: 0.6,
  MAX_BAR_THICKNESS: 40,
  BAR_BORDER_RADIUS: 6,
  STEP_SIZE: 5000,
  TICK_COUNT: 5,
};
