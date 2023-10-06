import React, { FC } from "react";
import { Calendar } from "primereact/calendar";
import CustomIcon from "./CustomIcon";
import { CustomCalendarProps } from "../../@types/BarChart";

const CustomCalendar: FC<CustomCalendarProps> = (props) => (
  <>
    <div className="text-sm font-bold text-gray-500">{props.title}</div>
    <Calendar
      {...props}
      className="mt-1"
      readOnlyInput
      showIcon
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.value)}
      iconPos={props.iconPos}
      icon={() => (
        <CustomIcon
          alt={props.imgalt}
          src={props.imgsrc}
          width="16px"
          height="16px"
        />
      )}
    />
  </>
);

export default CustomCalendar;
