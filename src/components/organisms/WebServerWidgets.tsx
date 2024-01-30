import { useEffect, useState } from "react";
import ApiUfeWidgets from "./ApiUfeWidgets";
import Loader from "../atoms/Loader";
import { URL_FR_WEBSERVER_HEALTH } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_TITLES,
  REFRESH_TIME_INTERVAL_FOCUS_ROOM,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { getSeverityStyles } from "../../helpers/utils/utils";

const WebServerWidgets = () => {
  const [widgetData, setWidgetData] = useState(null);
  const [hover, setHover] = useState<boolean>(false);
  const [severity, setSeverity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      console.log("Error fetching webserver data", err);
    }
  };

  useEffect(() => {
    fetchWebServerData();
    const intervalId = setInterval(() => {
      setIsLoading(true);
      fetchWebServerData();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.ONE_MIN);
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
        {isLoading && <Loader />}
        {!isLoading && widgetData && widgetData[FOCUS_ROOM_TITLES.API] && (
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
        {isLoading && <Loader />}
        {!isLoading && widgetData && widgetData[FOCUS_ROOM_TITLES.UFE] && (
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
