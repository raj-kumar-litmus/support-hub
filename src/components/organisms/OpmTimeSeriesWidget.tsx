import { useEffect, useState } from "react";
import BarChart from "../molecules/BarChart";
import { STACKED_OPM_FOCUSROOM } from "../../helpers/config/chartConfig";
import { URL_FR_OPM_SERIES } from "../../helpers/constants/apiConstants";
import { PAGE_TITLES } from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";

const OpmTimeSeriesWidget = () => {
  const [chartData, setChartData] = useState(null);

  const createDataSets = (responseData) => {
    const labelsArray = responseData?.map((obj) => obj.timeStamp);
    const desktop = responseData?.map((obj) => obj.channelWiseOPM.default || 0);
    const iphoneApp = responseData?.map(
      (obj) => obj.channelWiseOPM["iphoneAppV2.0"] || 0
    );
    // const mobileWeb = responseData?.map(
    //   (obj) => obj.channelWiseOPM["iphoneAppV2.0"] || 0   //mobileweb
    // );
    const android = responseData?.map(
      (obj) => obj.channelWiseOPM.androidNativeApp || 0
    );
    // const csc = responseData?.map(
    //   (obj) => obj.channelWiseOPM.csc || 0    // csc data
    // );
    const others = responseData?.map((obj) => obj.channelWiseOPM.Others || 0);
    const data = {
      labels: labelsArray,
      datasets: [
        {
          label: "Desktop",
          backgroundColor: "#5F4B8B",
          data: desktop,
        },
        {
          label: "iPhone App",
          backgroundColor: "#EC935F",
          data: iphoneApp,
        },
        // {
        //   label: "Web",
        //   backgroundColor: "#A8C696",
        //   data: mobileWeb,
        // },
        {
          label: "Android",
          backgroundColor: "#00A18A",
          data: android,
        },
        // {
        //   label: "CSC",
        //   backgroundColor: "#0279A8",
        //   data: csc,
        // },
        {
          label: "Others",
          backgroundColor: "#6E8A9E",
          data: others,
        },
      ],
    };
    setChartData(data);
  };

  useEffect(() => {
    (async () => {
      try {
        const opmResponse = await fetchFocusRoomData(URL_FR_OPM_SERIES, {});
        createDataSets(opmResponse?.results);
      } catch (err) {
        console.log("Error fetching time series data", err);
      }
    })();
  }, []);

  return (
    <div className="bg-black-106 border border-black-108 rounded-12 h-full relative">
      <div className="font-IBM font-bold text-10 text-white-900 w-fit absolute top-2 left-4">
        {PAGE_TITLES.OPM}
      </div>
      {chartData && (
        <BarChart
          data={chartData}
          options={STACKED_OPM_FOCUSROOM}
          title={PAGE_TITLES.OPM}
          className="bg-black-106 px-4 pt-2 pb-0 rounded-xl h-[30vh]"
          defaultClasses={true}
        />
      )}
    </div>
  );
};
export default OpmTimeSeriesWidget;
