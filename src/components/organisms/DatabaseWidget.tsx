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

const healthSeriesResponse = {
  lastFetchedTime: "26-09-2024 12:10: 44:35",
  results: [
    {
      databaseName: "SEPATGP24",
      activeSessions: 25,
      totalSessions: 110,
      roundTripResponseTime: 712,
    },
    {
      databaseName: "SEPATGP25",
      activeSessions: 30,
      totalSessions: 110,
      roundTripResponseTime: 612,
    },
    {
      databaseName: "SEPATGP26",
      activeSessions: 35,
      totalSessions: 110,
      roundTripResponseTime: 500,
    },
  ],
};

const healthRes = {
  lastFetchedTime: "26-09-2024 12:10: 44:35",
  results: [
    {
      databaseName: "SEPATGP24",
      anomalyFlag: true,
      warningFlag: true,
    },
    {
      databaseName: "SEPATGP25",
      anomalyFlag: false,
      warningFlag: true,
    },
    {
      databaseName: "SEPATGP26",
      anomalyFlag: false,
      warningFlag: false,
    },
  ],
};

const DatabaseWidget = () => {
  const [selectedDB, setSelectedDB] = useState<string>("");
  const op = useRef<OverlayPanel>(null);
  const [severity, setSeverity] = useState("");

  const database = healthRes?.results.map((obj) => ({
    data: obj.databaseName,
    severity: obj.anomalyFlag
      ? SEVERITY.HIGH
      : obj.warningFlag
      ? SEVERITY.MED
      : "",
  }));

  const boxContent = {};
  healthSeriesResponse?.results.forEach((element) => {
    boxContent[element.databaseName] = [
      {
        title: "Total Sessions",
        data: element.totalSessions,
        severity: healthRes.results?.find(
          (obj) => obj.databaseName == element.databaseName
        )?.anomalyFlag
          ? SEVERITY.HIGH
          : "",
      },
      {
        title: "Active Sessions",
        data: element.activeSessions,
        severity: healthRes.results?.find(
          (obj) => obj.databaseName == element.databaseName
        )?.warningFlag
          ? SEVERITY.MED
          : "",
      },
      {
        title: "Response Time",
        data: element.roundTripResponseTime,
        severity: "",
      },
    ];
  });

  const onGridCardClick = (e, d: GridData) => {
    console.log("grid data", d);

    setSelectedDB(d.data);
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
        dataClassName="text-xs"
        className="widgets-spacing"
        onClick={onGridCardClick}
      />
      {selectedDB && (
        <CustomOverlayFocusRoom
          ref={op}
          header={selectedDB}
          boxContent={boxContent?.[selectedDB]}
          columns={3}
        />
      )}
    </div>
  );
};

export default DatabaseWidget;
