import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef } from "react";
import CustomOverlayFocusRoom from "./common/OverlayFocusRoom";
import { ApiWebServerCard } from "../@types/components/commonTypes";

const WebServerCard: React.FC<ApiWebServerCard> = (props) => {
  const op = useRef<OverlayPanel>(null);
  const renderPerTotal = () => {
    if (props.perTotal) {
      const [numerator, denominator] = props.perTotal.split("/");
      return (
        <>
          <span className="text-xl align-middle text-green-500 mr-0.5">
            {numerator}
          </span>
          <span className="text-sm text-red-500">/{denominator}</span>
        </>
      );
    }
    return null;
  };
  return (
    <>
      <div
        className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-black-103 text-white-100 rounded-xl cursor-pointer font-helvetica !bg-black-101 
         text-sm text-white-500`}
        onClick={(e) => {
          op.current?.toggle(e);
        }}
      >
        <div className="pl-3 mt-0.5 w-65pr h-9">
          <div className="w-20 text-10 text-ellipsis overflow-x-hidden whitespace-nowrap uppercase">
            {props.title}
          </div>
          <span className=" relative bottom-2.5 max-w-31 max-h-1.5 text-[8px]">
            {props.perSecond}
          </span>
        </div>
        <div className="m-auto mr-5">{renderPerTotal()}</div>
      </div>
      {props.showToolTip && <CustomOverlayFocusRoom {...props} ref={op} />}
    </>
  );
};

export default WebServerCard;
