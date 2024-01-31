import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import { URL_FR_DB_HEALTH_SERIES } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { getSeverityStyles } from "../../helpers/utils/utils";

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
  const [database, setDataBase] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  useEffect(() => {
    setIsLoading(true);
    if (focusRoomConfig) {
      setBoxContent(
        focusRoomConfig?.database?.results?.map((data) => ({
          [data.shortName]: [
            {
              title: FOCUS_ROOM_LABELS.TOTAL_SESSIONS,
            },
            {
              title: FOCUS_ROOM_LABELS.ACTIVE_SESSIONS,
            },
            { title: FOCUS_ROOM_LABELS.RESPONSE_TIME },
          ],
        }))
      );
      setDataBase(
        focusRoomConfig?.database?.results.map((obj) => ({
          data: obj.shortName,
        }))
      );
      setIsLoading(false);
    }
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
        {isLoading && <Loader className="!h-4/5" />}
        {!isLoading && database && (
          <GridCards
            title={FOCUS_ROOM_TITLES.DATABASE}
            columns={3}
            data={database}
            dataClassName="text-xs"
            className="widgets-spacing"
            onClick={handleGridClick}
          />
        )}
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
