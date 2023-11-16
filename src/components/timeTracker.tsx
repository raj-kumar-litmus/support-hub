interface TimeTrackerProps {
  timeStamp: number;
  classname?: string;
}

const TimeTracker = (props: TimeTrackerProps) => {
  const currentTime = new Date().getTime();
  const refreshTime = currentTime - props.timeStamp;
  const timeInMin = Math.round(refreshTime / 60000);

  return (
    <span className={`${props.classname} text-xs text-[#8B8C8F] mr-3`}>
      Last Refreshed {timeInMin} min ago
    </span>
  );
};

export default TimeTracker;
