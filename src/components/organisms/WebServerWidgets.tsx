import { useEffect, useState } from "react";
import ApiUfeWidgets from "./ApiUfeWidgets";
import { URL_FR_WEBSERVER_HEALTH } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_TITLES,
  REFRESH_TIME_INTERVAL_FOCUS_ROOM,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";

const WebServerWidgets = () => {
  const [widgetData, setWidgetData] = useState(null);

  const fetchWebServerData = async () => {
    try {
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
      });
    } catch (err) {
      console.log("Error fetching webserver data", err);
    }
  };

  useEffect(() => {
    fetchWebServerData();
    const intervalId = setInterval(() => {
      fetchWebServerData();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.ONE_MIN);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-x-0.6w h-full">
      {widgetData && widgetData[FOCUS_ROOM_TITLES.API] && (
        <ApiUfeWidgets
          title={FOCUS_ROOM_TITLES.API}
          totalServers={widgetData[FOCUS_ROOM_TITLES.API]?.totalServers}
          errorServers={widgetData[FOCUS_ROOM_TITLES.API]?.errorServers}
        />
      )}
      {widgetData && widgetData[FOCUS_ROOM_TITLES.UFE] && (
        <ApiUfeWidgets
          title={FOCUS_ROOM_TITLES.UFE}
          totalServers={widgetData[FOCUS_ROOM_TITLES.UFE]?.totalServers}
          errorServers={widgetData[FOCUS_ROOM_TITLES.UFE]?.errorServers}
        />
      )}
    </div>
  );
};

export default WebServerWidgets;
