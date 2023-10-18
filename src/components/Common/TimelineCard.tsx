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
    <div className="flex flex-row h-[75px] w-[342px] font-helvetica bg-[#30343B] rounded-lg mt-3">
      <div className="ml-6 mt-5  flex flex-col">
        <span className="text-[#FAF9F6] font-normal text-right text-xs">
          {orderDate}
        </span>
        <span className="text-[#898A8D] mt-1 font-bold text-left text-xs">
          {orderTime}
        </span>
      </div>
      <div className="pl-[17%] mt-[5%] flex flex-col">
        <span className="h-auto relative text-[#FAF9F6] text-sm text-left font-bold">
          {statusName}
        </span>
        <span className="h-auto mt-1  w-auto text-[#898A8D] text-xs text-left font-normal">
          {statusDescription}
        </span>
      </div>
    </div>
  );
};

export default TimelineCard;
