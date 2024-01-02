import CustomSideBar from "./molecules/CustomSideBar";
import { FETCH_TYPES } from "../helpers/utils/Utils";
import OPM from "../views/opm";
import {
  LOCALE_OPTIONS,
  OPM_CHANNELS,
  PAYMENT_TYPES,
  OPM_SHIPMENT_CODE_MAP,
} from "../helpers/constants/appConstants";
import { OpmSideBarProps } from "../@types/components/commonTypes";

const OpmSideBar = (props: OpmSideBarProps) => {
  const {
    localeFilter,
    channelFilter,
    paymentFilter,
    shipmentFilter,
    visible,
    setVisible,
  } = props;

  return (
    <CustomSideBar
      position="right"
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      setVisible={setVisible}
      sideBarWidthClass="!w-50w"
      className="bg-gradient-to-b from-black-104 to-black-105 opm-sidebar"
    >
      <OPM
        fetchType={FETCH_TYPES.OPM}
        filters={{
          ...(localeFilter && { locale: LOCALE_OPTIONS[localeFilter] }),
          ...(channelFilter && { channel: OPM_CHANNELS[channelFilter] }),
          ...(paymentFilter && { payment: PAYMENT_TYPES[paymentFilter] }),
          ...(shipmentFilter && {
            shipment: OPM_SHIPMENT_CODE_MAP[shipmentFilter],
          }),
        }}
      />
    </CustomSideBar>
  );
};

export default OpmSideBar;
