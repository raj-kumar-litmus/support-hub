import React, { FC } from "react";
import { Calendar } from "primereact/calendar";
import { CustomCalendarProps } from "../../@types/BarChart";

const CustomCalendar: FC<CustomCalendarProps> = (props) => (
  <div className={`flex flex-col self-end ${props.containerclassname}`}>
    <div
      className={`text-xs font-medium pb-1 text-[#898A8D] relative ${props.titleclassname}`}
    >
      {props.title}
    </div>
    <img className={props.imageclassname} src={props.imgsrc} />
    <Calendar
      {...props}
      readOnlyInput
      showTime={props.showTime || false}
      hourFormat={props.hourFormat || "12"}
      placeholder={props.placeholder}
      value={props.value}
      dateFormat="mm/dd/yy"
      hideOnDateTimeSelect={props.hideOnDateTimeSelect || true}
      onChange={(e) => props.onChange(e)}
      iconPos={props.iconPos}
    />
  </div>
);

export default CustomCalendar;
