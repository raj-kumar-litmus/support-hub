const TimeTracker = ({ timeStamp }) => {
  const currentTime = new Date().getTime();
  const refreshTime = currentTime - timeStamp;
  const timeInMin = Math.round(refreshTime / 60000);

  return (
    <span className="text-xs text-[#8B8C8F] mr-3">
      Last Refreshed {timeInMin} min ago
    </span>
  );
};

export default TimeTracker;
