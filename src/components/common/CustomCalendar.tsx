import React, { FC } from "react";
import { Calendar } from "primereact/calendar";
import CustomIcon from "./CustomIcon";
import { CustomCalendarProps } from "../../@types/BarChart";

const CustomCalendar: FC<CustomCalendarProps> = (props) => (
  <div className={`flex flex-col md:self-end ${props.containerClassName}`}>
    <div className="text-[12px] text-[#898A8D] font-medium title">
      {props.title}
    </div>
    <Calendar
      {...props}
      className="mt-1"
      readOnlyInput
      showIcon
      showTime={props.showTime || false}
      hourFormat={props.hourFormat || "12"}
      placeholder={props.placeholder}
      value={props.value}
      dateFormat="mm/dd/yy"
      hideOnDateTimeSelect={props.hideOnDateTimeSelect || true}
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
