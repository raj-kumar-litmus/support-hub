import { OverlayPanel } from "primereact/overlaypanel";
import { forwardRef } from "react";
import CustomOverlay from "../atoms/CustomOverlay";
import { CustomOverlayProps } from "../../@types/components/commonTypes";
import { getSeverityStyles } from "../../helpers/utils/utils";

const CustomOverlayFocusRoom = forwardRef<OverlayPanel, CustomOverlayProps>(
  function OverLay(props, ref) {
    const { boxClass = "", columns = 1 } = props;
    const colWidth = `grid-cols-${columns}`;
    return (
      <CustomOverlay
        className={`bg-black-108 rounded-10 custom-overlay my-1 ${
          columns == 3
            ? "w-[17.37rem]"
            : columns == 2
            ? "w-[12.25rem]"
            : "w-[12.12rem]"
        }`}
        ref={ref}
        appendTo={document.body}
      >
        <div className=" text-white-900 p-4">
          {props.header && (
            <div className="text-sm font-semibold capitalize">
              {props.header}
            </div>
          )}
          {props.subHeader && (
            <span className=" relative bottom-1.5 text-10">
              {props.subHeader}
            </span>
          )}
          {props.boxContent && (
            <div
              className={`grid ${colWidth} items-center justify-center gap-2 mt-2`}
            >
              {props.boxContent?.map((boxContent, index) => (
                <div
                  className={`flex flex-col border border-black-107 w-20 px-2 py-1 ${boxClass} ${
                    boxContent.boxClass
                  } rounded-md 
                ${
                  boxContent.severity
                    ? getSeverityStyles(boxContent.severity).border
                    : ""
                }`}
                  key={index}
                >
                  <span className="text-8 font-proximaNova mb-1">
                    {boxContent.title}
                  </span>
                  <span className="relative -top-1 text-sm font-IBM font-semibold">
                    {boxContent.data ? boxContent.data : "-"}
                  </span>
                </div>
              ))}
            </div>
          )}
          {props.buttonContent && (
            <div className="flex items-center h-9 justify-center text-xs rounded-full bg-gray-109 mt-2">
              <button>{props.buttonContent}</button>
            </div>
          )}
          {props.children}
        </div>
      </CustomOverlay>
    );
  },
);

export default CustomOverlayFocusRoom;
