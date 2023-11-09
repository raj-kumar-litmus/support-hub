export interface OrderReportData {
  loading: boolean;
  reportLabel: string;
  reportHour: number;
  reportStartTime: string;
  reportEndTime: string;
  summary: OrderSummary;
  channelWiseOrderReport: ChannelWiseOrderReport;
  paymentWiseOrderReport: PaymentWiseOrderReport;
  hourlyHistoricalOrderData: HourlyHistoricalOrderData;
  hourlySlicedOrderData: HourlySlicedOrderData;
}

export interface OrderSummary {
  totalSales: number;
  usSales: number;
  caSales: number;
  totalSalesForecast: number;
  totalOrdersPlaced: number;
  usOrdersPlaced: number;
  caOrdersPlaced: number;
  averageOrderValue: number;
  peakOPM: number | null;
  bopisOrdersPlaced: number;
  bopisOrdersPicked: number;
  sddOrdersPlaced: number;
  sddOrdersCompleted: number;
  usAverageOrderValue: number;
  caAverageOrderValue: number;
}

export interface ChannelWiseOrderReport {
  webOrderCount: number;
  cscCount: number;
  iOSCount: number;
  mWebCount: number;
  mPlusCount: number;
  androidCount: number;
  jcpCount: number;
  instaCount: number;
}

export interface PaymentWiseOrderReport {
  pgApplePay: number;
  pgJCPDummy: number;
  pgCBVI: number;
  pgPLCC: number;
  pgCBVIT: number;
  pgPLCCT: number;
  pgInstaDummy: number;
  pgGoogleDummy: number;
  pgSephPay: number;
  pgOtherCC: number;
  pgPayPal: number;
  pgKlarna: number;
  pgGiftCard: number;
  pgOtherPlcc: number;
  pgStoreCredit: number;
}

export interface HourlyHistoricalOrderData {
  today: number[];
  yesterday: number[];
  lastWeek: number[];
  lastMonth: number[];
  lastYear: number[];
}

export interface HourlySlicedOrderData {
  hour: Array<string | null>;
  orderCount: number[];
  usOrderCount: number[];
  caOrderCount: number[];
  usTotal: number[];
  caTotal: number[];
  totalSales: number[];
  webOrderCount: number[];
  cscOrderCount: number[];
  iOSOrderCount: number[];
  mWebOrderCount: number[];
  mPlusOrderCount: number[];
  androidOrderCount: number[];
  jcpOrderCount: number[];
  instagramOrderCount: number[];
  pgApplePayCount: number[];
  pgJcpCount: number[];
  pgCbviCount: number[];
  pgPlccCount: number[];
  pgCbvitCount: number[];
  pgPlcctCount: number[];
  pgInstaDummyCount: number[];
  pgGoogleDummyCount: number[];
  pgSephPayCount: number[];
  pgOtherCreditCardCount: number[];
  pgPaypalCount: number[];
  pgKlarnaCount: number[];
  pgGiftCardCount: number[];
  pgPrivateLabelCount: number[];
  pgStoreCreditCount: number[];
  sddOrdersPlaced: number[];
  sddOrdersCompleted: number[];
  bopisOrdersPlaced: number[];
}

export interface OrderSummaryTableData {
  name: string;
  data: number | string;
  suffix?: string;
}

export interface LocaleWiseHourlyOrderTableData {
  Time: string;
  "Last Year": number;
  "Last Month": number;
  "Last Week": number;
  "Last Day": number;
  Today: number;
  "US Orders": number;
  "CA Orders": number;
  "US Sales": number;
  "CA Sales": number;
  "Total Sales": number;
}

export interface ChannelWiseHourlyOrderTableData {
  Time: string;
  Today: number;
  Web: number;
  "Mobile Web": number;
  "IPhone App": number;
  "Android App": number;
  CSC: number;
  mPlus: number;
  JCPenny: number;
  Instagram: number;
}

export interface PaymentWiseHourlyOrderTableData {
  Time: string;
  Today: number;
  "Apple Pay": number;
  Paypal: number;
  Klarna: number;
  Giftcard: number;
  "Store Card": number;
  "Seph Pay": number;
  "JCP(D)": number;
  "Instagram(D)": number;
  "Google(D)": number;
  CBVI: number;
  CBVIT: number;
  PLCC: number;
  PLCCT: number;
  "Private Label": number;
  "Other CC": number;
}
