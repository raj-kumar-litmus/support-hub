import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import useScreenSize from "../hooks/useScreenSize";
import RotateIcon from "../assets/rotate.svg";
import CustomImage from "./common/customimage";

interface Props {
  options: ChartOptions<"line"> | any;
  data: ChartData<"line">;
  className?: string;
  title: string;
  isFullScreen?: boolean;
  defaultClasses?: boolean;
  plugins?: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart({
  title,
  options,
  data,
  className,
  isFullScreen = false,
  defaultClasses,
  plugins,
}: Props) {
  const [rotate, setRotate] = useState<boolean>(isFullScreen);
  const { width } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();

  const onRotateHandler = () => {
    if (!location.pathname.includes("fullscreen")) {
      navigate(`${location.pathname}/fullscreen`);
    } else {
      navigate(location.pathname.split("/fullscreen")[0]);
    }
    setRotate(!rotate);
  };

  return (
    <div
      className={`${className} ${
        !defaultClasses &&
        (rotate
          ? "rotate-90  !h-[85vw] w-[100vh] bg-inherit !mt-[23vh] ml-[-65vw]"
          : "relative md:l-[5vw] md:mr-[5vw] sm:mr-[0] sm:h-[45vh] bg-black-200 ml-[0] lg:pb-[0] lg:py-[3vh] sm:w-[68vw] md:w-[67vw] lg:w-[71.5vw] sm:ml-[1.25vw] lg:ml-[1.1vw] lg:mr-[0]")
      }`}
    >
      {width < 640 &&
        (location.pathname.includes("opm") ||
          location.pathname.includes("opmcomparison")) && (
          <div
            className={`flex items-center justify-between pt-[16px] ${
              rotate ? "mx-0" : " ml-[2vw] mr-[20px]"
            }`}
          >
            <p
              className={`text-white-500 ${rotate ? "ml-[1.5vw]" : ""} ${
                width > 640 ? "ml-[1vw]" : ""
              }`}
            >
              {title}
            </p>
            <div className="flex items-center">
              <div
                className={`bg-black-400 w-[30px] h-[30px] rounded-full relative ${
                  rotate ? "left-[3vw]" : "left-[2vw]"
                }`}
              >
                <CustomImage
                  src={RotateIcon}
                  className="relative top-[8px] left-[9px]"
                  alt="Filter Icon"
                  onClick={onRotateHandler}
                />
              </div>
            </div>
          </div>
        )}
      {plugins || width < 640 ? (
        <Line
          options={options}
          data={data}
          plugins={[
            {
              id: "increase-legend-spacing",
              beforeInit(chart) {
                const originalFit = (chart.legend as any).fit;
                (chart.legend as any).fit = function fit() {
                  originalFit.bind(chart.legend)();
                  this.height += 20;
                };
              },
            },
          ]}
        />
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
}

export default LineChart;
