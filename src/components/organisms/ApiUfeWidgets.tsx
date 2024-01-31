import { useEffect, useState } from "react";
import CustomImage from "../atoms/CustomImage";
import Speedometer from "../atoms/Speedometer";
import expandIcon from "../../assets/expand.svg";
import { WebServerWidgetsProps } from "../../@types/pages/focusRoom";
import {
  FOCUS_ROOM_LABELS,
  SEVERITY,
} from "../../helpers/constants/appConstants";

const ApiUfeWidgets = (props: WebServerWidgetsProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-between items-end mb-[0.8vh]">
        <div className="grid-table-header text-10 font-IBM text-white-900 uppercase font-bold pt-1 px-4 relative top-0.5">
          {props.title}
        </div>
        {hover && (
          <CustomImage
            src={expandIcon}
            className="mt-[1vh] mx-[1vw] cursor-pointer"
          />
        )}
      </div>
      <div className="font-IBM w-fit absolute top-12 left-10 text-center">
        <div className="text-pink-200 text-6 leading-6p">
          {FOCUS_ROOM_LABELS.ERRORS}
        </div>
        <div className="text-xs text-white-900">{props.errorServers}</div>
      </div>
      <div className="flex items-center">
        <Speedometer
          width={100}
          height={50}
          ringWidth={5}
          maxValue={props?.totalServers}
          needleColor="transparent"
          textColor="transparent"
          customSegmentStops={[0, props?.errorServers, props?.totalServers]}
          segmentColors={["#CB5D5E", "#3E4249"]}
          containerClassName="guage-chart"
        />
        <div className="vertical-line"></div>
        <div className="font-IBM text-white-900 ml-4 xl:ml-6">
          <div className="text-8 xl:leading-5">
            {FOCUS_ROOM_LABELS.TOTAL_SERVERS}
          </div>
          <div>{props.totalServers}</div>
        </div>
      </div>
    </div>
  );
};

export default ApiUfeWidgets;
