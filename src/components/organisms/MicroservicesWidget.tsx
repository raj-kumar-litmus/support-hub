import { useContext } from "react";
import { FocusRoomContext } from "../../context/focusRoom";
import { FocusRoomContextType } from "../../@types/components/commonTypes";

const MicroservicesWidget = () => {
  const { focusRoomConfig, focusRoomConfigError } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;
  return (
    <div className="focus-room-widget-wrapper">
      {focusRoomConfigError && <p>Something went wrong !!</p>}
      <ul>
        {focusRoomConfig &&
          Array.isArray(focusRoomConfig) &&
          focusRoomConfig.map((e) => <li key={e.title}>{e.title}</li>)}
      </ul>
    </div>
  );
};
export default MicroservicesWidget;
