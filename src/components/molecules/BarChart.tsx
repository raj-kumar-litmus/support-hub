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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import CustomImage from "../atoms/CustomImage";
import RotateIcon from "../../assets/rotate.svg";
import { SCREEN_WIDTH } from "../../helpers/constants/appConstants";
import { ROUTES, increaseLegendSpacing } from "../../helpers/utils/utils";
import { BarChartCompProps } from "../../@types/components/commonTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const BarChart = (props: BarChartCompProps) => {
  const [rotate, setRotate] = useState<boolean>(props.isFullScreen);
  const { width } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();

  const onRotateHandler = () => {
    if (!location.pathname.includes(ROUTES.fullScreen)) {
      navigate(`${location.pathname}${ROUTES.fullScreen}`);
    } else {
      navigate(location.pathname.split(`${ROUTES.fullScreen}`)[0]);
    }
    setRotate(!rotate);
  };

  return (
    <div
      className={`${props.className} ${
        !props.defaultClasses && "bg-black-200"
      }`}
    >
      {width < SCREEN_WIDTH.SM && location.pathname.includes(ROUTES.opm) && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-white-500">{props.title}</p>
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
      {props.plugins || width < SCREEN_WIDTH.SM ? (
        <Bar
          options={props.options}
          data={props.data}
          plugins={increaseLegendSpacing(20)}
        />
      ) : (
        <Bar options={props.options} data={props.data} plugins={props.plugin} />
      )}
    </div>
  );
};

export default BarChart;
