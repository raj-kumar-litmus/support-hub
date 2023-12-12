import GridTable from "./common/GridTable";
import { LABELS, LOCALE_OPTIONS, OPM_CHANNELS, OPM_CHANNELS_CODE_MAP, OPM_PAYMENTS_CODE_MAP, PAYMENT_TYPES, SEVERITY } from "../constants/appConstants";
import CustomSideBar from "./CustomSideBar";
import OPM from "../views/opm";
import { FETCH_TYPES } from "./utils/Utils";
import { useEffect, useState } from "react";
import CustomButton from "./Button";


const locale = [
  { data: "US" },
  { data: "CA" },
]

const channel = [
  { data: "DSK" },
  { data: "MWB" },
  { data: "IPH" },
  { data: "AND" },
  { data: "CSC", highlight: true },
  { data: "MPL" },
  { data: "ZAP" },
  { data: "INS" }
]

const payment = [
  { data: "CC" },
  { data: "GC" },
  { data: "ETC" },
  { data: "PPL" },
  { data: "KLA", highlight: true },
  { data: "AFP" },
  { data: "SEP" },
  { data: "SEPT" }
]

const FocusRoom = () => {
  const [visible, setVisible] = useState(false);
  const [channelFilter, setChannelFilter] = useState("");
  const [localeFilter, setLocaleFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  useEffect(() => {
    (localeFilter || channelFilter || paymentFilter) &&
      setVisible(true);
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
      <CustomSideBar
        position="right"
        visible={visible}
        onHide={() => { setVisible(false) }}
        setVisible={setVisible}
      >
        <OPM
          fetchType={FETCH_TYPES.OPM}
          filters={{
            ...(localeFilter && { locale: LOCALE_OPTIONS[localeFilter] }),
            ...(channelFilter && { channel: OPM_CHANNELS[channelFilter] }),
            ...(paymentFilter && { payment: PAYMENT_TYPES[paymentFilter] })
          }} />
      </CustomSideBar>
    </div>
  );
}

export default FocusRoom
