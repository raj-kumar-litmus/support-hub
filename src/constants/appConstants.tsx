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
export const CHART_TITLE_FONT_SIZE: number = 10;
export const CHART_DATALABEL_FONT_SIZE: number = 10;
export const BAR_PERCENT: number = 0.7;
export const MAX_BAR_THICKNESS: number = 40;
export const BAR_BORDER_RADIUS: number = 6;
export const ROTATION_0: number = 0;
export const ROTATION_270: number = 270;
export const STEP_SIZE: number = 5000;
export const TICK_COUNT: number = 5;
