import React, { forwardRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import CustomOverlay from "./CustomOverlay";
import { CustomOverlayProps } from "../../@types/components/commonTypes";

const CustomOverlayFocusRoom = forwardRef<OverlayPanel, CustomOverlayProps>(( props,ref) => {
    return (
      <CustomOverlay
        className="w-52 bg-[#29292A] max-h-[185px] rounded-lg custom-overlay mt-1"
        ref={ref}
        appendTo={document.body}
      >
        <div className=" text-white-500 p-4">
          {props.header && (
            <div className="text-[15px] font-semibold">{props.header}</div>
          )}
          {props.subHeader && (
            <span className=" relative bottom-1.5 max-w-[31px] max-h-[5px] text-[11px]">
              {props.subHeader}
            </span>
          )}
          <div className="flex items-center mt-1 mb-4 justify-center gap-2 ">
            {props.box1Content && (
              <div
                className={`flex flex-col border w-[80px] ${props.box1Class} rounded-lg`}
              >
                <span className="ml-3 pt-1 text-[10px]">{props.box1Header}</span>
                <span className="ml-3 relative -top-1 text-xl font-semibold">
                  {props.box1Content}
                </span>
              </div>
            )}
            {props.box2Content && (
              <div
                className={`flex flex-col border w-[80px] ${props.box2Class} rounded-lg`}
              >
                <span className="ml-3 pt-1 text-[10px]">{props.box2Header}</span>
                <span className="ml-3 relative -top-1 text-xl font-semibold">
                  {props.box2Content}
                </span>
              </div>
            )}
          </div>

          {props.buttonContent && (
            <div className="flex items-center h-[34px] justify-center mt-1 text-sm border-[1px] rounded-full border-[#FBFBFC]">
              <button>{props.buttonContent}</button>
            </div>
          )}
        </div>
      </CustomOverlay>
    );
  }
);

export default CustomOverlayFocusRoom;
