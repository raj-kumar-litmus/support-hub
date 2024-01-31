import { useEffect, useState } from "react";
import { STACKED_OPM_FOCUSROOM } from "../../helpers/config/chartConfig";
import { URL_FR_OPM_SERIES } from "../../helpers/constants/apiConstants";
import {
  CHANNELWISE_DATA_LABELS,
  PAGE_TITLES,
  TIME_INTERVAL,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import Loader from "../atoms/Loader";
import BarChart from "../molecules/BarChart";

const OpmTimeSeriesWidget = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createDataSets = (responseData) => {
    const labelsArray = responseData?.map((obj) => obj.timeStamp);
    const desktop = responseData?.map((obj) => obj.channelWiseOPM.default || 0);
    const iphoneApp = responseData?.map(
      (obj) => obj.channelWiseOPM["iphoneAppV2.0"] || 0
    );
    const mobileWeb = responseData?.map(
      (obj) => obj.channelWiseOPM.mobileWeb || 0
    );
    const android = responseData?.map(
      (obj) => obj.channelWiseOPM.androidNativeApp || 0
    );
    const csc = responseData?.map(
      (obj) => obj.channelWiseOPM.contactCenter || 0
    );
    const others = responseData?.map((obj) => obj.channelWiseOPM.Others || 0);
    const data = {
      labels: labelsArray,
      datasets: [
        {
          label: CHANNELWISE_DATA_LABELS.DESKTOP,
          backgroundColor: "#5F4B8B",
          data: desktop,
        },
        {
          label: CHANNELWISE_DATA_LABELS.IPHONE,
          backgroundColor: "#EC935F",
          data: iphoneApp,
        },
        {
          label: CHANNELWISE_DATA_LABELS.WEB,
          backgroundColor: "#A8C696",
          data: mobileWeb,
        },
        {
          label: CHANNELWISE_DATA_LABELS.ANDROID,
          backgroundColor: "#00A18A",
          data: android,
        },
        {
          label: CHANNELWISE_DATA_LABELS.CSC,
          backgroundColor: "#0279A8",
          data: csc,
        },
        {
          label: CHANNELWISE_DATA_LABELS.OTHERS,
          backgroundColor: "#6E8A9E",
          data: others,
        },
      ],
    };
    setChartData(data);
  };

  const fetchTimeSeriesData = async () => {
    try {
      setIsLoading(true);
      const opmResponse = await fetchFocusRoomData(URL_FR_OPM_SERIES, {});
      createDataSets(opmResponse?.results);
    } catch (err) {
      console.log("Error fetching time series data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSeriesData();
    const intervalId = setInterval(() => {
      fetchTimeSeriesData();
    }, TIME_INTERVAL.ONE_MIN);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-black-106 border border-black-108 rounded-12 h-full relative">
      {chartData && !isLoading && (
        <>
          <div className="font-IBM font-bold text-10 text-white-900 w-fit absolute top-2 left-4">
            {PAGE_TITLES.OPM}
          </div>
          <BarChart
            data={chartData}
            options={STACKED_OPM_FOCUSROOM}
            title={PAGE_TITLES.OPM}
            className="bg-black-106 px-4 pt-2 pb-0 rounded-xl h-30h"
            defaultClasses={true}
          />
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
export default OpmTimeSeriesWidget;
