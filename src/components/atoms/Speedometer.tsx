import ReactSpeedometer from "react-d3-speedometer";
import { SpeedometerProps } from "../../@types/components/commonTypes";

const Speedometer = (props: SpeedometerProps) => {
  const { containerClassName, ...rest } = props;
  return (
    <div className={containerClassName}>
      <ReactSpeedometer {...rest} />
      {props.showGradient && (
        <svg>
          <defs>
            <linearGradient
              id="gradient-segment-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#C0D774", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#C8995F", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient
              id="gradient-segment-2"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#C8995F", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#D15C4B", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient
              id="gradient-segment-3"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#D15C4B", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#D91E36", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default Speedometer;
