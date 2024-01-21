import GridTable from "../molecules/GridTable";
import {
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";

const DatabaseWidget = () => {
  const database = [
    { data: "SEPHATGP24" },
    { data: "SEPHATGP25" },
    { data: "SEPHATGP26", severity: SEVERITY.MED },
  ];
  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-2">
      <GridTable
        title={FOCUS_ROOM_TITLES.DATABASE}
        columns={3}
        data={database}
        dataClassName="text-8"
      />
    </div>
  );
};

export default DatabaseWidget;
