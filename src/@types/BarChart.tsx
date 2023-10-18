export interface SessionData {
  timestamp: string;
  qtsDCSessionsCount: string;
  azureDCSessionsCount: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface DropDownOptions {
  label: string;
  value: number | string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface CustomCalendarProps {
  title: string;
  placeholder: string;
  value: Date;
  onChange: (value: Date) => void;
  iconPos: "left" | "right";
  containerClassName?: string;
  imgalt: string;
  imgsrc: string;
  icon?: any;
}

export interface CustomDropdownProps {
  title: string;
  value: number | string;
  onChange: (value: number | string) => void;
  options: DropDownOptions[];
  showIcon?: boolean;
  iconAlt?: string;
  iconSrc?: string;
  optionLabel: string;
  placeHolder: string;
}

export interface CustomIconProps {
  alt: string;
  src: string;
  width: string;
  height: string;
  className?: string;
}

export interface FilterItemProps {
  alt: string;
  src: string;
  value: string;
}
