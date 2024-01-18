import { useEffect, useState } from "react";
import GridTable from "../molecules/GridTable";
import { GridData } from "../../@types/components/commonTypes";
import {
  FOCUS_ROOM_TITLES,
  SEVERITY,
} from "../../helpers/constants/appConstants";
import { getSeverityStyles } from "../../helpers/utils/utils";

const OpmWidget = () => {
  const [severity, setSeverity] = useState("");

  const locale: GridData[] = [{ data: "US" }, { data: "CA" }];

  const shipment: GridData[] = [
    { data: "STH" },
    { data: "BOP" },
    { data: "SDD", severity: SEVERITY.MED },
  ];

  const channel: GridData[] = [
    { data: "DSK", severity: SEVERITY.HIGH },
    { data: "MWB" },
    { data: "IPH" },
    { data: "AND" },
    { data: "CSC" },
    { data: "MPL" },
    { data: "ZAP" },
    { data: "INS" },
  ];

  const payment: GridData[] = [
    { data: "CC" },
    { data: "GC" },
    { data: "ETC" },
    { data: "PPL" },
    { data: "KLA" },
    { data: "AFP" },
    { data: "SEP" },
    { data: "SEPT" },
  ];

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
      />
      <GridTable
        title={FOCUS_ROOM_TITLES.SHIPMENT}
        columns={3}
        data={shipment}
        dataClassName="text-xs"
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
    </div>
  );
};

export default OpmWidget;
