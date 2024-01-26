import type { ChartData, ChartOptions } from "chart.js";
import { ButtonProps } from "primereact/button";
import { CalendarChangeEvent, CalendarProps } from "primereact/calendar";
import { CheckboxProps } from "primereact/checkbox";
import { DropdownProps } from "primereact/dropdown";
import {
  InputNumberProps,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { SidebarProps } from "primereact/sidebar";
import { ToastProps } from "primereact/toast";
import { OverlayPanelProps } from "primereact/overlaypanel";
import { FC, KeyboardEvent, ReactNode } from "react";
import { CommerceItemData } from "../pages/orderDetails";
import { DCOpenOrders } from "../pages/DcOpenOrders";
import { ModalEnums } from "../pages/opmCharts";
import { InputTextProps } from "primereact/inputtext";

enum Transition {
  easeLinear = "easeLinear",
  easeQuadIn = "easeQuadIn",
  easeQuadOut = "easeQuadOut",
  easeQuadInOut = "easeQuadInOut",
  easeCubicIn = "easeCubicIn",
  easeCubicOut = "easeCubicOut",
  easeCubicInOut = "easeCubicInOut",
  easePolyIn = "easePolyIn",
  easePolyOut = "easePolyOut",
  easePolyInOut = "easePolyInOut",
  easeSinIn = "easeSinIn",
  easeSinOut = "easeSinOut",
  easeSinInOut = "easeSinInOut",
  easeExpIn = "easeExpIn",
  easeExpOut = "easeExpOut",
  easeExpInOut = "easeExpInOut",
  easeCircleIn = "easeCircleIn",
  easeCircleOut = "easeCircleOut",
  easeCircleInOut = "easeCircleInOut",
  easeBounceIn = "easeBounceIn",
  easeBounceOut = "easeBounceOut",
  easeBounceInOut = "easeBounceInOut",
  easeBackIn = "easeBackIn",
  easeBackOut = "easeBackOut",
  easeBackInOut = "easeBackInOut",
  easeElasticIn = "easeElasticIn",
  easeElasticOut = "easeElasticOut",
  easeElasticInOut = "easeElasticInOut",
  easeElastic = "easeElastic",
}

enum CustomSegmentLabelPosition {
  Outside = "OUTSIDE",
  Inside = "INSIDE",
}

type CustomSegmentLabel = {
  text?: string;
  position?: CustomSegmentLabelPosition;
  fontSize?: string;
  color?: string;
};

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

export interface CustomDropdownProps extends DropdownProps {
  onChange: any;
  options: any;
  icon?: string;
  dropdownIcon?: any;
  value?: string | number;
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
  type?: string;
  hideMobileView?: boolean;
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
  bg?: string;
  padding?: string;
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
  data: ChartData<"line"> | any;
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

export type FocusRoomContextType = {
  focusRoomConfig: any; //todo. will be changed once "config" api is ready
  focusRoomConfigError: boolean;
};

export type FocusRoomProps = {
  children: any;
};

export type AppProps = {
  appContent: any;
  showSidePane?: boolean;
  showNavbar?: boolean;
  bg?: string;
  padding?: string;
};

export interface BarChartCompProps {
  options: ChartOptions<"bar"> | any;
  data: ChartData<"bar">;
  className?: string;
  defaultClasses?: boolean;
  title: string;
  isFullScreen?: boolean;
  plugins?: boolean;
  plugin?: any | "";
}

export interface ChartProps {
  type: string;
}

export enum SideBarPositionEnums {
  RIGHT = "right",
  LEFT = "left",
}

export interface CustomSideBarProps extends SidebarProps {
  setVisible?: (boolean) => void;
  title?: string;
  themeClasses?: string;
  sideBarWidthClass?: string;
}
export interface ApiWebServerCard {
  title?: string;
  perSecond?: string;
  perTotal?: string;
  cardData?: boolean;
  bgColor?: boolean;
  showToolTip?: boolean;
}

export interface OverlayBox {
  title: string;
  data: string;
  severity?: string;
  description?:string
}

export interface CustomOverlayProps extends OverlayPanelProps {
  children?: ReactNode;
  header?: string;
  boxContent?: OverlayBox[];
  boxClass?: string;
  buttonContent?: string;
  subHeader?: string | ReactNode;
  columns?: number;
}

export type HorizontalTableProps = {
  className?: string;
  tableClassName?: string;
  tableHead?: string;
  rowHeadClassName?: string;
  dataClassName?: string;
  tableHeadClassName?: string;
  tableData: any[];
};

export interface GridData {
  data: string;
  title?: string;
  icon?: any;
  severity?: string;
  description?: string;
  unClickable?: boolean;
  lastUpdated?:string
}

export type GridCardsProps = {
  columns: number;
  data: GridData[];
  title?: string;
  className?: string;
  dataClassName?: string;
  onClick?: (event: React.SyntheticEvent, string) => void;
  lastUpdatedTime?: string;
  formatNumber?:boolean;
};

export type OrderSummaryCardProps = {
  cardData: any;
};

export type InfoFieldProps = {
  title: string;
  data: string | number;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  dataClassName?: string;
};

export type PieChartProps = {
  options?: ChartOptions<"pie"> | any;
  data?: ChartData<"pie"> | any;
  height?: string;
  width?: string;
  xsHeight?: string;
  xsWidth?: string;
};

export type SectionTitleProps = {
  title: string;
};
export interface IncompleteOrdersData {
  130?: number;
  131?: number;
  132?: number;
  140?: number;
  143?: number;
  144?: number;
  155?: number;
  440?: number;
  455?: number;
  460?: number;
  date?: string;
}

export interface IncompleteOrderDialogData {
  code: number;
  message: string;
  nextState: string;
  sla: string;
}
export interface DoughNutChartProps {
  options: ChartOptions<"doughnut"> | any;
  data: ChartData<"doughnut">;
  containerClassName?: string;
  chartClassName?: string;
  title?: string;
  isFullScreen?: boolean;
  defaultClasses?: boolean;
  plugins?: any;
  showIndicator?: boolean;
}

export interface SpeedometerProps {
  containerClassName?: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  segments?: number;
  maxSegmentLabels?: number;
  forceRender?: boolean;
  width?: number;
  height?: number;
  dimensionUnit?: string;
  fluidWidth?: boolean;
  needleColor?: string;
  startColor?: string;
  endColor?: string;
  segmentColors?: string[];
  needleTransition?: Transition;
  needleTransitionDuration?: number;
  needleHeightRatio?: number;
  ringWidth?: number;
  textColor?: string;
  valueFormat?: string;
  segmentValueFormatter?: (value: string) => string;
  currentValueText?: string;
  currentValuePlaceholderStyle?: string;
  customSegmentStops?: number[];
  customSegmentLabels?: CustomSegmentLabel[];
  labelFontSize?: string;
  valueTextFontSize?: string;
  valueTextFontWeight?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  svgAriaLabel?: string;
  showGradient?: boolean;
}

export interface LinearGaugeProps {
  propOne: number| string;
  propTwo: number | string;
  height: string;
  bgColorOne: string;
  bgColorTwo: string;
  containerClassName: string;
  formatter?:boolean
}

export interface LabelProps {
  text: string;
  containerClassName?: string;
  color?: string;
  circleColor?: string;
}

export type OpmSideBarProps = {
  localeFilter?: string;
  channelFilter?: string;
  paymentFilter?: string;
  shipmentFilter?: string;
  visible: boolean;
  setVisible: (boolean) => void;
};
