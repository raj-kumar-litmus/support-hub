import React from "react";

interface CardProps {
  date: string;
  statusName: string;
  statusDescription: string;
}

const TimelineCard: React.FC<CardProps> = ({
  date,
  statusName,
  statusDescription,
}) => {
  const [orderDate, orderTime] = date.split(" ");

  return (
    <div className="flex flex-row  h-[75px] w-[342px] font-helvetica bg-[#30343B] rounded-lg mt-3">
      <div className=" !w-28 flex justify-center items-center flex-col">
        <span className="text-[rgb(250,249,246)] font-normal text-right leading-[12px] text-xs">
          {orderDate}
        </span>
        <span className="text-[#898A8D] mt-1 ml-[-12px] font-bold text-left text-xs">
          {orderTime}
        </span>
      </div>
      <div className="relative max-w-[200px] flex justify-center  bottom-[3%] flex-col left-[10%] ">
        <span className="text-[#FAF9F6] text-sm text-left leading-[22px] font-bold">
          {statusName}
        </span>
        <div
          title={statusDescription}
          className="h-auto text-[#898A8D] text-xs text-left font-normal line-clamp-1  text-ellipsis overflow-hidden"
        >
          {statusDescription}
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
