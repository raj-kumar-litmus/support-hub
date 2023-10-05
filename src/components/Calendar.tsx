import React from "react";
import { Calendar } from "primereact/calendar";

interface Props {
  onChange: any;
  placeholder?: string;
  value?: Date | undefined;
  showIcon?: boolean | undefined;
  icon?: any;
  iconPos?: "left" | "right" | undefined;
  dateFormat: string;
}

const CustomCalendar: React.FC<Props> = ({
  onChange,
  dateFormat,
  value,
  icon,
  showIcon = true,
  iconPos = "left",
  placeholder,
}) => {
  return (
    <Calendar
      showIcon={showIcon}
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
