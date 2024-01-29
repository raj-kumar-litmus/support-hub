import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const CancellationWidget = () => {
  const [cardData, setCardData] = useState<GridData>(null);
  const [cancellation, setCancellation] = useState<any>(null);
  const { focusRoomConfig } = useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  const handleGridClick = (e: React.SyntheticEvent, d: GridData) => {
    setCardData(d);
    op.current?.toggle(e);
  };

  useEffect(() => {
    setCancellation(
      focusRoomConfig?.cancellation?.results?.map((obj) => ({
        data: obj.shortName || "-",
        description: obj.description,
      })),
    );
  }, [focusRoomConfig]);

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
