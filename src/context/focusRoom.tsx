import { createContext, useEffect, useState } from "react";
import {
  FocusRoomContextType,
  FocusRoomProps,
} from "../@types/pages/focusRoom";
import { URL_FOCUS_ROOM_CONFIG } from "../helpers/constants/apiConstants";
import { ERRORS, TIME_INTERVAL } from "../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../helpers/utils/fetchUtil";

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
      if (err.name === ERRORS.TYPE.ABORT) {
        setFocusRoomConfig(ERRORS.TIMED_OUT);
      }
    }
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, TIME_INTERVAL.ONE_MIN);
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
