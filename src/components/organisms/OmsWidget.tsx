import { useContext, useEffect, useRef, useState } from "react";
import {
  FocusRoomContextType,
  GridData,
} from "../../@types/components/commonTypes";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const OmsWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;

  const op = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [buttonContent, setButtonContent] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mappedOmsData, setMappedOmsData] = useState([]);
  const [OmsNames, setOmsNames] = useState<any>(false);

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.oms?.results)) {
      setOmsNames(focusRoomConfig.oms?.results);
    }
  }, [focusRoomConfig]);

  useEffect(() => {
    setIsLoading(true);
    if (OmsNames) {
      const mappedOmsData = OmsNames.map((item) => {
        return {
          data: item.shortName,
          description: item.description,
        };
      });
      setMappedOmsData(mappedOmsData);
      setIsLoading(false);
    }
  }, [OmsNames]);

  const onGridCardClick = (e, d: GridData) => {
    setCurrentTitle(d.description);
    setButtonContent(FOCUS_ROOM_LABELS.VIEW_DETAILS);
    op.current?.toggle(e);
  };

  return (
    <div className={"focus-room-widget-wrapper px-4 pt-1 pb-4"}>
      {mappedOmsData && !isLoading && (
        <GridCards
          title={FOCUS_ROOM_TITLES.OMS}
          columns={5}
          data={mappedOmsData}
          dataClassName="text-xs"
          onClick={onGridCardClick}
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

export default OmsWidget;
