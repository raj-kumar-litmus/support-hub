import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import KafkaSideBar from "./KafkaSideBar";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";
import { FocusRoomContext } from "../../context/focusRoom";

const KafkaWidget = () => {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const [cardData, setCardData] = useState<GridData>(null);
  const [severity, setSeverity] = useState<string>("");
  const { focusRoomConfig, focusRoomConfigError } =
    useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  const uniqueKafkaNames = [
    ...new Set(focusRoomConfig?.kafka?.results?.map((item) => item.category)),
  ];
  const kafka = uniqueKafkaNames?.sort()?.map((name) => ({
    data: name || "-",
    // severity: obj.severity || "",
  }));
  // useEffect(() => {
  //   if (kafka.some((item) => item.severity === SEVERITY.HIGH)) {
  //     setSeverity(SEVERITY.HIGH);
  //   }
  // }, []);

  const handleGridClick = (e: React.SyntheticEvent, d: GridData) => {
    // setSideBarVisible(true);
    setCardData(d);
    op.current?.toggle(e);
  };

  return (
    <>
      <div
        className={`focus-room-widget-wrapper px-4 pt-1 pb-2 ${
          severity ? getSeverityStyles(severity).boxShadow : ""
        }`}
      >
        <GridCards
          title={FOCUS_ROOM_TITLES.KAFKA}
          columns={3}
          data={kafka}
          dataClassName="text-xs uppercase"
          onClick={handleGridClick}
        />
      </div>
      {sideBarVisible && (
        <KafkaSideBar visible={sideBarVisible} setVisible={setSideBarVisible} />
      )}
      <CustomOverlayFocusRoom
        ref={op}
        header={cardData?.data?.toUpperCase()}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
      />
    </>
  );
};

export default KafkaWidget;
