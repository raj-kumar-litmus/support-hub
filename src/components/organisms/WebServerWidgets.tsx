import { useEffect, useState } from "react";
import ApiUfeWidgets from "./ApiUfeWidgets";
import Loader from "../atoms/Loader";
import { URL_FR_WEBSERVER_HEALTH } from "../../helpers/constants/apiConstants";
import {
  ERRORS,
  FOCUS_ROOM_TITLES,
  TIME_INTERVAL,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { getSeverityStyles } from "../../helpers/utils/utils";

const WebServerWidgets = () => {
  const [widgetData, setWidgetData] = useState(null);
  const [severity, setSeverity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<boolean>(false);

  const fetchWebServerData = async () => {
    try {
      setIsLoading(true);
      [FOCUS_ROOM_TITLES.API, FOCUS_ROOM_TITLES.UFE].forEach(async (server) => {
        const data = await fetchFocusRoomData(URL_FR_WEBSERVER_HEALTH, {
          webServerType: server.toLowerCase(),
        });
        const serverData = {
          [server]: {
            totalServers: data.totalServerCount,
            errorServers: data.serverErrorCount,
          },
        };
        setWidgetData((prev) => ({ ...prev, ...serverData }));
        setIsLoading(false);
      });
    } catch (err) {
      setApiError(true);
    }
  };

  useEffect(() => {
    fetchWebServerData();
    const intervalId = setInterval(() => {
      setIsLoading(true);
      fetchWebServerData();
    }, TIME_INTERVAL.ONE_MIN);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   props.errorServers && setSeverity(SEVERITY.HIGH);
  // }, [props.errorServers]);

  return (
    <div className="grid grid-cols-2 gap-x-0.6w h-full">
      <div
        className={`bg-black-106 border border-black-108 text-white-900 relative rounded-12 h-full ${
          severity ? getSeverityStyles(severity).boxShadow : ""
        }`}
      >
        {isLoading && !apiError && <Loader />}
        {apiError && (
          <p className="centered text-center text-white-900 text-10 font-IBM">
            {ERRORS.SERVICE_ERROR_MESSAGE}
          </p>
        )}
        {!isLoading &&
          !apiError &&
          widgetData &&
          widgetData[FOCUS_ROOM_TITLES.API] && (
            <ApiUfeWidgets
              title={FOCUS_ROOM_TITLES.API}
              totalServers={widgetData[FOCUS_ROOM_TITLES.API]?.totalServers}
              errorServers={widgetData[FOCUS_ROOM_TITLES.API]?.errorServers}
            />
          )}
      </div>
      <div
        className={`bg-black-106 border border-black-108 text-white-900 relative rounded-12 h-full ${
          severity ? getSeverityStyles(severity).boxShadow : ""
        }`}
      >
        {isLoading && !apiError && <Loader />}
        {apiError && (
          <p className="centered text-center text-white-900 text-10 font-IBM">
            {ERRORS.SERVICE_ERROR_MESSAGE}
          </p>
        )}
        {!isLoading &&
          !apiError &&
          widgetData &&
          widgetData[FOCUS_ROOM_TITLES.UFE] && (
            <ApiUfeWidgets
              title={FOCUS_ROOM_TITLES.UFE}
              totalServers={widgetData[FOCUS_ROOM_TITLES.UFE]?.totalServers}
              errorServers={widgetData[FOCUS_ROOM_TITLES.UFE]?.errorServers}
            />
          )}
      </div>
    </div>
  );
};

export default WebServerWidgets;
