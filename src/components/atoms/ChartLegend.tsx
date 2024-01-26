import { LabelProps } from "../../@types/components/commonTypes";

const ChartLegend = (props: LabelProps) => {
  return (
    <div className={`flex items-center text-xs ${props.containerClassName || ""}`}>
      <span
        className={`h-2 w-2 rounded-full inline-block ${
          props.circleColor || ""
        }`}
      ></span>
      <span className="pl-1 ">{props.text}</span>
    </div>
  );
};

export default ChartLegend;
