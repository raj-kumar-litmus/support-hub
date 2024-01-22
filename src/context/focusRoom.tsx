import { createContext, useEffect, useState } from "react";
import {
  FocusRoomContextType,
  FocusRoomProps,
} from "../@types/components/commonTypes";
import { fetchData } from "../helpers/utils/fetchUtil";

export const FocusRoomContext = createContext<FocusRoomContextType | null>(
  null,
);

export const FocusRoomProvider = ({ children }: FocusRoomProps) => {
  const [focusRoomConfig, setFocusRoomConfig] = useState<any>(null);
  const [focusRoomConfigError, setFocusRoomConfigError] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData(
          `https://jsonplaceholder.typicode.com/posts`, //todo. will be changed once "config" api is ready
          {},
        );
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
