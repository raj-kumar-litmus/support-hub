import { externalTooltipHandler } from "../components/utils/Utils";

export const SESSIONS: string = "Sessions";
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
export const TOTAL_SESSIONS_PER_MIN_PRIMARY: string =
  "Azure Primary (Sessions/Min)";
export const TOTAL_SESSIONS_PER_MIN_SECONDARY: string =
  "Azure Secondary (Sessions/Min)";
export const TOTAL_SESSIONS_PER_MINUTE: string = "Total Session per minute";
export const MINS = "Mins";

export const ORDER_DETAILS: string = "Order Details";
export const PROMOTIONS: string = "Promotions";
export const ORDER: string = "Order";
export const ORDER_TOTAL: string = "Order Total";
export const SUBMITTED: string = "Submitted";
export const LOCALE: string = "Locale";
export const ORDER_TYPE: string = "Order Type";
export const STATUS_ACROSS: string = "Status Across All System";
export const ATG: string = "ATG";
export const OMS: string = "OMS";
export const WMS: string = "WMS";
export const SHIPPED: string = "Shipped";
export const SHIPPED_AND_INVOICED: string = "Shipped and Invoiced";
export const CUSTOMER_INFO: string = "Customer Information";
export const NAME: string = "Name";
export const EMAIL: string = "Email";
export const BITIER: string = "Bi Tier";
export const ITEMS_INFO: string = "Items Information";
export const SKU: string = "SKU";
export const QUANTITY: string = "Quantity";
export const TYPE: string = "Type";
export const UNIT_PRICE: string = "Unit Price";
export const TOTAL_PRICE: string = "Total Price";
export const PAYMENT_INFO: string = "Payment Information";
export const PAYMENT_TYPE: string = "Payment Type";
export const STATUS: string = "Status";
export const AMOUNT: string = "Amount";
export const NO_MATCHING_ORDERS_FOUND: string = "No Matching Orders.";
export const VIEW_ALL: string = "View All";

//App Constants
export const PRIMARY: string = "Primary";
export const SECONDARY: string = "Secondary";
export const BOTH: string = "Both";
export const DEFAULT_PERIOD: number = 10;
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
  TITLE_FONT_SIZE: 12,
  SUBTITLE_FONT_SIZE: 12,
  DATALABEL_FONT_SIZE: 10,
  ROTATION_0: 0,
  ROTATION_270: 270,
};
export const SESSIONS_CHART = {
  BAR_PERCENT: 0.9,
  MAX_BAR_THICKNESS: 40,
  BAR_BORDER_RADIUS: 6,
  STEP_SIZE: 5000,
  TICK_COUNT: 5,
  CATEGORY_PERCENT: 0.6,
};

export const ORDER_STATUS_LIST = [
  {
    code: 1111,
    description: "Created",
  },
  {
    code: 1500,
    description: "Scheduled",
  },
  {
    code: 3200,
    description: "Released",
  },
  {
    code: 3350,
    description: "Included in shipments",
  },
  {
    code: 9000,
    description: "Shipped",
  },
  {
    code: 3700,
    description: "Cancelled",
  },
  {
    code: 3700.5,
    description: "Shipped and invoiced",
  },
];
export const OPM_OPTIONS = {
  responsive: true,
  layout: {
    padding: {
      left: 30,
      right: 50,
      top: 50,
      bottom: 20,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        color: "#FAF9F6",
        text: "Total Orders Per Minute",
        padding: { top: 30 },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "opm"),
    },
    datalabels: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "white",
    },
  },
};

export const OPM_COMPARISON_OPTIONS = ({
  apiResponse,
  startDate,
  endDate,
}) => ({
  responsive: true,
  layout: {
    padding: {
      left: 30,
      right: 50,
      top: 50,
      bottom: 20,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Total Orders Per Minute",
        color: "#E8E8E8",
        position: "left",
        padding: {
          top: 50,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "white",
    },
  },
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      display: true,
      position: "bottom",
      align: "start",
      labels: {
        boxWidth: 30,
        backgroundColor: "transparent",
        generateLabels: () => {
          return Object.keys(apiResponse).map((_, index) => ({
            text:
              index === 0
                ? startDate?.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : endDate?.toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }),
            fillStyle: "transparent",
            lineWidth: 2,
            fontColor: index === 0 ? "#6370FF" : "#FDA44F",
            strokeStyle: index === 0 ? "#6370FF" : "#FDA44F",
          }));
        },
      },
    },
    tooltip: {
      enabled: false,
      external: (_) => externalTooltipHandler(_, "opmComparison"),
    },
  },
});
