import { useEffect, useState } from "react";
import GridTable from "../components/molecules/GridTable";
import OpmSideBar from "../components/organisms/OpmSideBar";
import {
  OPM_CHANNELS_CODE_MAP,
  OPM_PAYMENTS_CODE_MAP,
} from "../helpers/constants/appConstants";

const locale = [{ data: "US" }, { data: "CA" }];

const channel = [
  { data: "DSK" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC", highlight: true },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" },
];

const payment = [
  { data: "CC" },
  { data: "GC" },
  { data: "ETC" },
  { data: "PPL" },
  { data: "KLA", highlight: true },
  { data: "AFP" },
  { data: "SEP" },
  { data: "SEPT" },
];

const FocusRoom = () => {
  const [visible, setVisible] = useState(false);
  const [channelFilter, setChannelFilter] = useState("");
  const [localeFilter, setLocaleFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  useEffect(() => {
    (localeFilter || channelFilter || paymentFilter) && setVisible(true);
  }, [localeFilter, channelFilter, paymentFilter]);

  useEffect(() => {
    if (!visible) {
      setLocaleFilter("");
      setChannelFilter("");
      setPaymentFilter("");
    }
  }, [visible]);

  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <GridTable
        title="Locale"
        columns={2}
        data={locale}
        onClick={(data) => setLocaleFilter(data)}
      />
      <GridTable
        title="Channel"
        columns={3}
        data={channel}
        onClick={(data) => setChannelFilter(OPM_CHANNELS_CODE_MAP[data])}
      />
      <GridTable
        title="Payment"
        columns={3}
        data={payment}
        onClick={(data) => setPaymentFilter(OPM_PAYMENTS_CODE_MAP[data])}
      />
      <OpmSideBar
        localeFilter={localeFilter}
        channelFilter={channelFilter}
        paymentFilter={paymentFilter}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};

export default FocusRoom;
