import { FC } from "react";
import CustomSideBar from "../components/CustomSideBar";
import { FETCH_TYPES } from "../components/utils/Utils";
import OPM from "../views/opm";
import { LOCALE_OPTIONS, OPM_CHANNELS, PAYMENT_TYPES } from "../constants/appConstants";
import { OpmSideBarProps } from "../@types/components/commonTypes";

const OpmSideBar: FC<OpmSideBarProps> = (props) => {
  const {localeFilter, channelFilter, paymentFilter, visible, setVisible} = props;

  return (
    <CustomSideBar
      position="right"
      visible={visible}
      onHide={() => { setVisible(false) }}
      setVisible={setVisible}
      sideBarWidthClass="!w-80w"
    >
      <OPM
        fetchType={FETCH_TYPES.OPM}
        filters={{
          ...(localeFilter && { locale: LOCALE_OPTIONS[localeFilter] }),
          ...(channelFilter && { channel: OPM_CHANNELS[channelFilter] }),
          ...(paymentFilter && { payment: PAYMENT_TYPES[paymentFilter] })
        }} />
    </CustomSideBar>
  );
}

export default OpmSideBar