import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import { FocusRoomContext } from "../../context/focusRoom";
import { URL_FOCUS_ROOM_BOPIS_DATA } from "../../helpers/constants/apiConstants";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

import {
  FOCUS_ROOM_BOPIS_SDD_CANCELLATION,
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  TIME_INTERVAL,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";

import { GridData } from "../../@types/components/commonTypes";
import { FocusRoomContextType } from "../../@types/pages/focusRoom";
import { mapGridDataBopisAndSdd } from "../../helpers/utils/utils";

const SalesWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;
  const op = useRef<OverlayPanel>(null);
  const [bopisNames, setBopisNames] = useState<any>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bopisData, setBopisData] = useState<GridData>(null);
  const [mappedBopisData, setMappedBopisData] = useState<GridData>(null);
  const [buttonContent, setButtonContent] = useState<string>("");

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.bopis?.results)) {
      setBopisNames(focusRoomConfig.bopis.results);
    }
  }, [focusRoomConfig]);

  const getData = async () => {
    try {
      const data = await fetchFocusRoomData(URL_FOCUS_ROOM_BOPIS_DATA, {});
      setBopisData(data?.results);
    } catch (err) {
      console.log("Error while fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
    const intervalId = setInterval(() => {
      getData();
    }, TIME_INTERVAL.FIFTEEN_MINS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (bopisData && bopisNames) {
      setMappedBopisData(mapGridDataBopisAndSdd(bopisData, bopisNames));
    }
  }, [bopisData, bopisNames]);

  const handleTitleClick = (e, d: GridData) => {
    if (d.title === FOCUS_ROOM_BOPIS_SDD_CANCELLATION) {
      setCurrentTitle(d.title);
      setButtonContent(FOCUS_ROOM_LABELS.VIEW_DETAILS);
      op.current?.toggle(e);
    }
  };

  return (
    <div className={"focus-room-widget-wrapper px-4 pt-1 pb-4 "}>
      {mappedBopisData && !isLoading && (
        <GridCards
          title={FOCUS_ROOM_TITLES.BOPIS}
          columns={4}
          data={mappedBopisData}
          lastUpdatedTime={bopisData.lastUpdated}
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
  );
};

export default SalesWidget;
