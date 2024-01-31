export interface WebServerWidgetsProps {
  title: string;
  totalServers: number;
  errorServers: number;
}

export interface MicroServiceNames {
  shortName: string;
  description: string;
  instanceName: string;
}

export type FocusRoomContextType = {
  focusRoomConfig?: any;
  focusRoomConfigError?: boolean;
};

export type FocusRoomProps = {
  children: any;
};

export type FocusRoomSalesProps ={
  totalForecast?:string,
  totalSales?:string,
  totalOrders?:string,
  avgOrder?:string,
  total?:string,
  noDecimal?:boolean,
  suffix?:string,
  us?:string,
  ca?:string,
  legendOne?:string,
  legendTwo?:string
  lastUpdated?:string
}