import { OverlayPanel } from "primereact/overlaypanel";
import React, { forwardRef } from "react";
import CustomOverlay from "./CustomOverlay";
import { CustomOverlayProps } from "../../@types/components/commonTypes";

const CustomOverlayFocusRoom = forwardRef<OverlayPanel, CustomOverlayProps>(( props,ref) => {
    return (
      <CustomOverlay
        className="w-52 bg-black-101 max-h-[185px] rounded-lg custom-overlay mt-1"
        ref={ref}
        appendTo={document.body}
      >
        <div className=" text-white-500 p-4">
          {props.header && (
            <div className="text-[15px] font-semibold">{props.header}</div>
          )}
          {props.subHeader && (
            <span className=" relative bottom-1.5 max-w-31 max-h-1.5 text-10">
              {props.subHeader}
            </span>
          )}
          <div className="flex items-center mt-1 mb-4 justify-center gap-2 ">
            {props.box1Content && (
              <div
                className={`flex flex-col border w-20 ${props.box1Class} rounded-lg`}
              >
                <span className="ml-3 pt-1 text-10">{props.box1Header}</span>
                <span className="ml-3 relative -top-1 text-xl font-semibold">
                  {props.box1Content}
                </span>
              </div>
            )}
            {props.box2Content && (
              <div
                className={`flex flex-col border w-20 ${props.box2Class} rounded-lg`}
              >
                <span className="ml-3 pt-1 text-10">{props.box2Header}</span>
                <span className="ml-3 relative -top-1 text-xl font-semibold">
                  {props.box2Content}
                </span>
              </div>
            )}
          </div>

          {props.buttonContent && (
            <div className="flex items-center h-9 justify-center mt-1 text-sm border rounded-full border-white-900">
              <button>{props.buttonContent}</button>
            </div>
          )}
        </div>
      </CustomOverlay>
    );
  }
);

export default CustomOverlayFocusRoom;
