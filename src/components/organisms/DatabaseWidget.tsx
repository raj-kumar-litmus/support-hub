import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";

const DatabaseWidget = () => {
  const [data, setData] = useState<GridData>(null);
  const op = useRef<OverlayPanel>(null);
  const [severity, setSeverity] = useState("");

  const database = [
    { data: "SEPHATGP24" },
    { data: "SEPHATGP25" },
    { data: "SEPHATGP26", severity: SEVERITY.MED },
  ];

  const boxContent = [
    { title: "Total Sessions", data: "7", severity: SEVERITY.MED },
    { title: "Active Sessions", data: "1182", severity: SEVERITY.MED },
    { title: "Response Time", data: "12", severity: SEVERITY.MED },
  ];

  const onGridCardClick = (e, d: GridData) => {
    setData(d);
    op.current?.toggle(e);
  };

  useEffect(() => {
    if (database.some((item) => item.severity === SEVERITY.HIGH)) {
      setSeverity(SEVERITY.HIGH);
    } else if (database.some((item) => item.severity === SEVERITY.MED)) {
      setSeverity(SEVERITY.MED);
    }
  }, [database]);

  return (
    <div
      className={`focus-room-widget-wrapper px-4 pt-1 pb-4 ${
        severity ? getSeverityStyles(severity).boxShadow : ""
      }`}
    >
      <GridCards
        title={FOCUS_ROOM_TITLES.DATABASE}
        columns={3}
        data={database}
        dataClassName="text-8"
        onClick={onGridCardClick}
      />
      <CustomOverlayFocusRoom
        ref={op}
        header={data?.data}
        boxContent={boxContent}
        columns={3}
      />
    </div>
  );
};

export default DatabaseWidget;
