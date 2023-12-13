import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import CustomOverlayFocusRoom from "./common/OverlayFocusRoom";

export interface ApiWebServerCard {
  title?: string;
  perSecond?: string;
  perTotal?: string;
  cardData?: boolean;
  bgColor?: boolean;
  showToolTip?: boolean;
}

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
        className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica
          !bg-[#29292A] 
         text-sm text-white-500`}
        onClick={(e) => {op.current?.toggle(e); console.log("click");
        
        }}
      >
        <div className="pl-3 mt-0.5 w-[65%] h-9">
          <div
            className="w-[81px] text-[10px] text-ellipsis overflow-x-hidden whitespace-nowrap uppercase"
            {...(props.showToolTip ? { title: props.title } : {})}
          >
            {props.title}
          </div>
          <span className=" relative bottom-2.5 max-w-[31px] max-h-[5px] text-[8px]">
            {props.perSecond}
          </span>
        </div>
        <div className="m-auto mr-5">{renderPerTotal()}</div>
      </div>
       {props.showToolTip && <CustomOverlayFocusRoom {...props}  ref={op} />}
     
    </>
  );
};

export default WebServerCard;
