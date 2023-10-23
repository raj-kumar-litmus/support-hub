export interface OrderData {
  orderId: string;
  submittedDate: string;
  orderTotal: string;
  status: string;
  sephOrderStatus: string;
  locale: string;
  originOfOrder: string;
  profileId: string | any;
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo[];
  commerceItem: CommerceItem[];
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  crmId: string;
  profileId: string;
  biTier: string;
}

export interface PaymentInfo {
  paymentId: string;
  paymentType: string;
  amount: number;
  status: string;
  paymentCardType: string;
  thirdPartyType: string | any;
}

export interface CommerceItem {
  commerceItemId: string;
  catalogRefId: string;
  itemClassType: string;
  quantity: number;
  priceInfo: PriceInfo;
}

export interface PriceInfo {
  listPrice: string;
  rawTotalPrice: string;
  amount: strign;
}

export interface OmsOrderStatus {
  orderNumStatus: string;
}

export interface CommerceItemData {
  SKU: string;
  Type: string;
  Quantity: number;
  "Unit Price": string;
  "Total Price": string;
}
