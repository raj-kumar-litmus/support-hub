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
// import { OpmData, Options } from '../@types/todo';
import useScreenSize from "../hooks/useScreenSize";
import RotateIcon from "../assets/rotate.svg";
import CustomImage from "./common/customimage";

interface Props {
  options: ChartOptions<"line"> | any;
  data: ChartData<"line">;
  className?: string;
  title: string;
  isFullScreen?: boolean;
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
}: Props) {
  const [rotate, setRotate] = useState<boolean>(isFullScreen);
  const { width } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();

  const onRotateHandler = () => {
    if (!location.pathname.includes("full-screen")) {
      navigate(`${location.pathname}/full-screen`);
    } else {
      navigate(location.pathname.split("/full-screen")[0]);
    }
    setRotate(!rotate);
  };

  return (
    <div
      className={`${className} ${
        rotate
          ? "rotate-90 w-[600px] h-[390px] w-[844px] bg-inherit ml-[-60vw] mt-[22vh]"
          : "relative ml-[5vw] sm:ml-[1vw] mr-[5vw] sm:mr-[0] md:mr-[0] sm:h-[340px] bg-[#22262C]"
      }`}
    >
      {width < 700 &&
        (location.pathname.includes("opm") ||
          location.pathname.includes("opmcomparison")) && (
          <div className="flex items-center justify-between ml-[20px] mr-[20px] pt-[16px]">
            <p className="text-white">{title}</p>
            <div className="bg-[#383F47] w-[30px] h-[30px] rounded-full">
              <CustomImage
                src={RotateIcon}
                className="relative top-[8px] left-[9px]"
                alt="Filter Icon"
                onClick={onRotateHandler}
              />
            </div>
          </div>
        )}
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
