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
export const DD_MM_YYYY_HH_MM: string = "dd/mm/yyyy hh:mm";
export const MM_DD_YYYY_HH_MM: string = "mm/dd/yyyy hh:mm";
export const FROM: string = "From";
export const RESET: string = "Reset";
export const TOTAL_SESSIONS_PER_MIN_PRIMARY: string =
  "Azure Primary (Sessions/Min)";
export const TOTAL_SESSIONS_PER_MIN_SECONDARY: string =
  "Azure Secondary (Sessions/Min)";
export const TOTAL_SESSIONS_PER_MINUTE: string = "Total Session per minute";
export const MINS = "Mins";
export const LASTDAY: string = "Last Day";
export const TODAY: string = "Today";
export const DIFFERENCE: string = "Difference";

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
export const HOME_PAGE_REFERSH_DURATION: number = 10;
export const REFRESHTIME: number = 3000;
export const DASHBOARD: string = 'Dashboard';
export const AVG_ORDERS_PER_MIN: string = 'Average Orders Per Min';
export const TOTAL_NO_OF_ORDERS: string = 'Total Number of Orders';
export const LAST_MIN_OPM: string = 'Last min OPM';
export const AVG_OPM_COMPARISON: string = 'Avg OPM Comparison';
export const TOTAL_ORDER_COMPARISON: string = 'Total Order Comparison';

export const LABELS = {
  duration: "Duration",
  date: "Date",
  channel: "Channel",
  locale: "Locale",
  payment: "Payment",
  promoCode: "Promo Code",
  startDate: "Date 1",
  endDate: "Date 2",
  submit: "Submit",
  reset: "Reset",
};

export const TITLE = {
  OPM: "OPM",
  OPM_COMPARISON: "OPM Comparison",
};

export const INPUT_TYPES = {
  dropdown: "dropdown",
  time: "time",
  text: "text",
};

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
  LEGEND_LINE_WIDTH: 2,
};

export const DURATIONS = {
  "10 mins": 10,
  "15 mins": 15,
  "30 mins": 30,
  "45 mins": 45,
  "60 mins": 60,
};

export const CHANNELS = {
  All: "",
  Desktop: 0,
  "Mobile Web": 5, 
  "iPhone App": 4,  
  "Android App": 9,    
  CSC: 2,
  "M Plus": 6,        
  Instagram: 11,
};

export const LOCALE_OPTIONS = {
  All: "",
  US: "US",
  CA: "CA",
};

export const PAYMENT_TYPES = {
  All: "",
  "Credit Card": "creditCard",
 " Klarna": "Klarna",
  "Store Credit": "storeCredit",
  "Gift Card": "giftCard",
  PayPal: "payPal",
  JCPenny: "JCPenny",
  "Apple Pay": "Applepay",
};

export const ORDER_STATUS_LIST = [
  {
    "Status Code": 1111,
    Description: "Created",
  },
  {
    "Status Code": 1500,
    Description: "Scheduled",
  },
  {
    "Status Code": 3200,
    Description: "Released",
  },
  {
    "Status Code": 3350,
    Description: "Included in shipments",
  },
  {
    "Status Code": 9000,
    Description: "Shipped",
  },
  {
    "Status Code": 3700,
    Description: "Cancelled",
  },
  {
    "Status Code": 3700.5,
    Description: "Shipped and invoiced",
  },
];
export const OPM_OPTIONS = (isMobile: boolean, showDataLabels = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile
      ? {
          left: 20,
          right: 20,
          top: 10,
          bottom: 40,
        }
      : {
          left: 30,
          right: 50,
          top: 50,
          bottom: 20,
        },
  },
  scales: {
    y: {
      grid: {
        color: "#00000033",
      },
      border: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
      title: {
        display: true,
        color: "#FAF9F6",
        text: "Total Orders Per Minute",
        padding: isMobile ? { top: 35, bottom: 35 } : { top: 35 },
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
      display: showDataLabels,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      align: "top",
      anchor: "center",
      font: {
        size: "12",
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      backgroundColor: "white",
    },
  },
});

export const OPM_COMPARISON_OPTIONS = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: isMobile
      ? {
          left: 20,
          right: 20,
          top: 10,
          bottom: 40,
        }
      : {
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
        padding: isMobile ? { top: 20, bottom: 20 } : { top: 50 },
      },
    },
    y: {
      border: {
        display: false,
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
      display: showDataLabels,
      formatter: (_, context) =>
        context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
      align: "top",
      anchor: "center",
      font: {
        size: "12",
      },
    },
    legend: {
      display: true,
      position: isMobile ? "top" : "bottom",
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

export const OPM_COMPARISON_OPTIONS_HOME = ({
  apiResponse,
  startDate,
  endDate,
  isMobile,
  showDataLabels = false,
}) => {
  const options = OPM_COMPARISON_OPTIONS({
    apiResponse,
    startDate,
    endDate,
    isMobile,
  });
  return {
    ...options,
    layout: {
      ...options.layout,
      padding: isMobile
        ? { left: 10, right: 20, top: 15, bottom: 0 }
        : {
            left: 30,
            right: 50,
            top: 35,
            bottom: 0,
          },
    },
    scales: {
      ...options.scales,
      x: {
        ...options.scales.x,
        title: {
          ...options.scales.x.title,
          padding: isMobile
            ? { top: 20, bottom: 20 }
            : { left: 50, top: 35, bottom: 0},
        },
      },
    },
    plugins: {
      ...options.plugins,
      datalabels: {
        display: showDataLabels,
        formatter: (_, context: any) =>
          context.chart.data.dataset?.[0]?.data?.[context.dataIndex],
        align: "top",
        anchor: "center",
        font: {
          size: "10",
        },
      },
      legend: {
        ...options.plugins.legend,
        position: "top",
      },
    },
  };
};

export const ORDER_STATUS: string = "Order Status";
export const SESSIONS_TABS = [
  { header: PRIMARY },
  { header: SECONDARY },
  { header: BOTH },
];

export const QUICK_LINKS = [{
  id: 0,
  header: "Alerting & Monitoring Tools",
  links: [
    { name: "Splunk - AZR1", link: import.meta.env.VITE_SPLUNK_AZR1 },
    { name: "Splunk - AZR2", link: import.meta.env.VITE_SPLUNK_AZR2 },
    { name: "Dynatrace - SRE Digital Dashboard", link: import.meta.env.VITE_DYNATRACE },
    { name: "Grafana - Overall Application View", link: import.meta.env.VITE_GRAFANA },
    { name: "Alert Manager - Omni Prod", link: import.meta.env.VITE_ALERT_MANAGER_OMNI_PROD },
    { name: "Alert Manager - AZR", link: import.meta.env.VITE_ALERT_MANAGER_AZR },
    { name: "ArgoCD - OMNI", link: import.meta.env.VITE_ARGOCD_OMNI },
    { name: "ArgoCD - PCI", link: import.meta.env.VITE_ARGOCD_PCI },
    { name: "ArgoCD - AKS02", link: import.meta.env.VITE_ARGCD_AKS02 },
    { name: "Orion Portal", link: import.meta.env.VITE_ORION_PORTAL },
    { name: "Klarna Status Page", link: import.meta.env.VITE_KLARNA_STATUS_PAGE },
    { name: "AfterPay Status Page", link: import.meta.env.VITE_AFTERPAY_STATUS_PAGE },
    { name: "PayPal Status Page", link: import.meta.env.VITE_PAYPAL_STATUS_PAGE },
    { name: "Narvar Status Page", link: import.meta.env.VITE_NARVAR_STATUS_PAGE },
    { name: "DeliverySolution Status Page", link: import.meta.env.VITE_DELIVERYSOLUTION_STATUS_PAGE },
    { name: "AWS Health Status", link: import.meta.env.VITE_AWS_HEALTH_STATUS },
    { name: "Forter Portal", link: import.meta.env.VITE_FORTER_PORTAL },
    { name: "PagerDuty", link: import.meta.env.VITE_PAGERDUTY },
    { name: "ServiceNow", link: import.meta.env.VITE_SERVICE_NOW },
    { name: "SephAdmin", link: import.meta.env.VITE_SEPHADMIN },
    { name: "Preview", link: import.meta.env.VITE_PREVIEW },
    { name: "BCC", link: import.meta.env.VITE_BCC },
    { name: "CSC", link: import.meta.env.VITE_CSC },
    { name: "HAPROXY - Canary", link: import.meta.env.VITE_HAPROXY_CANARY },
    { name: "HAPROXY - Non Canary", link: import.meta.env.VITE_HAPROXY_NON_CANARY },
    { name: "HAPROXY - AZR2", link: import.meta.env.VITE_HAPROXY_AZR2 },
    { name: "True Origin - Canary", link: import.meta.env.VITE_TRUE_ORIGIN_CANARY },
    { name: "True Origin - Non Canary", link: import.meta.env.VITE_TRUE_ORIGIN_NON_CANARY },
    { name: "True Origin - AZR2", link: import.meta.env.VITE_TRUE_ORIGIN_AZR2 },
    { name: "Server Restart", link: import.meta.env.VITE_SERVER_RESTART },
  ]
}
  , {
  id: 1,
  header: "Wiki Links", links: [
    { name: "Environment URLs", link: import.meta.env.VITE_ENVIRONMENT_URLS },
    { name: "Support Hub", link: import.meta.env.VITE_SUPPORT_HUB },
    { name: "Dotcom Incident Report", link: import.meta.env.VITE_DOTCOM_INCIDENT_REPORT },
    { name: "P1/P2 Checklist", link: import.meta.env.VITE_P1_P2_CHECKLIST },
  ]
}
];

export const QUICK_LINKS_HEADER = "Quick Links";
export const AM_PM_OPTIONS = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];
