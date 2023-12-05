import type { ChartData, ChartOptions } from "chart.js";
import { ButtonProps } from "primereact/button";
import { CalendarChangeEvent, CalendarProps } from "primereact/calendar";
import { CheckboxProps } from "primereact/checkbox";
import {
  InputNumberProps,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { ToastProps } from "primereact/toast";
import { FC, KeyboardEvent } from "react";
import { CommerceItemData } from "../pages/OrderDetails";
import { DCOpenOrders } from "../pages/dcOpenOrders";
import { ModalEnums } from "../pages/opmCharts";
import { InputTextProps } from "primereact/inputtext";

export type CardProps = {
  cardData: DCOpenOrders | CommerceItemData;
  key: number;
  type?: string;
};

export type ManualInputTimeProps = {
  hour: number;
  minute: number;
  handleHourChange: (e: InputNumberValueChangeEvent) => void;
  handleMinuteChange: (e: InputNumberValueChangeEvent) => void;
  ampm: string;
  toggleAmPmChange: (e) => void;
};

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

export interface CustomCheckboxProps extends CheckboxProps {
  containerclassname?: string;
  labelclassname?: string;
  label?: string;
}

export interface CustomIconProps {
  alt: string;
  src: string;
  width: string;
  height: string;
  className?: string;
  onClick?: () => void;
}

export interface CustomInputNumberProps extends InputNumberProps {
  containerclassname?: string;
  labelclassname?: string;
  label?: string;
  incrementButtonIcon?: any;
  decrementButtonIcon?: any;
}

export interface ITab {
  header: string;
  data?: any;
}

export type CustomTabProps = {
  tabData: Array<ITab>;
  className?: string;
  onTabChange?: React.FormEventHandler<HTMLDivElement>;
  tabValue: number;
  setTabValue: (value: number) => void;
};

export interface CustomToastProps extends ToastProps {
  showToast?: boolean;
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  messageIcon?: any;
  className?: string;
}

export interface CustomButtonProps extends ButtonProps {
  className?: string;
  isTextButton?: boolean;
  isDisabled?: boolean;
  isRounded?: boolean;
  id?: string;
  containerId?: string;
  children?: React.ReactNode;
  btnclassname?: string;
  severity?:
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "help"
    | undefined;
  label?: string;
}

export interface CustomInputTextProps extends InputTextProps {
  value?: string;
  name?: string;
  id?: string;
  icon?: string;
  imageclassname?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  containerclassname?: string;
}

export interface CustomModalProps {
  children?: React.ReactNode;
  onHide(): void;
  closeIcon?: any;
  className?: string;
  header: string;
  isTextButton?: boolean;
  visible: boolean;
  position: ModalEnums;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface CustomDropdownProps {
  onChange: any;
  options: any;
  icon?: string;
  dropdownIcon?: any;
  value?: string;
  imageclassname?: string;
  optionLabel: string;
  label?: string;
  labelclassname?: string;
  containerclassname?: string;
  name?: string;
  placeholder: string;
}

type TitleProps = {
  title: string;
  icon: string;
};

export interface HomeCardProps {
  title: FC<TitleProps>;
  value: FC;
}

export interface IMenu {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export type MenuCardProps = {
  menu: IMenu;
  selectedMenu: number;
  onClick: (a: IMenu) => void;
};

export type NavbarProps = {
  showSidePane: boolean;
  showSidePaneGrid: boolean;
  setShowSidePaneGrid: (a: boolean) => void;
  openSearchField: boolean;
  setOpenSearchField: (a: boolean) => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
};

export type SearchBarProps = {
  showSearchButton?: boolean;
  openSearchField?: boolean;
  setOpenSearchField?: (a: boolean) => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
  hideIcon?: boolean;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  type?:string
};

export type SearchFieldProps = {
  searchValue: string;
  setSearchValue: (a: string) => void;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type SidePaneGridProps = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
  showSidePaneGrid: boolean;
  setShowSidePaneGrid: (hide: boolean) => void;
};

export type SidePaneListProps = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
};

export type TableProps = {
  tableData: DCOpenOrders[] | CommerceItemData[];
};

export interface TimelineCardProps {
  date: string;
  statusName: string;
  statusDescription: string;
}

export type AppContentProps = {
  showSidePane: boolean;
  showNavbar: boolean;
  appContent: any;
};

export interface FilteredCardProps {
  content: string;
  leftIcon?: string;
  label?: string;
  onClickHandler: (string) => void;
}

export interface LoaderProps {
  className?: string;
}

export interface LineChartProps {
  options: ChartOptions<"line"> | any;
  data: ChartData<"line">;
  className?: string;
  title: string;
  isFullScreen?: boolean;
  defaultClasses?: boolean;
  plugins?: boolean;
}

export interface SvgIconProps {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

export type LoaderContextType = {
  showGlobalLoader: boolean;
  showLoader?: () => void;
  hideLoader?: () => void;
};

export type AppProps = {
  appContent: any;
  showSidePane?: boolean;
  showNavbar?: boolean;
};

export interface BarChartCompProps {
  options: ChartOptions<"bar"> | any;
  data: ChartData<"bar">;
  className?: string;
  defaultClasses?: boolean;
  title: string;
  isFullScreen?: boolean;
  plugins?: boolean;
}

export interface ChartProps {
  type: string;
}
