import CustomDialog from "../atoms/CustomDialog";
import CustomImage from "../atoms/CustomImage";
import CustomInputText from "../atoms/InputText";
import HideIcon from "../../assets/hide.svg";
import { FOCUS_ROOM_LABELS } from "../../helpers/constants/appConstants";
import MicroServiceDoughNuts from "./MicroServiceDoughNuts";

const Header = (props) => {
  return (
    <div className="flex items-center gap-[10px]">
      <p className="text-white-900 font-semibold">
        {FOCUS_ROOM_LABELS.MICRO_SERVICES}
      </p>
      <p className="text-white-900 font-thin">{props.msCount}</p>
      <CustomInputText
        placeholder={FOCUS_ROOM_LABELS.Search}
        value={props.searchResult}
        onChange={(e) => props.setSearchResult(e)}
        className="!rounded-100 h-[4vh] bg-black-106 font-helvetica"
        containerclassname="!w-[13vw] ml-auto mr-[1vw]"
      />
      <p className="text-white-900 text-xs">{FOCUS_ROOM_LABELS.Hide}</p>
      <CustomImage
        src={HideIcon}
        className="flex items-center cursor-pointer"
        onClick={props.onPopUpHideHandler}
      />
    </div>
  );
};

const MicroServicesPopUp = (props) => {
  return (
    <CustomDialog
      className="w-[50vw] h-[50vh] font-IBM microServicesPopUp border border-solid border-black-108"
      visible={props.showPopUp}
      header={
        <Header
          msCount={props.msCount}
          searchResult={props.searchResult}
          setSearchResult={(e) => props.setSearchResult(e)}
          showPopUp={props.showPopUp}
          setShowPopUp={(e) => props.setShowPopUp(e)}
          onPopUpHideHandler={props.onPopUpHideHandler}
        />
      }
      onHide={() => {
        props.setShowPopUp(false);
      }}
      closable={false}
    >
      <div className="microServices-doughnut-popup-container overflow-scroll">
        <MicroServiceDoughNuts
          isPopUp={true}
          setOverLayData={props.setOverLayData}
          op={props.op}
          microservices={props.microservices}
        />
      </div>
    </CustomDialog>
  );
};

export default MicroServicesPopUp;
