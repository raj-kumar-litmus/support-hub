import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FocusRoomContextType,
  GridData,
} from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import { URL_FOCUS_ROOM_SDD_DATA } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_BOPIS_SDD_CANCELLATION,
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  REFRESH_TIME_INTERVAL_FOCUS_ROOM,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { mapGridDataBopisAndSdd } from "../../helpers/utils/utils";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const SalesWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;
  const op = useRef<OverlayPanel>(null);
  const [sddData, setSddData] = useState<GridData>(null);
  const [sddNames, setSddNames] = useState<GridData>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [mappedSddData, setMappedSddData] = useState<GridData>(null);
  const [buttonContent, setButtonContent] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const healthResponse = {
    lastUpdated: "26-04-2023 21:33",
    healthStatusList: [
      {
        property: "SDD",
        anomaly: false,
      },
    ],
  };

  const getData = async () => {
    try {
      const data = await fetchFocusRoomData(URL_FOCUS_ROOM_SDD_DATA, {});
      setSddData(data?.results);
    } catch (err) {
      console.log("Error while fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.sdd?.results)) {
      setSddNames(focusRoomConfig.sdd?.results);
    }
  }, [focusRoomConfig]);

  useEffect(() => {
    setIsLoading(true);
    getData();
    const intervalId = setInterval(() => {
      setIsLoading(true);
      getData();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.FIFTEEN_MINS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (sddData && sddNames) {
      setMappedSddData(mapGridDataBopisAndSdd(sddData, sddNames));
    }
  }, [sddData, sddNames]);

  const handleTitleClick = (e, d: GridData) => {
    if (d.title === FOCUS_ROOM_BOPIS_SDD_CANCELLATION) {
      setCurrentTitle(d.title);
      setButtonContent(FOCUS_ROOM_LABELS.VIEW_DETAILS);
      op.current?.toggle(e);
    }
  };

  return (
    <>
      <div className={"focus-room-widget-wrapper px-4 pt-1 pb-4"}>
        {mappedSddData && !isLoading && (
          <GridCards
            title={FOCUS_ROOM_TITLES.SDD}
            columns={4}
            data={mappedSddData}
            lastUpdatedTime={sddData.lastUpdated}
            dataClassName="text-sm font-IBM"
            onClick={handleTitleClick}
          />
        )}
        {isLoading && <Loader />}
        <CustomOverlayFocusRoom
          header={currentTitle}
          buttonContent={buttonContent}
          ref={op}
        />
      </div>
    </>
  );
};

export default SalesWidget;
