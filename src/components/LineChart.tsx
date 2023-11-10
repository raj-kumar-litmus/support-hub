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
import { Bar, Line } from "react-chartjs-2";
// import { OpmData, Options } from '../@types/todo';
import useScreenSize from "../hooks/useScreenSize";
import RotateIcon from "../assets/rotate.svg";
import CustomImage from "./common/customimage";
import CustomTab from "./common/customtab";
import { CHART_TABS } from "../constants/appConstants";
import { OPM_BAR_CHART_OPTIONS } from "../config/chartConfig";

interface Props {
  options: ChartOptions<"line"> | any;
  data: ChartData<"line">;
  barChartData: ChartData<"bar">;
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
  barChartData,
  className,
  isFullScreen = false,
}: Props) {
  const [rotate, setRotate] = useState<boolean>(isFullScreen);
  const [tabValue, setTabValue] = useState<number>(1);
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
          ? "rotate-90 h-[390px] w-[90vh] bg-inherit ml-[-50vw] mt-[22vh]"
          : "relative ml-[5vw] sm:ml-[1rem] mr-[5vw] sm:mr-[0] md:mr-[0] sm:h-[340px] bg-[#22262C]"
      }`}
    >
      {width < 700 &&
        (location.pathname.includes("opm") ||
          location.pathname.includes("opmcomparison")) && (
          <div className="flex items-center justify-between ml-[20px] mr-[20px] pt-[16px]">
            <p className="text-white">{title}</p>
            <div className="flex items-center">
              <CustomTab
                className="opm-tabs mr-4"
                tabData={CHART_TABS}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
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
      {tabValue === 1 ? (
        <Line options={options} data={data} />
      ) : (
        <Bar
          options={OPM_BAR_CHART_OPTIONS}
          data={barChartData}
          className="!h-[18rem] p-4 pt-0"
        />
      )}
    </div>
  );
}

export default LineChart;
