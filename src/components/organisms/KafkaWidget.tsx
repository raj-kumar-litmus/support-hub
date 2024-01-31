import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import KafkaSideBar from "./KafkaSideBar";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { URL_FR_KAFKA_HEALTH_SERIES } from "../../helpers/constants/apiConstants";

const KafkaWidget = () => {
  const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
  const [cardData, setCardData] = useState<GridData>(null);
  const [kafka, setKafka] = useState<any>(null);
  const [severity, setSeverity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { focusRoomConfig, focusRoomConfigError } =
    useContext(FocusRoomContext);
  const op = useRef<OverlayPanel>(null);

  // useEffect(() => {
  //   if (kafka.some((item) => item.severity === SEVERITY.HIGH)) {
  //     setSeverity(SEVERITY.HIGH);
  //   }
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    if (focusRoomConfig) {
      setKafka(
        [
          ...new Set(
            focusRoomConfig?.kafka?.results?.map((item) => item.category)
          ),
        ]
          ?.sort()
          ?.map((name) => ({
            data: name || "-",
            // severity: obj.severity || "",
          }))
      );
      setIsLoading(false);
    }
  }, [focusRoomConfig]);

  const handleGridClick = (e: React.SyntheticEvent, d: GridData) => {
    setCardData(d);
    op.current?.toggle(e);
  };

  // side bar details

  // const getDetails = async (category) => {
  //   console.log("event::", category);
  //   try {
  //     setIsLoading(true);
  //     const seriesResponse = await fetchFocusRoomData(
  //       URL_FR_KAFKA_HEALTH_SERIES,
  //       { group: category }
  //     );
  //     console.log("seriesResponse", seriesResponse);

  //   } catch (err) {
  //     console.log("Error fetching time series data", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   // setSideBarVisible(true);
  // };

  return (
    <>
      <div
        className={`focus-room-widget-wrapper px-4 pt-1.5 pb-4 ${
          severity ? getSeverityStyles(severity).boxShadow : ""
        }`}
      >
        {isLoading && <Loader className="!h-4/5" />}
        {!isLoading && kafka && (
          <GridCards
            title={FOCUS_ROOM_TITLES.KAFKA}
            columns={3}
            data={kafka}
            dataClassName="text-xs uppercase"
            className="widgets-spacing"
            onClick={handleGridClick}
          />
        )}
      </div>
      {sideBarVisible && (
        <KafkaSideBar visible={sideBarVisible} setVisible={setSideBarVisible} />
      )}
      <CustomOverlayFocusRoom
        ref={op}
        header={cardData?.data?.toUpperCase()}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
        // onButtonClick={getDetails}
      />
    </>
  );
};

export default KafkaWidget;
