import { useState, useEffect } from "react";
import { HOME_OPM_CHART } from "../../config/chartConfig";
import { ChartData } from "../../@types/supportHub";
import { fetchData } from "../../utils/fetchUtil";
import { URL_OPM } from "../../constants/apiConstants";
import { Line } from "react-chartjs-2";
import CustomImage from "../common/customimage";
import expand from "../../assets/expand.svg";
import { useNavigate } from "react-router-dom";

const HomeOPMComp = () => {
  const [data, setData] = useState<ChartData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOPMData() {
      try {
        const response = await fetchData(URL_OPM, {});
        setData({
          labels: response.map((e) => e.timestamp),
          datasets: [
            {
              label: "No of orders",
              data: response.map((e) => Number(e.orderCount)),
              borderColor: "rgb(117, 117, 117)",
              // backgroundColor: gradient,
              pointStyle: "circle",
              fill: true,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching OPM data: ", error);
      }
    }
    fetchOPMData();
  }, []);

  const handleOPMExpandClick = () => {
    navigate('/opm')
  };

  return (
    <>
      {data && (
        <div className="w-full sm:w-1/2 bg-[#F4F4F4] p-4 rounded-lg">
          <div className="flex justify-between mb-3 items-baseline">
            <span className="text-[#757575] font-bold text-lg font-helvetica">
              OPM
            </span>
            <div>
              <button
                className="rounded-full bg-[#E9E8E8] p-3"
                onClick={handleOPMExpandClick}
              >
                <CustomImage src={expand} />
              </button>
            </div>
          </div>
          <Line options={HOME_OPM_CHART} data={data} />
        </div>
      )}
    </>
  );
};

export default HomeOPMComp;
