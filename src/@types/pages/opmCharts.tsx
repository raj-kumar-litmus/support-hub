export type ModalEnums =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | undefined;

type pointStyleEnums =
  | false
  | "line"
  | "circle"
  | "rect"
  | "cross"
  | "crossRot"
  | "dash"
  | "rectRounded"
  | "rectRot"
  | "star"
  | "triangle";
// type positionEnums = "top" | "left" | "bottom" | "right" | "chartArea";
// type alignEnums = "start" | "center" | "end";

interface Dataset {
  label: string;
  data: number[];
  pointStyle?: pointStyleEnums;
  fill?: boolean;
  borderColor: string;
  borderWidth?: number;
  backgroundColor?: any;
  borderRadius?: number;
}

interface DataPoint {
  timestamp: string;
  orderCount: string;
}

export interface DropDownOnChangeEvent {
  value: {
    name: string;
  };
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface OpmComparisonType {
  opmOne: DataPoint[];
  opmTwo: DataPoint[];
}

export interface ChartOptions {
  responsive?: boolean;
  scales?: {
    x?: any;
    y?: any;
  };
  plugins?: any;
  apiResponse?: any;
  startDate?: any;
  elements?: any;
  endDate?: any;
  layout?: any;
}

export type OPMProps = {
  fetchType: string;
  filters?: {
    locale?: string;
    channel?: number;
    payment?: string;
    period?: number;
    date?: string;
    promocode?: string;
    shipment?: string;
  }
}