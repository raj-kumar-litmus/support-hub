import React, { FC } from "react";
import { Calendar } from "primereact/calendar";
import CustomIcon from "./CustomIcon";
import { CustomCalendarProps } from "../../@types/BarChart";

const CustomCalendar: FC<CustomCalendarProps> = (props) => (
  <div className={props.containerClassName}>
    <div className="text-[12px] text-[#E8E8E8] font-medium">{props.title}</div>
    <Calendar
      {...props}
      className="mt-1"
      readOnlyInput
      showIcon
      placeholder={props.placeholder}
      value={props.value}
      dateFormat="mm/dd/yy"
      onChange={(e) => props.onChange(e)}
      iconPos={props.iconPos}
      icon={
        props.icon || (
          <CustomIcon
            alt={props.imgalt}
            src={props.imgsrc}
            width="16px"
            height="16px"
          />
        )
      }
    />
  </div>
);

export default CustomCalendar;
