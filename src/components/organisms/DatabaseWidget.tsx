import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";
import { FocusRoomContext } from "../../context/focusRoom";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { URL_FR_DB_HEALTH_SERIES } from "../../helpers/constants/apiConstants";

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
  const [severity, setSeverity] = useState("");
  const [boxContent, setBoxContent] = useState(null);
  const { focusRoomConfig, focusRoomConfigError } =
    useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  // const database = healthRes?.results.map((obj) => ({
  //   data: obj.databaseName,
  //   severity: obj.anomalyFlag
  //     ? SEVERITY.HIGH
  //     : obj.warningFlag
  //     ? SEVERITY.MED
  //     : "",
  // }));

  const database = focusRoomConfig?.database?.results.map((obj) => ({
    data: obj.shortName,
  }));

  useEffect(() => {
    const mockBC = focusRoomConfig?.database?.results?.map((data) => ({
      [data.shortName]: [
        {
          title: FOCUS_ROOM_LABELS.TOTAL_SESSIONS,
        },
        {
          title: FOCUS_ROOM_LABELS.ACTIVE_SESSIONS,
        },
        { title: FOCUS_ROOM_LABELS.RESPONSE_TIME },
      ],
    }));
    setBoxContent(mockBC);
  }, [focusRoomConfig]);

  const fetchDBHealthSeriesData = async () => {
    try {
      const healthSeriesResponse = await fetchFocusRoomData(
        URL_FR_DB_HEALTH_SERIES,
        {}
      );
      const popupData = {};
      healthSeriesResponse?.results.forEach((element) => {
        popupData[element.databaseName] = [
          {
            title: FOCUS_ROOM_LABELS.TOTAL_SESSIONS,
            data: element.totalSessions,
            // severity: healthRes.results?.find(
            //   (obj) => obj.databaseName == element.databaseName
            // )?.anomalyFlag
            //   ? SEVERITY.HIGH
            //   : "",
          },
          {
            title: FOCUS_ROOM_LABELS.ACTIVE_SESSIONS,
            data: element.activeSessions,
            // severity: healthRes.results?.find(
            //   (obj) => obj.databaseName == element.databaseName
            // )?.warningFlag
            //   ? SEVERITY.MED
            //   : "",
          },
          {
            title: FOCUS_ROOM_LABELS.RESPONSE_TIME,
            data: element.roundTripResponseTime,
            // severity: "",
          },
        ];
      });
      setBoxContent(popupData);
    } catch (err) {
      console.log("Error fetching database data", err);
    }
  };

  const handleGridClick = (e, d: GridData) => {
    fetchDBHealthSeriesData();
    setSelectedDB(d.data);
    op.current?.toggle(e);
  };

  // useEffect(() => {
  //   if (database.some((item) => item.severity === SEVERITY.HIGH)) {
  //     setSeverity(SEVERITY.HIGH);
  //   } else if (database.some((item) => item.severity === SEVERITY.MED)) {
  //     setSeverity(SEVERITY.MED);
  //   }
  // }, [database]);

  return (
    <>
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
          onClick={handleGridClick}
        />
        {boxContent && (
          <CustomOverlayFocusRoom
            ref={op}
            header={selectedDB}
            boxContent={boxContent?.[selectedDB]}
            columns={3}
          />
        )}
      </div>
    </>
  );
};

export default DatabaseWidget;
