import { kAndMilFormatter,numberWithCommas } from "../../helpers/utils/utils";
import { LinearGaugeProps } from "../../@types/components/commonTypes";

const LinearGauge = (props: LinearGaugeProps) => {
  const total = Number(props.propOne) + Number(props.propTwo);
  const widthPropOne =
    total === 0 ? 50 : Math.round((Number(props.propOne) / total) * 100);
  const widthPropTwo =
    total === 0 ? 50 : Math.round((Number(props.propTwo) / total) * 100);
  return (
    <div
      className={`flex ${props.containerClassName}`}
    >
      <span
        className={`flex items-center justify-center rounded-l-3xl w-[${widthPropOne}%] border-solid border-r-4 border-black-101 h-[${props.height}] ${props.bgColorOne}`}
        title={`${numberWithCommas(props.propOne) }`}
      >
        {props.formatter ? kAndMilFormatter(props.propOne,true,props?.noDecimal) : props.propOne}
      </span>
      <span
        className={`flex items-center justify-center rounded-r-3xl w-[${widthPropTwo}%] h-[${props.height}] ${props.bgColorTwo}`}
        title={`${numberWithCommas(props.propTwo) }`}
      >
        {props.formatter ? kAndMilFormatter(props.propTwo,true,props?.noDecimal) : props.propTwo}
      </span>
    </div>
  );
};

export default LinearGauge;