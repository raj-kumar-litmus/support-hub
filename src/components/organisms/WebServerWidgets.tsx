import { useEffect, useState } from "react";
import ApiUfeWidgets from "./ApiUfeWidgets";
import { FOCUS_ROOM_TITLES } from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { URL_FR_WEBSERVER_HEALTH } from "../../helpers/constants/apiConstants";

const WebServerWidgets = () => {
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        ["API", "UFE"].forEach(async (server) => {
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
    })();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-y-1.5h gap-x-0.6w">
      {/* {widgetData && (
        <> */}
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

      {/* </>
      )} */}
    </div>
  );
};

export default WebServerWidgets;
