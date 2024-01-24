import { useRef, useState } from "react";
import KafkaSideBar from "./KafkaSideBar";
import GridCards from "../molecules/GridCards";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import { GridData } from "../../@types/components/commonTypes";
import { OverlayPanel } from "primereact/overlaypanel";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const kafkaRes = [{ category: "ATG" }, { category: "BI" }, { category: "DS" }];

const KafkaWidget = () => {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const [cardData, setCardData] = useState<GridData>(null);
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  const kafka = kafkaRes.map((obj) => ({
    data: obj.category,
  }));

  const handleGridClick = (e, d: GridData) => {
    // setSideBarVisible(true);
    setCardData(d);
    setOpenOverlay(true);
    op.current?.toggle(e);
  };

  return (
    <>
      <div className="focus-room-widget-wrapper px-4 pt-1 pb-2">
        <GridCards
          title={FOCUS_ROOM_TITLES.KAFKA}
          columns={3}
          data={kafka}
          dataClassName="text-xs"
          onClick={handleGridClick}
        />
      </div>
      {sideBarVisible && (
        <KafkaSideBar visible={sideBarVisible} setVisible={setSideBarVisible} />
      )}
      {openOverlay && cardData && (
        <CustomOverlayFocusRoom
          ref={op}
          header={cardData.data}
          buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
        />
      )}
    </>
  );
};

export default KafkaWidget;
