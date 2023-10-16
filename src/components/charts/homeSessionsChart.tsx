import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { HOME_SESSIONS_CHART } from "../../config/chartConfig";
import { ChartData, SessionData } from "../../@types/BarChart";
import { fetchData } from "../../utils/fetchUtil";
import { URL_SESSIONS } from "../../constants/apiConstants";
import expand from "../../assets/expand.svg";
import CustomImage from "../common/customimage";
import { useNavigate } from "react-router-dom";

const HomeSessionsChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]);
  const [azurePrimaryData, setAzurePrimaryData] = useState<number[]>([]);
  const [azureSecondaryData, setAzureSecondaryData] = useState<number[]>([]);
  const [showChart, setShowChart] = useState({
    primary: false,
    secondary: false,
    both: true,
  });
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [primaryData, setPrimaryData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [secondaryData, setSecondaryData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getSessionData();
  }, []);

  const getSessionData = async () => {
    // const params = {
    //   period: duration,
    //   starttime: startDateTime,
    //   channel: channel,
    // };
    // console.log(params);
    try {
      const data = await fetchData(URL_SESSIONS, {});
      setIsLoading(false);
      setSessionData(data || []);
    } catch (error) {}
    // setSessionData(sessionDataJSON);
  };

  useEffect(() => {
    const labels: string[] = [];
    const azurePrimary: number[] = [];
    const azureSecondary: number[] = [];

    sessionData.forEach((item) => {
      labels.push(item.timestamp);
      azurePrimary.push(parseInt(item.azureDCSessionsCount));
      azureSecondary.push(parseInt(item.qtsDCSessionsCount));
    });

    setXAxisLabels([...labels]);
    setAzurePrimaryData([...azurePrimary]);
    setAzureSecondaryData([...azureSecondary]);
  }, [sessionData]);

  useEffect(() => {
    const chartData: ChartData = {
      labels: xAxisLabels,
      datasets: [
        {
          label: "Primary",
          data: azurePrimaryData,
          backgroundColor: "#757575",
        },
      ],
    };
    setPrimaryData({ ...chartData });
  }, [xAxisLabels, azurePrimaryData]);

  useEffect(() => {
    const chartData: ChartData = {
      labels: xAxisLabels,
      datasets: [
        {
          label: "Secondary",
          data: azureSecondaryData,
          backgroundColor: "#BABABA",
        },
      ],
    };
    setSecondaryData({ ...chartData });
  }, [xAxisLabels, azureSecondaryData]);

  useEffect(() => {
    const chartData: ChartData = {
      labels: xAxisLabels,
      datasets: [
        {
          label: "Primary",
          data: azurePrimaryData,
          backgroundColor: "#757575",
        },
        {
          label: "Secondary",
          data: azureSecondaryData,
          backgroundColor: "#BABABA",
        },
      ],
    };
    setChartData({ ...chartData });
  }, [primaryData, secondaryData]);

  const handleExpandClick = () => {
    navigate("/sessions");
  };

  // const handleSwitchCharts = (e) => {
  //   console.log("event: ", e);
  //   if (e.target.textContent == "Primary") {
  //     setShowChart({ ...showChart, primary: true });
  //   } else if (e.target.textContent == "Secondary") {
  //     setShowChart({ ...showChart, secondary: true });
  //   } else if (e.target.textContent == "Both") {
  //     setShowChart({ ...showChart, both: true });
  //   }
  // };

  return (
    <div className="p-5 mb-4 mt-4 bg-gray-100 rounded-xl">
      <div className="flex justify-between mb-3 items-baseline">
        <span className="text-[#757575] font-bold text-lg font-helvetica">
          Sessions
        </span>
        <div>
          {/* <button onClick={(e) => handleSwitchCharts(e)}>Primary</button>
          <button onClick={(e) => handleSwitchCharts(e)}>Secondary</button>
          <button onClick={(e) => handleSwitchCharts(e)}>Both</button> */}
          <button
            className="rounded-full bg-[#E9E8E8] p-3"
            onClick={handleExpandClick}
          >
            <CustomImage src={expand} />
          </button>
        </div>
      </div>
      {showChart.both && (
        <Bar
          className="sessions"
          options={HOME_SESSIONS_CHART}
          data={chartData}
        />
      )}
      {showChart.primary && (
        <Bar
          className="sessions"
          options={HOME_SESSIONS_CHART}
          data={primaryData}
        />
      )}
      {showChart.secondary && (
        <Bar
          className="sessions"
          options={HOME_SESSIONS_CHART}
          data={secondaryData}
        />
      )}
    </div>
  );
};

export default HomeSessionsChart;
