import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import useScreenSize from "../hooks/useScreenSize";
import RotateIcon from "../assets/rotate.svg";
import CustomImage from "./common/customimage";

interface Props {
  options: ChartOptions<"bar"> | any;
  data: ChartData<"bar">;
  className?: string;
  title: string;
  isFullScreen?: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChartComp = ({
  title,
  options,
  data,
  className,
  isFullScreen = false,
}: Props) => {
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
        rotate
          ? "h-[390px] w-[90vh] bg-inherit"
          : "relative ml-[5vw] sm:ml-[1rem] mr-[5vw] sm:mr-[0] sm:h-[340px] bg-[#22262C]"
      }`}
    >
      {width < 700 && location.pathname.includes("opm") && (
        <div className="flex items-center justify-between pt-[16px]">
          <p className="text-white">{title}</p>
          <div className="flex items-center">
            <div className="bg-[#383F47] w-[30px] h-[30px] rounded-full">
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
      {
        <Bar
          options={options}
          data={data}
          className={`${
            location.pathname.includes("home")
              ? "w-full !h-[24rem] pt-20 sm:pt-16 sm:px-6 px-6"
              : `${rotate ? "!h-[20rem]" : "!h-[21rem]"} sm:!h-[20rem] pt-8`
          }`}
        />
      }
    </div>
  );
};

export default BarChartComp;
