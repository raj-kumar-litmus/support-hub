import { useEffect, useRef, useState } from "react";
import GridTable from "../molecules/GridTable";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";
import OPMWidgetData from "../../helpers/json/opm_widget.json";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import { OverlayPanel } from "primereact/overlaypanel";

const OpmWidget = () => {
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState<GridData>(null);
  const [channel, setChannel] = useState<GridData[]>([]);
  const [locale, setLocale] = useState<GridData[]>([]);
  const [shipment, setShipment] = useState<GridData[]>([]);
  const [payment, setPayment] = useState<GridData[]>([]);
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  const getGroupedWidgetData = () => {
    const _locale = OPMWidgetData.widgetDatas
      .filter((item) => item.category === "Locale")
      .map((w) => ({
        data: w.property,
        description: w.description,
        severity: w.anomaly ? SEVERITY.HIGH : "",
      }));
    const _shipment = OPMWidgetData.widgetDatas
      .filter((item) => item.category === "Shipment")
      .map((w) => ({
        data: w.property,
        description: w.description,
        severity: w.anomaly ? SEVERITY.HIGH : "",
      }));
    const _channel = OPMWidgetData.widgetDatas
      .filter((item) => item.category === "Channel")
      .map((w) => ({
        data: w.property,
        description: w.description,
        severity: w.anomaly ? SEVERITY.HIGH : "",
      }));
    const _payment = OPMWidgetData.widgetDatas
      .filter((item) => item.category === "Payment")
      .map((w) => ({
        data: w.property,
        description: w.description,
        severity: w.anomaly ? SEVERITY.HIGH : "",
      }));
    setLocale(_locale);
    setShipment(_shipment);
    setChannel(_channel);
    setPayment(_payment);
  };

  const onGridCardClick = (e, d: GridData) => {
    setData(d);
    setOpenOverlay(true);
    op.current?.toggle(e);
  };

  useEffect(() => {
    getGroupedWidgetData();
  }, []);

  useEffect(() => {
    if (locale) {
      if (locale.some((item) => item.severity === SEVERITY.HIGH)) {
        setSeverity(SEVERITY.HIGH);
        return;
      }
    }
    if (shipment) {
      if (shipment.some((item) => item.severity === SEVERITY.HIGH)) {
        setSeverity(SEVERITY.HIGH);
        return;
      }
    }
    if (channel) {
      if (channel.some((item) => item.severity === SEVERITY.HIGH)) {
        setSeverity(SEVERITY.HIGH);
        return;
      }
    }
    if (payment) {
      if (payment.some((item) => item.severity === SEVERITY.HIGH)) {
        setSeverity(SEVERITY.HIGH);
        return;
      }
    }
  }, [locale, shipment, channel, payment]);

  return (
    <div
      className={`focus-room-widget-wrapper px-4 pt-1 pb-4 grid-cols-2 gap-4 ${
        severity ? getSeverityStyles(severity).boxShadow : ""
      }`}
    >
      <GridTable
        title={FOCUS_ROOM_TITLES.LOCALE}
        columns={2}
        data={locale}
        dataClassName="text-xs"
        onClick={onGridCardClick}
      />
      <GridTable
        title={FOCUS_ROOM_TITLES.SHIPMENT}
        columns={3}
        data={shipment}
        dataClassName="text-xs"
        onClick={onGridCardClick}
      />
      <GridTable
        title={FOCUS_ROOM_TITLES.CHANNEL}
        columns={3}
        data={channel}
        dataClassName="text-xs"
      />
      <GridTable
        title={FOCUS_ROOM_TITLES.PAYMENT}
        columns={3}
        data={payment}
        dataClassName="text-xs"
      />
      {openOverlay && data && (
        <CustomOverlayFocusRoom
          ref={op}
          header={data.description}
          buttonContent="View Details"
        />
      )}
    </div>
  );
};

export default OpmWidget;
