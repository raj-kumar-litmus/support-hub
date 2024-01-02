import ReactSpeedometer from "react-d3-speedometer";
import { SpeedometerProps } from "../../@types/components/commonTypes";

const Speedometer = (props: SpeedometerProps) => {
  const { containerClassName, ...rest } = props;
  return (
    <div className={containerClassName}>
      <ReactSpeedometer {...rest} />
    </div>
  );
};

export default Speedometer;
