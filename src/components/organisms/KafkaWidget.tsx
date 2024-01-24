import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
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

const kafkaRes = [
  { category: "ATG" },
  { category: "BI", severity: SEVERITY.HIGH },
  { category: "DS" },
];

const KafkaWidget = () => {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const [cardData, setCardData] = useState<GridData>(null);
  const [severity, setSeverity] = useState<string>("");
  const op = useRef<OverlayPanel>(null);

  const kafka = kafkaRes.map((obj) => ({
    data: obj.category,
    severity: obj.severity || "",
  }));

  useEffect(() => {
    if (kafka.some((item) => item.severity === SEVERITY.HIGH)) {
      setSeverity(SEVERITY.HIGH);
    }
  }, []);

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
          dataClassName="text-xs"
          onClick={handleGridClick}
        />
      </div>
      {sideBarVisible && (
        <KafkaSideBar visible={sideBarVisible} setVisible={setSideBarVisible} />
      )}
      <CustomOverlayFocusRoom
        ref={op}
        header={cardData?.data}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
      />
    </>
  );
};

export default KafkaWidget;
