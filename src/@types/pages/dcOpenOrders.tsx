export interface orderData {
  country: string;
  shipNode: string;
  dcName: string;
  workableOrders: number;
}

export interface DCOpenOrders {
  "DC Name"?: string;
  Country?: string;
  "Shipment Node": string;
  "Workable Orders": number;
}
