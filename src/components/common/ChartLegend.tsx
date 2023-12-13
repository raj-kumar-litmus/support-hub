import { LabelProps } from "../../@types/components/commonTypes";

const ChartLegend = (props: LabelProps) => {
  return (
    <div className={`flex items-center ${props.containerClassName}`}>
      <span
        className={`h-[15px] w-[15px] rounded-[50%] inline-block ${props.circleColor}`}
      ></span>
      <span className="pl-2">{props.text}</span>
    </div>
  );
};

export default ChartLegend;
