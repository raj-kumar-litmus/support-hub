import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import GridCards from "../molecules/GridCards";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const cancellationRes = [
  { shortName: "DC", description: "DC cancellation(STH orders only)" },
  { shortName: "CC", description: "Customer Cancellation" },
  { shortName: "SCC", description: "Scheduled Cancellation" },
  { shortName: "FC", description: "Fraud Cancellation" },
  { shortName: "FIC", description: "Free Item Cancellation" },
];

const CancellationWidget = () => {
  const [cardData, setCardData] = useState<GridData>(null);
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  const cancellation = cancellationRes.map((obj) => ({
    data: obj.shortName,
    description: obj.description,
  }));

  const onGridCardClick = (e, d: GridData) => {
    setCardData(d);
    setOpenOverlay(true);
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
        onClick={onGridCardClick}
      />
      {openOverlay && cardData && (
        <CustomOverlayFocusRoom
          ref={op}
          header={cardData.description}
          buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
        />
      )}
    </div>
  );
};
export default CancellationWidget;
