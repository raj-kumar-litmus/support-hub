import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useRef, useState } from "react";
import GridCards from "../molecules/GridCards";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { FocusRoomContext } from "../../context/focusRoom";

const CancellationWidget = () => {
  const [cardData, setCardData] = useState<GridData>(null);
  const { focusRoomConfig, focusRoomConfigError } =
    useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  const cancellation = focusRoomConfig?.cancellation?.results?.map((obj) => ({
    data: obj.shortName || "-",
    description: obj.description,
  }));

  const handleGridClick = (e: React.SyntheticEvent, d: GridData) => {
    setCardData(d);
    op.current?.toggle(e);
  };

  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      <GridCards
        title={FOCUS_ROOM_TITLES.CANCELLATION}
        columns={5}
        data={cancellation}
        dataClassName="text-xs"
        className="widgets-spacing"
        onClick={handleGridClick}
      />
      <CustomOverlayFocusRoom
        ref={op}
        header={cardData?.description}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
      />
    </div>
  );
};
export default CancellationWidget;
