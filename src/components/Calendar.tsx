import { Calendar } from "primereact/calendar";
import React from "react";

interface Props {
  onChange: any;
  placeholder?: string;
  value?: Date | undefined;
  showIcon?: boolean | undefined;
  icon?: any;
  iconPos?: "left" | "right" | undefined;
  dateFormat: string;
  timeOnly?: boolean;
}

const CustomCalendar: React.FC<Props> = ({
  onChange,
  dateFormat,
  timeOnly = false,
  value,
  icon,
  showIcon = true,
  iconPos = "left",
  placeholder,
}) => {
  return (
    <Calendar
      showIcon={showIcon}
      timeOnly={timeOnly}
      value={value}
      icon={icon}
      iconPos={iconPos}
      placeholder={placeholder}
      dateFormat={dateFormat}
      onChange={onChange}
    />
  );
};

export default CustomCalendar;
