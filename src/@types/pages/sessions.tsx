import { DropdownProps } from "primereact/dropdown";

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

export interface CustomDropdownProps extends DropdownProps {
  title?: string;
  value: number | string;
  // onChange: (value: number | string) => void;
  name?: string;
  options: DropDownOptions[];
  showIcon?: boolean;
  iconAlt?: string;
  iconSrc?: string;
  optionLabel?: string;
  placeHolder?: string;
  showLeftIcon?: boolean;
}

export interface FilterItemProps {
  alt: string;
  src: string;
  value: string;
}
