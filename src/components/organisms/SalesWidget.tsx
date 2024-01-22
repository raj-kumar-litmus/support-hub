import { FOCUS_ROOM_TITLES } from "../../helpers/constants/appConstants";
import GridCards from "../molecules/GridCards";

const SalesWidget = () => {
  const sales = [
    { title: "Total Forecast", data: "$15.01M" },
    { title: "Total Sales", data: "$14.27M" },
    { title: "Total Orders", data: "183,951" },
    { title: "Avg Order", data: "78" },
  ];
  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      <GridCards
        title={FOCUS_ROOM_TITLES.SALES}
        columns={4}
        data={sales}
        lastUpdatedTime="11:00 PM"
        dataClassName="text-sm font-IBM"
      />
    </div>
  );
};

export default SalesWidget;
