import React, { useRef } from "react";
;
import { OverlayPanel } from "primereact/overlaypanel";
import CustomOverlay from "../components/common/CustomOverlay";

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
      {props.cardData ? (
        <>
          <div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          <div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          </div><div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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
          <div
            className={`mt-1.5 flex flex-row max-w-[198px] h-9 border-2 border-[#424245] text-white-100 rounded-xl cursor-pointer font-helvetica ${
              props.bgColor ? `!bg-[#29292A] !text-white-500` : ""
            } text-sm text-white-500`}
            onClick={(e) => op.current.toggle(e)}
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

          <CustomOverlay
            className="w-52 bg-[#29292A] rounded-lg custom-overlay mt-1"
            ref={op}
            
          >
            <div className="h-[135px] text-white-500 p-4">
              <div
                className="text-[15px] font-semibold"
                {...(props.showToolTip ? { title: props.title } : {})}
              >
                {props.title}
              </div>
              <span className=" relative bottom-1.5 max-w-[31px] max-h-[5px] text-[11px]">
                {props.perSecond}
              </span>
              <div className="flex items-center h-12 justify-center gap-2 ">
                <div className=" flex flex-col border  w-[80px] h-full border-[#0EA67C] text-[#0EA67C] rounded-lg">
                  <span className="ml-3 pt-1 text-[10px]">
                    Active
                  </span>
                  <span className="ml-3 relative -top-1 text-xl font-semibold" >51</span>
                  <span></span>
                </div>
                <div className=" flex flex-col border  w-[80px] h-full border-[#F86E6E] text-[#F86E6E] rounded-lg"> <span className="ml-3 pt-1 text-[10px]">
                    Active
                  </span>
                  <span className="ml-3 relative -top-1 text-xl font-semibold" >122</span>
                  <span></span></div>
              </div>
            </div>
          </CustomOverlay>
        </>
      ) : (
        <div className="flex flex-col max-w-[198px]  max-h-9 border border-[#424245] rounded-xl font-helvetica bg-[#29292A] text-sm text-white-500">
          <span className="mx-1 text-ellipsis overflow-hidden text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error!
          </span>
        </div>
      )}
    </>
  );
};

export default WebServerCard;
