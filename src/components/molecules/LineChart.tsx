import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import CustomImage from "../atoms/customimage";
import RotateIcon from "../../assets/rotate.svg";
import { SCREEN_WIDTH } from "../../helpers/constants/appConstants";
import { LineChartProps } from "../../@types/components/commonTypes";
import { ROUTES, increaseLegendSpacing } from "../../helpers/utils/Utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart(props: LineChartProps) {
  const { isFullScreen = false } = props;
  const [rotate, setRotate] = useState<boolean>(isFullScreen);
  const { width } = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();

  const onRotateHandler = () => {
    if (!location.pathname.includes(ROUTES.fullScreen)) {
      navigate(`${location.pathname}${ROUTES.fullScreen}`);
    } else {
      navigate(location.pathname.split(ROUTES.fullScreen)[0]);
    }
    setRotate(!rotate);
  };

  return (
    <div
      className={`${props.className} ${
        !props.defaultClasses && "bg-black-200"
      }`}
    >
      {width < SCREEN_WIDTH.SM &&
        (location.pathname.includes(ROUTES.opm) ||
          location.pathname.includes(ROUTES.opmComparison)) && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-white-500">{props.title}</p>
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
      {props.plugins || width < SCREEN_WIDTH.SM ? (
        <Line
          options={props.options}
          data={props.data}
          plugins={increaseLegendSpacing(20)}
        />
      ) : (
        <Line options={props.options} data={props.data} />
      )}
    </div>
  );
}

export default LineChart;
