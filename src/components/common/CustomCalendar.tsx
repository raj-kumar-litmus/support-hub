import React, { FC } from "react";
import { Calendar } from "primereact/calendar";
import CustomIcon from "./CustomIcon";
import { CustomCalendarProps } from "../../@types/BarChart";

const CustomCalendar: FC<CustomCalendarProps> = (props) => (
  <div className={`flex flex-col self-end ${props.containerClassName}`}>
    <div className="text-xs font-medium pb-1 text-[#898A8D] relative left-[2vw] md:left-[0]">
      {props.title}
    </div>
    <Calendar
      {...props}
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
