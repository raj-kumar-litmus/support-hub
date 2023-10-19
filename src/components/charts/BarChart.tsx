import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Dialog } from "primereact/dialog";
// import { fetchData } from "../../utils/fetchUtil";
// import { URL_SESSIONS } from "../../constants/apiConstants";
import {
  DATE_FORMAT_1,
  DATE_FORMAT_2,
  DATE_FORMAT_3,
  convertTo12HourFormat,
  formatDate,
  formatTime,
} from "../../utils/dateTimeUtil";
import Loader from "../Loader";
import {
  CHANNEL,
  CHANNEL_LIST,
  DATE,
  DD_MM_YYYY,
  DURATION,
  DURATION_LIST,
  FILTERS,
  FROM,
  HH_MM,
  PRIMARY,
  RESET,
  SECONDARY,
  SELECT_CHANNEL,
  SELECT_DURATION,
  SESSIONS,
  SUBMIT,
  TIME,
  TOTAL_ORDERS_PER_MIN,
  TOTAL_SESSIONS_PER_MIN_PRIMARY,
  TOTAL_SESSIONS_PER_MIN_SECONDARY,
} from "../../constants/appConstants";
import { Button } from "primereact/button";
import CustomCalendar from "../common/CustomCalendar";
import CustomDropdown from "../common/CustomDropdown";
import FilterItem from "../common/FilterItem";
import CustomIcon from "../common/CustomIcon";
import { ChartData, SessionData } from "../../@types/BarChart";
import { BAR_CHART_OPTIONS } from "../../config/chartConfig";
import sessionDataJSON from "../../sampleJSON/sessions.json";
import { useLocation, useNavigate } from "react-router-dom";
import CustomImage from "../common/customimage";
import Open_in_full_window from "../../assets/Open_in_full_window.svg";

const BarChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]);
  const [azurePrimaryData, setAzurePrimaryData] = useState<number[]>([]);
  const [azureSecondaryData, setAzureSecondaryData] = useState<number[]>([]);
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
  const [showChart, setShowChart] = useState({
    primary: false,
    secondary: false,
    both: true,
  });
  const [duration, setDuration] = useState<number>(5);
  const [startTime, setStartTime] = useState<string>(null);
  const [startDate, setStartDate] = useState<string>(null);
  // const [startDateTime, setStartDateTime] = useState<string>("");
  const [channel, setChannel] = useState<string>("all");
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [submitCounter, setSubmitCounter] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getSessionData();
  }, [submitCounter]);

  useEffect(() => {
    const labels: string[] = [];
    const azurePrimary: string[] = [];
    const azureSecondary: string[] = [];

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
          label: "Azure Primary",
          data: azurePrimaryData,
          backgroundColor: "#0977FF",
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
          label: "Azure Secondary",
          data: azureSecondaryData,
          backgroundColor: "#5BB1FE",
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
          backgroundColor: "#0977FF",
        },
        {
          label: "Secondary",
          data: azureSecondaryData,
          backgroundColor: "#5BB1FE",
        },
      ],
    };
    setChartData({ ...chartData });
  }, [primaryData, secondaryData]);

  const getSessionData = async () => {
    // const params = {
    //   period: duration,
    //   starttime: startDateTime,
    //   channel: channel,
    // };
    // const data = await fetchData(URL_SESSIONS, params);
    setIsLoading(false);
    // setSessionData(data || []);
    setSessionData(sessionDataJSON);
  };

  const changeStartTime = (value: string) => {
    const formattedTime = formatTime(value);
    setStartTime(value);
    let defaultDate: string = "";
    defaultDate = startDate
      ? formatDate(startDate, DATE_FORMAT_2)
      : `${new Date().toISOString().split("T")[0]}`;
    setStartDateTime(`${defaultDate}T${formattedTime}`);
  };

  const changeStartDate = (value: string) => {
    setStartDate(value);
    const selectedDate = new Date(value);
    let defaultTime: string = "";
    defaultTime = formatTime(startTime ? startTime : new Date());
    setStartDateTime(
      `${formatDate(selectedDate, DATE_FORMAT_2)}T${defaultTime}`
    );
  };

  const getChartConfig = (type: string) => {
    const chartOptions = JSON.parse(JSON.stringify(BAR_CHART_OPTIONS));
    chartOptions.plugins.title.text =
      type === PRIMARY
        ? `${TOTAL_SESSIONS_PER_MIN_PRIMARY}`
        : type === SECONDARY
        ? `${TOTAL_SESSIONS_PER_MIN_SECONDARY}`
        : `${SESSIONS}`;
    chartOptions.plugins.datalabels.rotation = duration > 15 ? 270 : 0;
    return chartOptions;
  };

  const showFilteredChannel = () => {
    const filterApplied = CHANNEL_LIST.find((item) => item.value === channel);
    return filterApplied ? filterApplied.label : "all";
  };

  const resetFilters = () => {
    setStartDate("");
    setStartTime("");
    setDuration(5);
    setChannel("all");
    setSubmitCounter(0);
  };

  const incrementCounter = () => {
    setSubmitCounter(submitCounter + 1);
  };

  const onSubmit = () => {
    incrementCounter();
    if (showFilterPopup) {
      onHide(true);
    }
  };

  const onHide = (submitClicked: boolean) => {
    if (!submitClicked) resetFilters();
    setShowFilterPopup(false);
  };

  const renderFooter = () => {
    return (
      <Button
        id="popup-btn-submit"
        className="p-button-rounded"
        label={SUBMIT}
        onClick={onSubmit}
        autoFocus
      />
    );
  };

  const handleExpandClick = () => {
    navigate("/sessions");
  };

  return (
    <>
      {location?.pathname?.includes("home") && (
        <div className="bg-[#30343B] p-5 mb-4 rounded-lg relative">
          <div className="absolute right-0 top-6 mr-6 pb-4">
            {/* <button onClick={(e) => handleSwitchCharts(e)}>Primary</button>
          <button onClick={(e) => handleSwitchCharts(e)}>Secondary</button>
          <button onClick={(e) => handleSwitchCharts(e)}>Both</button> */}
            <button
              onClick={handleExpandClick}
            >
              <CustomImage src={Open_in_full_window} />
            </button>
          </div>
          {showChart.both && (
            <Bar
              className="sessions"
              options={getChartConfig("both")}
              data={chartData}
            />
          )}
          {showChart.primary && (
            <Bar
              className="sessions"
              options={getChartConfig(PRIMARY)}
              data={primaryData}
            />
          )}
          {showChart.secondary && (
            <Bar
              className="sessions"
              options={getChartConfig(SECONDARY)}
              data={secondaryData}
            />
          )}
        </div>
      )}
      {location?.pathname?.includes("sessions") && (
        <div id="bar-chart" className="m-0 p-5">
          <div className="flex basis-full justify-between pb-4 items-baseline">
            <div className="text-base text-gray-600 font-bold">{SESSIONS}</div>
            <div
              onClick={() => setShowFilterPopup(true)}
              className="flex sm:hidden rounded-full border border-solid border-slate-300 p-2"
            >
              <CustomIcon
                alt="show-filters"
                src="src/assets/filter.svg"
                width="16px"
                height="16px"
              />
            </div>
          </div>

          <div className="basis-full justify-between pb-4 items-center hidden sm:flex">
            <div className="flex justify-start pb-4 items-baseline">
              <div className="flex-col mr-4">
                <CustomDropdown
                  title={DURATION}
                  value={duration}
                  onChange={setDuration}
                  options={DURATION_LIST}
                  optionLabel={"label"}
                  placeholder={SELECT_DURATION}
                  showIcon={true}
                  iconSrc={"src/assets/hourglass.svg"}
                  iconAlt={"duration-icon"}
                />
              </div>
              <div className="flex-col mr-4">
                <CustomCalendar
                  title={TIME}
                  placeholder={HH_MM}
                  value={startTime}
                  onChange={changeStartTime}
                  timeOnly
                  iconPos={"left"}
                  imgalt="time-icon"
                  imgsrc="src/assets/clock.svg"
                />
              </div>
              <div className="flex-col mr-4">
                <CustomCalendar
                  title={DATE}
                  placeholder={DD_MM_YYYY}
                  value={startDate}
                  onChange={changeStartDate}
                  maxDate={new Date()}
                  dateFormat={DATE_FORMAT_3}
                  iconPos={"left"}
                  imgalt="date-icon"
                  imgsrc="src/assets/calendar.svg"
                />
              </div>
              <div className="flex-col mr-4">
                <CustomDropdown
                  title={CHANNEL}
                  value={channel}
                  onChange={setChannel}
                  options={CHANNEL_LIST}
                  optionLabel={"label"}
                  placeholder={SELECT_CHANNEL}
                  showIcon={true}
                  iconSrc={"src/assets/channel.svg"}
                  iconAlt={"channel-icon"}
                />
              </div>
            </div>
            <div className="">
              <Button
                label={SUBMIT}
                id="page-btn-submit"
                className="p-button-rounded"
                onClick={incrementCounter}
              />
            </div>
          </div>
          <div className="flex basis-full flex-wrap text-xl justify-start pb-4 items-baseline">
            <FilterItem
              src="src/assets/hourglass.svg"
              value={`00:${duration.toString().padStart(2, "0")}`}
            />
            {!!startTime && (
              <FilterItem
                src="src/assets/clock.svg"
                value={convertTo12HourFormat(startTime)}
              />
            )}
            {!!startDate && (
              <FilterItem
                src="src/assets/calendar.svg"
                value={formatDate(startDate, DATE_FORMAT_1)}
              />
            )}
            {!!channel && (
              <FilterItem
                src="src/assets/channel.svg"
                value={showFilteredChannel()}
              />
            )}
            <div
              onClick={resetFilters}
              className="text-gray-500 font-normal text-sm cursor-pointer font-semibold"
            >
              {RESET}
            </div>
          </div>
          <div className="flex basis-full p-5 h-64 mb-4 bg-gray-100 drop-shadow-md rounded-xl">
            {isLoading ? (
              <Loader />
            ) : (
              <Bar options={getChartConfig(PRIMARY)} data={primaryData} />
            )}
          </div>
          <div className="flex basis-full p-5 h-64 mb-4 bg-gray-100 drop-shadow-md rounded-xl">
            {isLoading ? (
              <Loader />
            ) : (
              <Bar options={getChartConfig(SECONDARY)} data={secondaryData} />
            )}
          </div>
          <Dialog
            id="modal-section"
            header={FILTERS}
            visible={showFilterPopup}
            footer={renderFooter()}
            onHide={() => onHide(false)}
            blockScroll={true}
            position="bottom"
            draggable={false}
            resizable={false}
            style={{ width: "100vw", margin: 0 }}
          >
            <div className="filter-popup-content">
              <div className="flex mb-8">
                <div className="flex-col mr-4 w-3/6">
                  <CustomCalendar
                    title={FROM}
                    placeholder={DD_MM_YYYY}
                    value={startDate}
                    onChange={changeStartDate}
                    maxDate={new Date()}
                    dateFormat={DATE_FORMAT_3}
                    iconPos={"left"}
                    imgalt="date-icon"
                    imgsrc="src/assets/calendar.svg"
                  />
                </div>
                <div className="flex-col mr-4 w-3/6">
                  <CustomCalendar
                    title={TIME}
                    placeholder={HH_MM}
                    value={startTime}
                    onChange={changeStartTime}
                    timeOnly
                    iconPos={"left"}
                    imgalt="time-icon"
                    imgsrc="src/assets/clock.svg"
                  />
                </div>
              </div>
              <div className="flex mb-8">
                <div className="flex-col mr-4 w-3/6">
                  <CustomDropdown
                    title={DURATION}
                    value={duration}
                    onChange={setDuration}
                    options={DURATION_LIST}
                    optionLabel={"label"}
                    placeholder={SELECT_DURATION}
                    showIcon={false}
                  />
                </div>
                <div className="flex-col mr-4 w-3/6">
                  <CustomDropdown
                    title={CHANNEL}
                    value={channel}
                    onChange={setChannel}
                    options={CHANNEL_LIST}
                    optionLabel={"label"}
                    placeholder={SELECT_CHANNEL}
                    showIcon={false}
                  />
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default BarChart;
