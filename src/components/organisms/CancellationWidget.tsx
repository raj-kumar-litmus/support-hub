import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";

const CancellationWidget = () => {
  const [cardData, setCardData] = useState<GridData>(null);
  const [cancellation, setCancellation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { focusRoomConfig } = useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  const handleGridClick = (e: React.SyntheticEvent, d: GridData) => {
    setCardData(d);
    op.current?.toggle(e);
  };

  useEffect(() => {
    setIsLoading(true);
    if (focusRoomConfig) {
      setCancellation(
        focusRoomConfig?.cancellation?.results?.map((obj) => ({
          data: obj.shortName || "-",
          description: obj.description,
        }))
      );
      setIsLoading(false);
    }
  }, [focusRoomConfig]);

  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      {isLoading && <Loader className="!h-4/5" />}
      {!isLoading && cancellation && (
        <GridCards
          title={FOCUS_ROOM_TITLES.CANCELLATION}
          columns={5}
          data={cancellation}
          dataClassName="text-xs"
          className="widgets-spacing"
          onClick={handleGridClick}
        />
      )}
      <CustomOverlayFocusRoom
        ref={op}
        header={cardData?.description}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
      />
    </div>
  );
};
export default CancellationWidget;
