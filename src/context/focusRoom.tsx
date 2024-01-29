import { createContext, useEffect, useState } from "react";
import {
  FocusRoomContextType,
  FocusRoomProps,
} from "../@types/components/commonTypes";
import { URL_FOCUS_ROOM_CONFIG } from "../helpers/constants/apiConstants";
import { fetchFocusRoomData } from "../helpers/utils/fetchUtil";
import { REFRESH_TIME_INTERVAL_FOCUS_ROOM } from "../helpers/constants/appConstants";

export const FocusRoomContext = createContext<FocusRoomContextType | null>(
  null,
);

export const FocusRoomProvider = ({ children }: FocusRoomProps) => {
  const [focusRoomConfig, setFocusRoomConfig] = useState<any>(null);
  const [focusRoomConfigError, setFocusRoomConfigError] =
    useState<boolean>(false);

  const getData = async () => {
    try {
      const data = await fetchFocusRoomData(URL_FOCUS_ROOM_CONFIG, {});
      setFocusRoomConfig(data);
    } catch (err) {
      setFocusRoomConfigError(true);
    }
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.ONE_MIN);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <FocusRoomContext.Provider
      value={{ focusRoomConfig, focusRoomConfigError }}
    >
      {children}
    </FocusRoomContext.Provider>
  );
};
