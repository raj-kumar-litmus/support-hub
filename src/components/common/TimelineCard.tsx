import React from "react";
import { TimelineCardProps } from "../../@types/components/commonTypes";

const TimelineCard: React.FC<TimelineCardProps> = (props) => {
  const [orderDate, orderTime] = props.date.split(" ");
  return (
    <div className="flex flex-row  h-[75px] w-[342px] font-helvetica bg-black-300 rounded-lg mt-3">
      <div className=" !w-28 flex justify-center items-center flex-col">
        <span className="text-[rgb(250,249,246)] font-normal text-right leading-[12px] text-xs">
          {orderDate}
        </span>
        <span className="text-gray-400 mt-1 ml-[-12px] font-bold text-left text-xs">
          {orderTime}
        </span>
      </div>
      <div className="relative max-w-[200px] flex justify-center  bottom-[3%] flex-col left-[10%] ">
        <span className="text-gray-300 text-sm text-left leading-[22px] font-bold">
          {props.statusName}
        </span>
        <div
          title={props.statusDescription}
          className="h-auto text-gray-400 text-xs text-left font-normal line-clamp-1  text-ellipsis overflow-hidden"
        >
          {props.statusDescription}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
