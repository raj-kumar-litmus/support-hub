import { LabelProps } from "../../@types/components/commonTypes";

const ChartLegend = (props: LabelProps) => {
  return (
    <div className={`flex items-center ${props.containerClassName || ""}`}>
      <span
        className={`h-4 w-4 rounded-[50%] inline-block ${
          props.circleColor || ""
        }`}
      ></span>
      <span className="pl-2">{props.text}</span>
    </div>
  );
};

export default ChartLegend;
