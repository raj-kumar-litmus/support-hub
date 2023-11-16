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

export interface IPromotion {
  promotionId: string;
  discAmt: number;
  claimableId: string;
}

export interface PriceInfo {
  listPrice: string;
  rawTotalPrice: string;
  amount: string;
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
export interface OmsOrderFlow {
  orderNo: string;
  orderMap: {
    [timestamp: string]: {
      orderNo: string;
      shipmentNo: string;
      lineType: string;
      packlistType: string;
      orderDate: string;
      dc: string;
      status: string;
      statusName: string;
      statusDescription: string;
      shipmentType: string | null;
    }[];
  };
  shipmentNo: string | null;
  shipmentMap: string | null;
}
export interface orderTimeline {
  [timestamp: string]: {
    orderNo: string;
    shipmentNo: string;
    lineType: string;
    packlistType: string;
    orderDate: string;
    dc: string;
    status: string;
    statusName: string;
    statusDescription: string;
    shipmentType: string | null;
  }[];
}
