import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import KafkaSideBar from "./KafkaSideBar";

const KafkaWidget = () => {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const [cardData, setCardData] = useState<GridData>(null);
  const [kafka, setKafka] = useState<any>(null);
  const [severity, setSeverity] = useState<string>("");
  const { focusRoomConfig, focusRoomConfigError } =
    useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  // useEffect(() => {
  //   if (kafka.some((item) => item.severity === SEVERITY.HIGH)) {
  //     setSeverity(SEVERITY.HIGH);
  //   }
  // }, []);

  useEffect(() => {
    setKafka(
      [
        ...new Set(
          focusRoomConfig?.kafka?.results?.map((item) => item.category),
        ),
      ]
        ?.sort()
        ?.map((name) => ({
          data: name || "-",
          // severity: obj.severity || "",
        })),
    );
  }, [focusRoomConfig]);

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
