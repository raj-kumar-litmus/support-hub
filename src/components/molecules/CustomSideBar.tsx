import { Sidebar } from "primereact/sidebar";
import CustomButton from "../atoms/Button";
import { LABELS } from "../../helpers/constants/appConstants";
import {
  CustomSideBarProps,
  SideBarPositionEnums,
} from "../../@types/components/commonTypes";

const CustomSideBar = (props: CustomSideBarProps) => {
  const { className = "" } = props;

  const getCloseBtnLayoutClasses = () => {
    switch (props.position) {
      case SideBarPositionEnums.RIGHT:
        return "rotate-180 right-8";
      case SideBarPositionEnums.LEFT:
        return "left-8";
      default:
        return "rotate-180 right-8";
    }
  };

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={props.visible}
        position={props.position}
        onHide={() => props.setVisible(false)}
        blockScroll
        className={`custom-sidebar relative ${
          props.themeClasses ? props.themeClasses : ""
        }  ${props.sideBarWidthClass || "!w-50w"} ${className}`}
        showCloseIcon={false}
      >
        <CustomButton
          className={`custom-sidebar-close-btn z-0 ${getCloseBtnLayoutClasses()} ${
            props.sideBarWidthClass || "!w-50w"
          }`}
          onClick={() => props.setVisible(false)}
        >
          {LABELS.CLOSE}
        </CustomButton>
        <div className="flex flex-col z-1 w-full">
          {props.title && (
            <h2 className="m-0 mb-4 text-lg font-bold text-inherit">
              {props.title}
            </h2>
          )}
          {props.children}
        </div>
      </Sidebar>
    </div>
  );
};

export default CustomSideBar;
