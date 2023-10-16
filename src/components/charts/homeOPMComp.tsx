import { useState, useEffect } from "react";
import { HOME_OPM_COMP_CHART } from "../../config/chartConfig";
import { ChartData } from "../../@types/supportHub";
import { fetchData } from "../../utils/fetchUtil";
import { URL_OPM_COMPARISON } from "../../constants/apiConstants";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import CustomImage from "../common/customimage";
import expand from "../../assets/expand.svg";

const HomeOPMComp = () => {
  const [data, setData] = useState<ChartData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOPMCompData() {
      try {
        const response = await fetchData(URL_OPM_COMPARISON, {});
        setData({
          labels: response["opmOne"].map((e) => e.timestamp),
          datasets:
            response &&
            Object.keys(response)?.map((e, index) => ({
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              data: response?.[e].map((e) => Number(e.orderCount)),
              backgroundColor: "transparent",
              label: "No of orders",
              borderColor: index === 0 ? "#BABABA" : "#707070",
              pointStyle: "circle",
              fill: true,
              borderWidth: 2,
            })),
        });
      } catch (error) {
        console.log("Error fetching OPM data: ", error);
      }
    }
    fetchOPMCompData();
  }, []);

  const handleOPMCompExpandClick = () => {
    navigate("/opmcomparison");
  };

  return (
    <>
      {data && (
        <div className="w-full sm:w-1/2 bg-[#F4F4F4] p-4 rounded-lg">
          <div className="flex justify-between mb-3 items-baseline">
            <span className="text-[#757575] font-bold text-lg font-helvetica">
              OPM Comparison
            </span>
            <div>
              <button
                className="rounded-full bg-[#E9E8E8] p-3"
                onClick={handleOPMCompExpandClick}
              >
                <CustomImage src={expand} />
              </button>
            </div>
          </div>
          <Line options={HOME_OPM_COMP_CHART} data={data} />
        </div>
      )}
    </>
  );
};

export default HomeOPMComp;
