import CustomSideBar from "../components/CustomSideBar";
import { FETCH_TYPES } from "../utils/Utils";
import OPM from "../views/opm";
import { LOCALE_OPTIONS, OPM_CHANNELS, PAYMENT_TYPES, SHIPMENT_TYPES } from "../constants/appConstants";
import { OpmSideBarProps } from "../@types/components/commonTypes";

const OpmSideBar = (props: OpmSideBarProps) => {
  const {localeFilter, channelFilter, paymentFilter, shipmentFilter, visible, setVisible} = props;

  return (
    <CustomSideBar
      position="right"
      visible={visible}
      onHide={() => { setVisible(false) }}
      setVisible={setVisible}
      sideBarWidthClass="!w-80w"
      className="bg-gradient-to-b from-black-104 to-black-105 opm-sidebar"
    >
      <OPM
        fetchType={FETCH_TYPES.OPM}
        filters={{
          ...(localeFilter && { locale: LOCALE_OPTIONS[localeFilter] }),
          ...(channelFilter && { channel: OPM_CHANNELS[channelFilter] }),
          ...(paymentFilter && { payment: PAYMENT_TYPES[paymentFilter] }),
          ...(shipmentFilter && { shipment: SHIPMENT_TYPES[shipmentFilter] })
        }} />
    </CustomSideBar>
  );
}

export default OpmSideBar