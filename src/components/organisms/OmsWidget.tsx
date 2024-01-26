import { useState, useEffect, useRef, useContext } from "react";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import Loader from "../atoms/Loader";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
} from "../../helpers/constants/appConstants";
import {
  GridData,
  FocusRoomContextType,
} from "../../@types/components/commonTypes";

const OmsWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext
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
      setIsLoading(false)
    }
  }, [OmsNames]);

  const onGridCardClick = (e, d: GridData) => {
    setCurrentTitle(d.description);
    setButtonContent(FOCUS_ROOM_LABELS.VIEW_DETAILS);
    op.current?.toggle(e);
  };

  return (
    <>
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div
          className={"focus-room-widget-wrapper px-4 pt-1 pb-4"}
        >
          {mappedOmsData && (
            <GridCards
              title={FOCUS_ROOM_TITLES.OMS}
              columns={5}
              data={mappedOmsData}
              dataClassName="text-xs font- helvetica"
              onClick={onGridCardClick}
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

export default OmsWidget;
