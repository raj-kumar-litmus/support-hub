import React from "react";
import TimelineCard from "../atoms/TimelineCard";
import Stepper from "../atoms/TimelineStepper";
import { TimelineProps } from "../../@types/pages/OrderDetails";

const Timeline: React.FC<TimelineProps> = (props) => {
  const getStatusDate = (dateX: string) => {
    const year = dateX.substring(0, 4);
    const month = dateX.substring(4, 6);
    const day = dateX.substring(6, 8);
    const hour = dateX.substring(8, 10);
    const min = dateX.substring(10, 12);
    const sec = dateX.substring(12, 14);
    const newDate =
      month + "-" + day + "-" + year + " " + hour + ":" + min + ":" + sec;
    return newDate;
  };

  return (
    <div className="  flex flex-col items-center">
      {Object.keys(props.orderMap).map((timestamp, index) => {
        const orderDetails = props.orderMap[timestamp][0];
        const isLast = index === Object.keys(props.orderMap).length - 1;

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
              <div className="relative left-[32%] bottom-[45%] w-3.5 h-3.5 border-2 border-gray-400 rounded-full"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
