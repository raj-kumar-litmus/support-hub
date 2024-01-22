import GridCards from "../molecules/GridCards";
import FilledCheckCircle from "../../assets/filled_check_circle_white.svg";
import Warning from "../../assets/warning.svg";
import {
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";

const DatabaseWidget = () => {
  const database = [
    { data: "SEPHATGP24", icon: FilledCheckCircle },
    { data: "SEPHATGP25", icon: FilledCheckCircle },
    { data: "SEPHATGP26", severity: SEVERITY.MED, icon: Warning },
  ];
  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      <GridCards
        title={FOCUS_ROOM_TITLES.DATABASE}
        columns={3}
        data={database}
        dataClassName="text-8"
      />
    </div>
  );
};

export default DatabaseWidget;
