import GridCards from "../molecules/GridCards";
import { FOCUS_ROOM_TITLES } from "../../helpers/constants/appConstants";

const CancellationWidget = () => {
  const cancellation = [
    { data: "DC" },
    { data: "CC" },
    { data: "SCC" },
    { data: "FC" },
    { data: "FIC" },
  ];
  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      <GridCards
        title={FOCUS_ROOM_TITLES.CANCELLATION}
        columns={5}
        data={cancellation}
        dataClassName="text-8"
      />
    </div>
  );
};
export default CancellationWidget;
