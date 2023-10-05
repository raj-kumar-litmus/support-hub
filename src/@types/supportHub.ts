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
type positionEnums = "top" | "left" | "bottom" | "right" | "chartArea";
type alignEnums = "start" | "center" | "end";

interface Dataset {
  label: string;
  data: number[];
  pointStyle?: pointStyleEnums;
  fill?: boolean;
  borderColor: string;
  borderWidth?: number;
  backgroundColor?: CanvasGradient | string | undefined;
}

interface CustomLabel {
  text?: string | null;
  fillStyle?: string;
  strokeStyle?: string;
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
  responsive: boolean;
  scales?: {
    x?: {
      grid?: {
        display?: boolean;
      };
      title?: {
        display?: boolean;
        text?: string;
      };
    };
    y?: {
      border?: {
        dash?: number[];
      };
    };
  };
  plugins?: {
    legend?: {
      display?: boolean;
      position?: positionEnums;
      align?: alignEnums;
      labels?: {
        usePointStyle?: boolean;
        generateLabels(): CustomLabel[];
      };
    };
    tooltip?: {
      displayColors?: boolean;
    };
  };
}
