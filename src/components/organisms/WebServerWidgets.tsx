import { FOCUS_ROOM_LABELS } from "../../helpers/constants/appConstants";
import Speedometer from "../atoms/Speedometer";

interface WebServerWidgetsProps {
  title: string;
  totalServers: number;
  errorServers: number;
}
const WebServerWidgets = (props: WebServerWidgetsProps) => {
  return (
    <div className="bg-black-106 border border-black-108 text-white-900 relative h-fit rounded-12 h-full pb-2">
      <div className="grid-table-header text-10 font-IBM text-white-900 uppercase font-bold pt-1 px-4">
        {props.title}
      </div>
      <div className="font-IBM w-fit absolute top-10 left-10 text-center">
        <div className="text-pink-200 text-6 leading-8p">
          {FOCUS_ROOM_LABELS.ERRORS}
        </div>
        <div className="text-xs text-white-900">{props.errorServers}</div>
      </div>
      <div className="flex items-center">
        <Speedometer
          width={100}
          height={55}
          ringWidth={5}
          maxValue={props.totalServers}
          needleColor="transparent"
          textColor="transparent"
          customSegmentStops={[0, props.errorServers, props.totalServers]}
          segmentColors={["#CB5D5E", "#3E4249"]}
          containerClassName="guage-chart"
        />
        <div className="vertical-line"></div>
        <div className="font-IBM text-white-900 ml-4">
          <div className="text-8 leading-5">
            {FOCUS_ROOM_LABELS.TOTAL_SERVERS}
          </div>
          <div>{props.totalServers}</div>
        </div>
      </div>
    </div>
  );
};

export default WebServerWidgets;
