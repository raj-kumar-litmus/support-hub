import { createContext, useEffect, useState } from "react";
import {
  FocusRoomContextType,
  FocusRoomProps,
} from "../@types/components/commonTypes";
import { URL_FOCUS_ROOM_CONFIG } from "../helpers/constants/apiConstants";
import { fetchFocusRoomData } from "../helpers/utils/fetchUtil";

export const FocusRoomContext = createContext<FocusRoomContextType | null>(
  null
);

export const FocusRoomProvider = ({ children }: FocusRoomProps) => {
  const [focusRoomConfig, setFocusRoomConfig] = useState<any>(null);
  const [focusRoomConfigError, setFocusRoomConfigError] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFocusRoomData(URL_FOCUS_ROOM_CONFIG, {});
        setFocusRoomConfig(data);
      } catch (err) {
        setFocusRoomConfigError(true);
      }
    })();
  }, []);

  return (
    <FocusRoomContext.Provider
      value={{ focusRoomConfig, focusRoomConfigError }}
    >
      {children}
    </FocusRoomContext.Provider>
  );
};
