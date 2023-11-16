import React from "react";
import TimelineCard from "./TimelineCard";
import Stepper from "./TimelineStepper";
import { orderTimeline } from "../../@types/OrderDetails";

interface TimelineProps {
  orderMap: orderTimeline;
}

const Timeline: React.FC<TimelineProps> = ({ orderMap }) => {

  const getStatusDate = (dateX: string) => {
    let year = dateX.substring(0, 4);
    let month = dateX.substring(4, 6);
    let day = dateX.substring(6, 8);
    let hour = dateX.substring(8, 10);
    let min = dateX.substring(10, 12);
    let sec = dateX.substring(12, 14);
    let newDate = month + "-" + day + "-" + year + " " + hour + ":" + min + ":" + sec;
    return newDate;
  }

  return (
    <div className="  flex flex-col items-center">
      {Object.keys(orderMap).map((timestamp, index) => {
        const orderDetails = orderMap[timestamp][0];
        const isLast = index === Object.keys(orderMap).length - 1;

        return (
          <div key={timestamp}>
            <TimelineCard
              date={getStatusDate(timestamp)}
              statusName={orderDetails.statusName}
              statusDescription={orderDetails.statusDescription}
            />

            {!isLast && (
              <div className="relative ml-[32%] bottom-[52%] sm:bottom-[51%]">
                <Stepper />
              </div>
            )}
            {isLast && (
              <div className="relative left-[32%] bottom-[45%] w-3.5 h-3.5 border-2 border-[#898A8D] rounded-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
