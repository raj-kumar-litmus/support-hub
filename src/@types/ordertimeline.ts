export interface orderStatus {
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
