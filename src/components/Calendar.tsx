import { Calendar } from "primereact/calendar";
import React from "react";

interface CustomCalendarProps {
  onChange: any;
  placeholder?: string;
  value?: Date | undefined;
  showIcon?: boolean | undefined;
  icon?: any;
  iconPos?: "left" | "right" | undefined;
  dateFormat: string;
  timeOnly?: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = (props) => {
  const { timeOnly = false, showIcon = true, iconPos = "left" } = props;
  return (
    <Calendar
      showIcon={showIcon}
      timeOnly={timeOnly}
      value={props.value}
      icon={props.icon}
      iconPos={iconPos}
      placeholder={props.placeholder}
      dateFormat={props.dateFormat}
      onChange={props.onChange}
    />
  );
};

export default CustomCalendar;
