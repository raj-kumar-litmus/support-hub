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
import OPMHealth from "../../helpers/json/opm_health.json";
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
    const _locale = focusRoomConfig.opm?.widgetDatas
      ?.filter((item) => item.category === FOCUS_ROOM_TITLES.LOCALE)
      .map((w) => ({
        data: w.property,
        description: w.description,
      }));
    const _shipment = focusRoomConfig.opm?.widgetDatas
      .filter((item) => item.category === FOCUS_ROOM_TITLES.SHIPMENT)
      .map((w) => ({
        data: w.property,
        description: w.description,
      }));
    const _channel = focusRoomConfig.opm?.widgetDatas
      .filter((item) => item.category === FOCUS_ROOM_TITLES.CHANNEL)
      .map((w) => ({
        data: w.property,
        description: w.description,
      }));
    const _payment = focusRoomConfig.opm?.widgetDatas
      .filter((item) => item.category === FOCUS_ROOM_TITLES.PAYMENT)
      .map((w) => ({
        data: w.property,
        description: w.description,
      }));
    setLocale(_locale);
    setShipment(_shipment);
    setChannel(_channel);
    setPayment(_payment);
  };

  const getDataWithOpmHealth = (healthData) => {
    const setSeverityForCategory = (category) => {
      category?.forEach((item) => {
        item.severity = anomalyMap[item.data] ? SEVERITY.HIGH : "";
      });
      if (category?.some((item) => item.severity === SEVERITY.HIGH)) {
        setSeverity(SEVERITY.HIGH);
      }
    };
    const anomalyMap = {};
    healthData.healthStatusList.forEach((item) => {
      anomalyMap[item.property] = item.anomaly;
    });
    setSeverityForCategory(locale);
    setSeverityForCategory(shipment);
    setSeverityForCategory(channel);
    setSeverityForCategory(payment);
    setLocale(locale);
    setShipment(shipment);
    setChannel(channel);
    setPayment(payment);
  };

  const onGridCardClick = (e: React.SyntheticEvent, d: GridData) => {
    setData(d);
    op.current?.toggle(e);
  };

  useEffect(() => {
    focusRoomConfig && getGroupedWidgetData();
  }, [focusRoomConfig]);

  useEffect(() => {
    focusRoomConfig && payment.length && getDataWithOpmHealth(OPMHealth);
  }, [focusRoomConfig, payment?.length]);

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
