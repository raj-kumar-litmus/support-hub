import { CalendarChangeEvent, CalendarProps } from "primereact/calendar";
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

export interface CustomCalendarProps extends CalendarProps {
  title?: string;
  placeholder?: string;
  name?: string;
  timeOnly?: boolean;
  imageclassname?: string;
  titleclassname?: string;
  showTime?: boolean;
  hourFormat?: "24" | "12";
  selectionMode?: "single" | "range" | "multiple";
  value: string;
  onChange: (event: CalendarChangeEvent) => void;
  iconPos: "left" | "right";
  containerclassname?: string;
  imgalt?: string;
  imgsrc?: string;
  icon?: any;
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

export interface CustomIconProps {
  alt: string;
  src: string;
  width: string;
  height: string;
  className?: string;
  onClick?: () => void;
}

export interface FilterItemProps {
  alt: string;
  src: string;
  value: string;
}
