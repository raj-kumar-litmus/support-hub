import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { FocusRoomContext } from "../../context/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import {
  FocusRoomContextType,
  GridData,
} from "../../@types/components/commonTypes";
import { getSeverityStyles } from "../../helpers/utils/utils";
 
const OpmWidget = () => {
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState<GridData>(null);
  const [channel, setChannel] = useState<GridData[]>([]);
  const [locale, setLocale] = useState<GridData[]>([]);
  const [shipment, setShipment] = useState<GridData[]>([]);
  const [payment, setPayment] = useState<GridData[]>([]);
  const op = useRef<OverlayPanel>(null);
  const { focusRoomConfig } = useContext(
    FocusRoomContext
  ) as FocusRoomContextType;

  const getGroupedWidgetData = () => {
    const _locale = [];
    const _shipment = [];
    const _channel = [];
    const _payment = [];
    focusRoomConfig.opm?.widgetDatas?.forEach((item) => {
      if (item.category === FOCUS_ROOM_TITLES.LOCALE) {
        _locale.push({
          data: item.property,
          description: item.description,
        });
      } else if (item.category === FOCUS_ROOM_TITLES.SHIPMENT) {
        _shipment.push({
          data: item.property,
          description: item.description,
        });
      } else if (item.category === FOCUS_ROOM_TITLES.CHANNEL) {
        _channel.push({
          data: item.property,
          description: item.description,
        });
      } else if (item.category === FOCUS_ROOM_TITLES.PAYMENT) {
        _payment.push({
          data: item.property,
          description: item.description,
        });
      }
    });
    setLocale(_locale);
    setShipment(_shipment);
    setChannel(_channel);
    setPayment(_payment);
  };
  const onGridCardClick = (e: React.SyntheticEvent, d: GridData) => {
    setData(d);
    op.current?.toggle(e);
  };
 
  useEffect(() => {
    focusRoomConfig && getGroupedWidgetData();
  }, [focusRoomConfig]);

  return (
    <div
      className={`focus-room-widget-wrapper px-4 pt-1 pb-4 grid-cols-2 gap-4 ${
        severity ? getSeverityStyles(severity).boxShadow : ""
      }`}
    >
      <GridCards
        title={FOCUS_ROOM_TITLES.LOCALE}
        columns={2}
        data={locale}
        dataClassName="text-xs"
        onClick={onGridCardClick}
      />
      <GridCards
        title={FOCUS_ROOM_TITLES.SHIPMENT}
        columns={3}
        data={shipment}
        dataClassName="text-xs"
        onClick={onGridCardClick}
      />
      <div className="row-span-3">
        <GridCards
          title={FOCUS_ROOM_TITLES.CHANNEL}
          columns={3}
          data={channel}
          dataClassName="text-xs"
          onClick={onGridCardClick}
        />
      </div>
      <div className="row-span-3">
        <GridCards
          title={FOCUS_ROOM_TITLES.PAYMENT}
          columns={3}
          data={payment}
          dataClassName="text-xs"
          onClick={onGridCardClick}
        />
      </div>
      <CustomOverlayFocusRoom
        ref={op}
        header={data?.description}
        buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
      />
    </div>
  );
};
 
export default OpmWidget;