import { useEffect, useState } from "react";
import { TimeTrackerProps } from "../@types/pages/dashboard";

const TimeTracker = (props: TimeTrackerProps) => {
  const [timeInMin, setTimeInMin] = useState<number>(0);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const refreshTime = currentTime - props.timeStamp;
    setTimeInMin(Math.round(refreshTime / 60000));
  }, [new Date().getTime()]);

  return (
    <span className={`${props.classname} text-xs text-gray-400 mr-3`}>
      Last Refreshed {timeInMin} min ago
    </span>
  );
};

export default TimeTracker;
