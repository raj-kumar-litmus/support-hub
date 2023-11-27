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
    <div className={`${className} ${!defaultClasses && "bg-black-200"}`}>
      {width < 640 &&
        (location.pathname.includes("opm") ||
          location.pathname.includes("opmcomparison")) && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-white-500">{title}</p>
            <div className="flex items-center">
              <div className="bg-black-400 rounded-full relative p-2">
                <CustomImage
                  src={RotateIcon}
                  className="relative"
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
