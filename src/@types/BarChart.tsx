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
  iconPos: string;
  imgalt: string;
  imgsrc: string;
}

export interface CustomDropdownProps {
  title: string;
  value: number | string;
  onChange: (value: number | string) => void;
  options: DropDownOptions[];
  optionLabel: string;
  placeHolder: string;
}

export interface CustomIconProps {
  alt: string;
  src: string;
  width: string;
  height: string;
}

export interface FilterItemProps {
  alt: string;
  src: string;
  value: string;
}
