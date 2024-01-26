import { OverlayPanel } from "primereact/overlaypanel";
import { useState, useRef, useEffect, useContext } from "react";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { FocusRoomContext } from "../../context/focusRoom";
import Loader from "../atoms/Loader";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  FOCUS_ROOM_BOPIS_SDD_CANCELLATION,
} from "../../helpers/constants/appConstants";
import { URL_FOCUS_ROOM_SDD_DATA } from "../../helpers/constants/apiConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { mapGridDataBopisAndSdd } from "../../helpers/utils/utils";
import {
  FocusRoomContextType,
  GridData,
} from "../../@types/components/commonTypes";

const SalesWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext
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

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await fetchFocusRoomData(URL_FOCUS_ROOM_SDD_DATA, {});
        setSddData(data?.results);
      } catch (err) {
        console.log("Error while fetching data: ", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.sdd?.results)) {
      setSddNames(focusRoomConfig.sdd?.results);
    }
  }, [focusRoomConfig]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFocusRoomData(URL_FOCUS_ROOM_SDD_DATA, {});
        setSddData(data?.results);
      } catch (err) {
        console.log("Error while fetching data: ", err);
      }
    })();
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
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={"focus-room-widget-wrapper px-4 pt-1 pb-4"
          }
        >
          {mappedSddData && (
            <GridCards
              title={FOCUS_ROOM_TITLES.SDD}
              columns={4}
              data={mappedSddData}
              lastUpdatedTime={sddData.lastUpdated}
              dataClassName="text-sm font-IBM"
              onClick={handleTitleClick}
            />
          )}

          <CustomOverlayFocusRoom
            header={currentTitle}
            buttonContent={buttonContent}
            ref={op}
          />
        </div>
      )}
    </>
  );
};

export default SalesWidget;
