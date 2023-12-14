export const PAGE_TITLES = {
  DASHBOARD: "Dashboard",
  SESSIONS: "Sessions",
  OPM: "OPM",
  OPM_COMPARISON: "OPM Comparison",
  DC_OPEN_ORDERS: "DC Open Orders",
  ORDER_DETAILS: "Order Details",
  ORDER_REPORT: "Order Report",
  SKU_LOOKUP: "SKU Lookup",
};

export const DASHBOARD_LABELS = {
  LASTDAY: "Last Day",
  TODAY: "Today",
  YESTERDAY: "Yesterday",
  DIFFERENCE: "Difference",
  HOME_PAGE_REFERSH_DURATION: 10,
  REFRESHTIME: 60000,
  AVG_ORDERS_PER_MIN: "Average Orders Per Min",
  TOTAL_NO_OF_ORDERS: "Total Number of Orders",
  LAST_MIN_OPM: "Last min OPM",
  AVG_OPM_COMPARISON: "Avg OPM Comparison",
  TOTAL_ORDER_COMPARISON: "Total Order Comparison",
  DEFAULT_PERIOD: 10,
};

export const CHART_TAB_LABELS = {
  BAR: "Bar",
  LINE: "Lines",
  PRIMARY: "Primary",
  SECONDARY: "Secondary",
  BOTH: "Both",
};

export const DATE_AND_TIME_FORMATS = {
  DD_MM_YYYY: "dd/mm/yyyy",
  MM_DD_YYYY_HH_MM: "mm/dd/yyyy hh:mm",
};

export const CHART_LABELS = {
  TOTAL_SESSIONS_PER_MINUTE: "Total Sessions per minute",
  TOTAL_ORDERS_PER_MINUTE: "Total Orders Per Minute",
  NO_OF_ORDERS: "No of Orders",
};

export const LABELS = {
  DURATION: "Duration",
  DATE: "Date",
  CHANNEL: "Channel",
  LOCALE: "Locale",
  PAYMENT: "Payment",
  PROMOCODE: "Promo Code",
  STARTDATE: "Date 1",
  ENDDATE: "Date 2",
  SUBMIT: "Submit",
  RESET: "Reset",
  AUTO_REFRESH: "Auto Refresh",
  FILTERS: "Filters",
  CLOSE: "Close",
};

export const INPUT_TYPES = {
  dropdown: "dropdown",
  time: "time",
  text: "text",
};

export const DURATIONS = {
  "10 mins": 10,
  "15 mins": 15,
  "30 mins": 30,
  "45 mins": 45,
  "60 mins": 60,
};

export const OPM_CHANNELS = {
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
  "Klarna": "Klarna",
  "Store Credit": "storeCredit",
  "Gift Card": "giftCard",
  PayPal: "payPal",
  JCPenny: "JCPenny",
  "Apple Pay": "Applepay",
};

export const OPM_CHANNELS_CODE_MAP = {
  "DSK": "Desktop",
  "MWB": "Mobile Web",
  "IPH": "iPhone App",
  "AND": "Android App",
  "CSC": "CSC",
  "MPL": "M Plus",
  "ZAP": "",
  "INS": "Instagram"
};

export const OPM_PAYMENTS_CODE_MAP = {
  "CC": "Credit Card",
  "GC": "Gift Card",
  "ETC": "",
  "PPL": "PayPal",
  "KLA": "Klarna",
  "AFP": "",
  "SEP": "",
  "SEPT": ""
}

export const CHART = {
  FONT_FAMILY: "Arial, sans-serif, Helvetica Neue",
  TITLE_FONT_SIZE: 12,
  SUBTITLE_FONT_SIZE: 12,
  DATALABEL_FONT_SIZE: 10,
};

export const OPM_COMPARISON_CHART_STYLES = {
  PRIMARY_COLOR: "#6370FF",
  SECONDARY_COLOR: "#FDA44F",
};

export const OPM_CHART_DEFAULT = {
  MAX: 300,
  STEP_SIZE: 30,
  TICK_COUNT: 5,
};

export const OPM_COMP_CHART_DEFAULT = {
  BAR_BORDER_RADIUS: 6,
  BAR_PERCENT: 0.95,
  MAX_BAR_THICKNESS: 50,
  CATEGORY_PERCENT: 0.9,
};

export const CHART_TABS = [
  { header: CHART_TAB_LABELS.BAR },
  { header: CHART_TAB_LABELS.LINE },
];

export const SESSIONS_TABS = [
  { header: CHART_TAB_LABELS.PRIMARY },
  { header: CHART_TAB_LABELS.SECONDARY },
  { header: CHART_TAB_LABELS.BOTH },
];

export const SESSIONS_CHANNEL_LIST: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Desktop", value: "web" },
  { label: "Mobile Web", value: "mobileWeb" },
  { label: "iPhone App", value: "iPhoneApp" },
  { label: "Android App", value: "androidApp" },
];

export const SESSIONS_CHART_DEFAULT = {
  BAR_BORDER_RADIUS: 6,
  STEP_SIZE: 2500,
  TICK_COUNT: 5,
  LEGEND_LINE_WIDTH: 2,
  BAR_PERCENT: 0.95,
  MAX_BAR_THICKNESS: 50,
  CATEGORY_PERCENT: 0.9,
};

export const ORDER_DETAILS_LABELS = {
  CHANNEL: "Channel",
  PROMOTIONS: "Promotions",
  ORDER: "Order",
  ORDER_TOTAL: "Order Total",
  SUBMITTED: "Submitted",
  LOCALE: "Locale",
  ORDER_TYPE: "Order Type",
  STATUS_ACROSS: "Status Across All System",
  ATG: "ATG",
  OMS: "OMS",
  WMS: "WMS",
  CUSTOMER_INFO: "Customer Information",
  SHIPPED: "Shipped",
  NAME: "Name",
  EMAIL: "Email",
  BITIER: "Bi Tier",
  ITEMS_INFO: "Items Information",
  PAYMENT_INFO: "Payment Information",
  PAYMENT_TYPE: "Payment Type",
  STATUS: "Status",
  AMOUNT: "Amount",
  NO_MATCHING_ORDERS_FOUND: "No Matching Orders.",
  VIEW_ALL: "View All",
  VIEW_ALL_MIN_ORDER_LIST_MOBILE: 5,
  DISCOUNT_AMOUNT: "Discount Amount",
  PROMOTION: "Promotion",
  ORDER_TIMELINE: "Order Timeline",
  NO_DATA: "No Data",
  ORDER_STATUS: "Order Status",
};

export const ORDER_STATUS_LIST = [
  {
    "Status Code": 1100,
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
    Description: "Included in shipment",
  },
  {
    "Status Code": 3700,
    Description: ORDER_DETAILS_LABELS.SHIPPED,
  },
  {
    "Status Code": 9000,
    Description: "Cancelled",
  },
  {
    "Status Code": 3700.5,
    Description: "Shipped and invoiced",
  },
];

export const QUICK_LINKS = [
  {
    id: 0,
    header: "Alerting & Monitoring Tools",
    links: [
      { name: "Splunk - AZR1", link: import.meta.env.VITE_SPLUNK_AZR1 },
      { name: "Splunk - AZR2", link: import.meta.env.VITE_SPLUNK_AZR2 },
      {
        name: "Dynatrace - SRE Digital Dashboard",
        link: import.meta.env.VITE_DYNATRACE,
      },
      {
        name: "Grafana - Overall Application View",
        link: import.meta.env.VITE_GRAFANA,
      },
      {
        name: "Alert Manager - Omni Prod",
        link: import.meta.env.VITE_ALERT_MANAGER_OMNI_PROD,
      },
      {
        name: "Alert Manager - AZR",
        link: import.meta.env.VITE_ALERT_MANAGER_AZR,
      },
      { name: "ArgoCD - OMNI", link: import.meta.env.VITE_ARGOCD_OMNI },
      { name: "ArgoCD - PCI", link: import.meta.env.VITE_ARGOCD_PCI },
      { name: "ArgoCD - AKS02", link: import.meta.env.VITE_ARGCD_AKS02 },
      { name: "Orion Portal", link: import.meta.env.VITE_ORION_PORTAL },
      {
        name: "Klarna Status Page",
        link: import.meta.env.VITE_KLARNA_STATUS_PAGE,
      },
      {
        name: "AfterPay Status Page",
        link: import.meta.env.VITE_AFTERPAY_STATUS_PAGE,
      },
      {
        name: "PayPal Status Page",
        link: import.meta.env.VITE_PAYPAL_STATUS_PAGE,
      },
      {
        name: "Narvar Status Page",
        link: import.meta.env.VITE_NARVAR_STATUS_PAGE,
      },
      {
        name: "DeliverySolution Status Page",
        link: import.meta.env.VITE_DELIVERYSOLUTION_STATUS_PAGE,
      },
      {
        name: "AWS Health Status",
        link: import.meta.env.VITE_AWS_HEALTH_STATUS,
      },
      { name: "Forter Portal", link: import.meta.env.VITE_FORTER_PORTAL },
      { name: "PagerDuty", link: import.meta.env.VITE_PAGERDUTY },
      { name: "ServiceNow", link: import.meta.env.VITE_SERVICE_NOW },
      { name: "SephAdmin", link: import.meta.env.VITE_SEPHADMIN },
      { name: "Preview", link: import.meta.env.VITE_PREVIEW },
      { name: "BCC", link: import.meta.env.VITE_BCC },
      { name: "CSC", link: import.meta.env.VITE_CSC },
      { name: "HAPROXY - Canary", link: import.meta.env.VITE_HAPROXY_CANARY },
      {
        name: "HAPROXY - Non Canary",
        link: import.meta.env.VITE_HAPROXY_NON_CANARY,
      },
      { name: "HAPROXY - AZR2", link: import.meta.env.VITE_HAPROXY_AZR2 },
      {
        name: "True Origin - Canary",
        link: import.meta.env.VITE_TRUE_ORIGIN_CANARY,
      },
      {
        name: "True Origin - Non Canary",
        link: import.meta.env.VITE_TRUE_ORIGIN_NON_CANARY,
      },
      {
        name: "True Origin - AZR2",
        link: import.meta.env.VITE_TRUE_ORIGIN_AZR2,
      },
      { name: "Server Restart", link: import.meta.env.VITE_SERVER_RESTART },
    ],
  },
  {
    id: 1,
    header: "Wiki Links",
    links: [
      { name: "Environment URLs", link: import.meta.env.VITE_ENVIRONMENT_URLS },
      { name: "Support Hub", link: import.meta.env.VITE_SUPPORT_HUB },
      {
        name: "Dotcom Incident Report",
        link: import.meta.env.VITE_DOTCOM_INCIDENT_REPORT,
      },
      { name: "P1/P2 Checklist", link: import.meta.env.VITE_P1_P2_CHECKLIST },
    ],
  },
];

export const AM_PM_OPTIONS = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

export const SCREEN_WIDTH = {
  XS: 450,
  SM: 640,
  ABOVE_SM: 768,
  MD: 850,
  LG: 1024,
  XL: 1280,
};

export const CALENDAR_TOAST_MESSAGE: string =
  "Please don't select a future date and time";
export const SEE_MORE: string = "See More";
export const QUICK_LINKS_HEADER = "Quick Links";

export const TIMESTAMPS = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];

export const ORDER_REPORT_CHART_LABELS = {
  CHANNELWISE_ORDER_LABELS: ["Web", "Mobile Web", "iPhone App", "Android App", "mPlus App", "JCPenny", "Instagram", "CSC"],
  PAYMENTWISE_ORDER_LABELS: ["Credit Card", "Paypal", "Klarna", "Giftcard", "Private Label Card", "Apple Pay", "JCP Dummy", "Sephora CBVI", "Sephora PLCC", "Sephora CBVIT", "Sephora PLCCT", "Instagram Dummy", "Google Dummy", "Sephora Pay", "Store Credit"],
};

export const ORDER_REPORT_LABELS = {
  HOURLY_ORDER_DATA: "Hourly Order Data",
  HOURLY_ORDER_TREND: "Hourly Order Trend",
  ORDER_PIE_CHART: "Order Pie Chart",
  CAD: "CAD",
  USD: "USD",
  SUMMARY: "Summary"
};

export const REPORT_TAB_LABELS = {
  LOCALE_WISE: "Locale Wise",
  CHANNEL_WISE: "Channel Wise",
  PAYMENT_WISE: "Payment Wise"
};

export const REPORT_TABS = [
  { header: REPORT_TAB_LABELS.LOCALE_WISE },
  { header: REPORT_TAB_LABELS.CHANNEL_WISE },
  { header: REPORT_TAB_LABELS.PAYMENT_WISE }
];

export const ORDER_SUMMARY_LABELS = {
  TOTAL_ORDER_COUNT: "Total Order Count",
  US_ORDER_COUNT: "US Order Count",
  CA_ORDER_COUNT: "CA Order Count",
  TOTAL_SALES: "Total Sales",
  US_SALES: "US Sales",
  CA_SALES: "CA Sales",
  TOTAL_SDD_ORDERS_PLACED: "Total SDD Orders Placed",
  TOTAL_SDD_ORDERS_COMPLETED: "Total SDD Orders Completed",
  TOTAL_BOPIS_ORDERS_PLACED: "Total BOPIS Orders Placed",
  AVERAGE_ORDER_VALUE: "Average Order Value",
  US_AVERAGE_ORDER_VALUE: "US Average Order Value",
  CA_AVERAGE_ORDER_VALUE: "CA Average Order Value"
};

export const ORDER_PIE_CHART_LABELS = {
  CHANNELWISE_ORDER: "Channel wise order",
  PAYMENTWISE_ORDER: "Payment wise order"
};

export const HOURLY_TREND_DATA_LABELS = {
  TODAY: "Today",
  YESTERDAY: "Yesterday",
  LAST_WEEK: "Last Week",
  LAST_MONTH: "Last Month",
  LAST_YEAR: "Last Year",
};

export const LOCALEWISE_DATA_LABELS = {
  LAST_YEAR: "Last Year",
  LAST_MONTH: "Last Month",
  LAST_WEEK: "Last Week",
  LAST_DAY: "Last Day",
  TODAY: "Today",
  US_ORDERS: "US Orders",
  CA_ORDERS: "CA Orders",
  US_SALES: "US Sales",
  CA_SALES: "CA Sales",
  TOTAL_SALES: "Total Sales",
};

export const CHANNELWISE_DATA_LABELS = {
  TODAY: "Today",
  WEB: "Web",
  MOBILE_WEB: "Mobile Web",
  IPHONE_APP: "IPhone App",
  ANDROID_APP: "Android App",
  CSC: "CSC",
  MPLUS: "mPlus",
  JCPENNY: "JCPenny",
  INSTAGRAM: "Instagram",
}

export const PAYMENTWISE_DATA_LABELS = {
  TODAY: "Today",
  APPLE_PAY: "Apple Pay",
  PAYPAL: "Paypal",
  KLARNA: "Klarna",
  GIFTCARD: "Giftcard",
  STORE_CARD: "Store Card",
  SEPH_PAY: "Seph Pay",
  JCP_DUMMY: "JCP (D)",
  INSTAGRAM_DUMMY: "Instagram (D)",
  GOOGLE_DUMMY: "Google (D)",
  CBVI: "CBVI",
  CBVIT: "CBVIT",
  PLCC: "PLCC",
  PLCCT: "PLCCT",
  PRIVATE_LABEL: "Private Label",
  OTHER_CC: "Other CC",
}

export const ORDER_REPORT_THRESHOLDS = {
  LOCALEWISE_MIN: 1,
  LOCALEWISE_MAX: 15000,
  CHANNELWISE_MIN: 1,
  CHANNELWISE_MAX: 1000,
  PAYMENTWISE_MIN: 1,
  PAYMENTWISE_MAX: 1000
}

export const SEVERITY = {
  LOW: "low",
  HIGH: "high"
}
export const SKU_DETAILS = {
  TITLE: "SKU Details",
  SKU: "SKU #",
  DISPLAY_NAME: "Display Name",
  BRAND: "Brand",
  EFFECTIVELY_ACTIVE: "Effectively Active",
  START_DATE: "Start Date",
  END_DATE: "End Date",
  SKU_STATE: "SKU State",
  RESERVATION_ENABLED: "Reservation Enabled",
  STORE_ONLY: "Store Only",
};

export const SKU_PRICE_DETAILS = {
  TITLE: "Price Details",
  US_LIST_PRICE: "US List Price",
  US_SALE_PRICE: "US Sale Price",
  CA_LIST_PRICE: "CA List Price",
  CA_SALE_PRICE: "CA Sale Price",
};

export const SKU_INVENTORY = {
  ATG_INVENTORY: "ATG Inventory",
  YANTRIKS_INVENTORY: "Yantriks Inventory",
  COUNTRY: "Country",
  STOCK_LEVEL: "Stock Level",
  ON_HOLD: "On Hold",
};

export const SKU_PRODUCT_INFO = {
  TITLE: "Product Information",
  PRODUCT: "Product #",
  ACTIVATION_DATE: "Activation Date",
  END_DATE: "End Date",
  URL: "URL",
  EFFECTIVELY_ACTIVE: "Effectively Active",
  ENABLED: "Enabled",
};
