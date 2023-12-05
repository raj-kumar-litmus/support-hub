import { Sidebar } from "primereact/sidebar";
import { CustomSideBarProps } from "../../@types/components/commonTypes";
import CustomButton from "../Button";

const CustomSideBar = (props: CustomSideBarProps) => {
  const getCloseBtnLayoutClasses = () => {
    switch (props.position) {
      case "right":
        return `rotate-180 right-50w`;
      case "left":
        return `left-50w`;
      default:
        return `rotate-180 right-50w`;
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
        }`}
        showCloseIcon={false}
      >
        <CustomButton
          className={`custom-sidebar-close-btn ${getCloseBtnLayoutClasses()}`}
          onClick={() => props.setVisible(false)}
        >
          Close
        </CustomButton>
        <div className="flex flex-col">
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
