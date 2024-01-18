import GridTable from "../molecules/GridTable";
import FilledCheckCircle from "../../assets/filled_check_circle_white.svg";
import Warning from "../../assets/warning.svg";
import { SEVERITY } from "../../helpers/constants/appConstants";

const DatabaseWidget = () => {
  const database = [
    { data: "SEPHATGP24", icon: FilledCheckCircle },
    { data: "SEPHATGP25", icon: FilledCheckCircle },
    { data: "SEPHATGP26", severity: SEVERITY.MED, icon: Warning },
  ];
  return (
    <div className="grid bg-black-106 border border-black-108 text-white-900 rounded-12 h-full px-4 pt-1 pb-4">
      <GridTable
        title="Database"
        columns={3}
        data={database}
        dataClassName="text-8"
      />
    </div>
  );
};

export default DatabaseWidget;
