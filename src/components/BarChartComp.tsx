import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import RotateIcon from "../assets/rotate.svg";
import CustomImage from "./common/customimage";
import { SCREEN_WIDTH } from "../constants/appConstants";
import { increaseLegendSpacing } from "./utils/Utils";

interface Props {
  options: ChartOptions<"bar"> | any;
  data: ChartData<"bar">;
  className?: string;
  defaultClasses?: boolean;
  title: string;
  isFullScreen?: boolean;
  plugins?: boolean;
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
  defaultClasses,
  isFullScreen = false,
  plugins,
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
    <div className={`${className} ${!defaultClasses && "bg-black-200"}`}>
      {width < SCREEN_WIDTH.SM && location.pathname.includes("opm") && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-white-500">{title}</p>
          <div className="flex items-center">
            <div className={`bg-black-400 rounded-full relative p-2`}>
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
      {plugins || width < SCREEN_WIDTH.SM ? (
        <Bar
          options={options}
          data={data}
          plugins={increaseLegendSpacing(20)}
        />
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};

export default BarChartComp;
