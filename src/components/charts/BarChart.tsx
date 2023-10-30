import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Dialog } from "primereact/dialog";
import { fetchData } from "../../utils/fetchUtil";
import { URL_SESSIONS } from "../../constants/apiConstants";
import {
  DATE_FORMAT_2,
  DATE_FORMAT_3,
  formatDate,
  getLocaleTime,
} from "../../utils/dateTimeUtil";
import {
  CHANNEL,
  CHANNEL_LIST,
  DATE,
  DD_MM_YYYY,
  DEFAULT_PERIOD,
  DURATION,
  DURATION_LIST,
  FILTERS,
  HH_MM,
  RESET,
  SESSIONS,
  SUBMIT,
  TIME,
  TOTAL_SESSIONS_PER_MINUTE,
} from "../../constants/appConstants";
import { Button } from "primereact/button";
import CustomCalendar from "../common/CustomCalendar";
import CustomDropdown from "../common/CustomDropdown";
import CustomIcon from "../common/CustomIcon";
import { ChartData, SessionData } from "../../@types/BarChart";
import { BAR_CHART_OPTIONS } from "../../config/chartConfig";
// import { sessionDataJSON } from "../../sampleJSON/sessions";
import FilterIcon from "../../assets/filter-dark.svg";
import ClockIcon from "../../assets/clock.svg";
import CalendarIcon from "../../assets/white_calendar.svg";
import ChannelIcon from "../../assets/channel.svg";
import SandGlassIcon from "../../assets/sandglass.svg";
import FilteredCard from "../FilteredCard";
import useScreenSize from "../../hooks/useScreenSize";
import Loader from "../loader";

const BarChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]);
  const [azurePrimaryData, setAzurePrimaryData] = useState<number[]>([]);
  const [azureSecondaryData, setAzureSecondaryData] = useState<number[]>([]);
  const [allData, setAllData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [submitCounter, setSubmitCounter] = useState<number>(0);
  // const [chartSwitchChecked, setChartSwitchChecked] = useState<boolean>(false);
  // const [displayBar, setDisplayBar] = useState<string>(SECONDARY);
  const [formFields, setFormFields] = useState([
    {
      type: "dropdown",
      name: "period",
      title: DURATION,
      value: "",
      iconSrc: SandGlassIcon,
      options: DURATION_LIST,
    },
    {
      type: "calendar",
      name: "date",
      title: DATE,
      value: "",
      imgsrc: CalendarIcon,
    },
    {
      type: "calendar",
      name: "time",
      title: TIME,
      value: "",
      imgsrc: ClockIcon,
    },
    {
      type: "dropdown",
      name: "channel",
      title: CHANNEL,
      value: "",
      iconSrc: ChannelIcon,
      options: CHANNEL_LIST,
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const { width } = useScreenSize();
  const chartRef = useRef(null);

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
    setAllData({ ...chartData });
  }, [xAxisLabels]);

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  const getSessionData = async () => {
    const params = {
      period: DEFAULT_PERIOD,
      starttime: "",
      channel: "",
    };
    if (!disabled) {
      let dateString: string = "";
      let timeString: string = "";
      formFields.forEach((e: any) => {
        if (e.value) {
          switch (e.name) {
            case "period":
            case "channel":
              params[e.name] = e.value;
              break;
            case "date":
              dateString = formatDate(e.value, DATE_FORMAT_2);
              break;
            case "time":
              timeString = getLocaleTime(e.value, false);
              break;
            default:
              break;
          }
        }
      });
      let startTimeStr: string = "";
      if (dateString === "" && timeString === "") {
        startTimeStr = "";
      } else {
        if (dateString === "")
          dateString = formatDate(new Date(), DATE_FORMAT_2);
        if (timeString === "") timeString = getLocaleTime(new Date(), false);
        startTimeStr = `${dateString}T${timeString}`;
      }
      params["starttime"] = startTimeStr;
    }
    const data = await fetchData(URL_SESSIONS, params);
    setSessionData(data || []);
    setIsLoading(false);
  };

  const handleFormChange = (event) => {
    const data = [...formFields];
    const val = event.target.name || event.value.name;
    if (val === "date" || val === "time") {
      const dataItem = data.find((e) => e.name === val);
      dataItem.value = event.value;
    } else {
      const dataItem = data.find((e) => e.name === val);
      dataItem.value = event.target.value;
    }
    setFormFields(data);
  };

  const removeFormEntry = (event) => {
    const data = [...formFields];
    data.find((e) => e.name === event.target.id).value = null;
    setFormFields(data);
  };

  const incrementCounter = () => {
    setSubmitCounter(submitCounter + 1);
  };

  const onSubmit = () => {
    incrementCounter();
    if (showFilterPopup) {
      onHide();
    }
  };

  const onHide = () => {
    setShowFilterPopup(false);
  };

  const clearAllHandler = () => {
    const data = [...formFields];
    data.forEach((e) => (e.value = ""));
    setFormFields(data);
  };

  const getFilterCardContent = (e) => {
    if (e.type === "calendar") {
      return e.name === "time"
        ? getLocaleTime(e.value, true)
        : e.value.toLocaleDateString("en-US");
    } else {
      return e.options.find((option) => option.value === e.value).label;
    }
  };

  const toggleFilterVisibility = () => {
    width > 700
      ? setShowFilters(!showFilters)
      : setShowFilterPopup(!showFilterPopup);
  };

  const getChartConfig = () => {
    const customChartConfig = JSON.parse(JSON.stringify(BAR_CHART_OPTIONS));
    if (width > 700) {
      customChartConfig.plugins.legend.position = "bottom";
      customChartConfig.plugins.legend.align = "start";
    } else {
      customChartConfig.plugins.legend.position = "top";
      customChartConfig.plugins.legend.align = "start";
      customChartConfig.plugins.title.padding = 0;
    }
    return customChartConfig;
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

  return (
    <div id="bar-chart" className="m-0 p-5 sm:p-10 sm:pt-7 bg-[#1C1C20]">
      <div className="flex basis-full justify-between pb-2 items-baseline">
        <div className="text-lg text-[#F2F2F2] font-bold">{SESSIONS}</div>
        <div
          className="cursor-pointer"
          onClick={() => toggleFilterVisibility()}
        >
          <CustomIcon
            alt="show-filters"
            src={FilterIcon}
            width="2rem"
            height="2rem"
          />
        </div>
      </div>
      {showFilters && (
        <div className="basis-full justify-between pb-0 items-center hidden sm:flex">
          <div className="flex justify-start pb-4 items-end">
            {formFields.map((form, index) => {
              return (
                <div className="flex-col mr-4" key={index}>
                  {form.type === "calendar" && (
                    <CustomCalendar
                      name={form.name}
                      title={form.title}
                      showTime={false}
                      timeOnly={form.name === "time"}
                      placeholder={form.name === "date" ? DD_MM_YYYY : HH_MM}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      maxDate={form.name === "date" ? new Date() : null}
                      dateFormat={DATE_FORMAT_3}
                      iconPos={"left"}
                      imgalt={`${form.name}-icon`}
                      imgsrc={form.imgsrc}
                      hourFormat="12"
                      className={form.name === "time" ? "w-24" : "w-32"}
                    />
                  )}
                  {form.type === "dropdown" && (
                    <CustomDropdown
                      name={form.name}
                      title={form.title}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      options={form.options}
                      optionLabel={"label"}
                      placeholder={""}
                      showIcon={true}
                      iconSrc={form.iconSrc}
                      iconAlt={`${form.name}-icon`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <Button
            disabled={disabled}
            label={SUBMIT}
            id="page-btn-submit"
            className="p-button-rounded min-w-[118px]"
            onClick={incrementCounter}
          />
        </div>
      )}

      <div className="flex gap-2 justify-start flex-wrap pb-6 items-center">
        {formFields
          .filter((e) => e.value)
          .map((e: any) => (
            <React.Fragment key={e.name}>
              <FilteredCard
                label={e.name}
                leftIcon={e.iconSrc || e.imgsrc}
                onClickHandler={removeFormEntry}
                content={getFilterCardContent(e)}
              />
            </React.Fragment>
          ))}

        {!disabled && (
          <div
            onClick={clearAllHandler}
            className="text-[#FAF9F6] font-normal text-xs ml-2 cursor-pointer"
          >
            {RESET}
          </div>
        )}
      </div>

      <div className="flex justify-center basis-full relative px-3 py-5 sm:px-5 h-64 mb-4 bg-[#30343B] w-[full] h-[18rem] sm:h-[24rem] drop-shadow-md rounded-xl">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Bar ref={chartRef} options={getChartConfig()} data={allData} />
            <div className="absolute bottom-1 sm:bottom-7 text-center w-auto text-xs text-[#FAF9F6]">
              {TOTAL_SESSIONS_PER_MINUTE}
            </div>
          </>
        )}
      </div>

      <Dialog
        id="modal-section"
        header={FILTERS}
        visible={showFilterPopup}
        footer={renderFooter()}
        onHide={onHide}
        blockScroll={true}
        position="bottom"
        draggable={false}
        resizable={false}
        style={{ width: "100vw", margin: 0 }}
      >
        <div className="filter-popup-content">
          <div className="flex mb-4 gap-4">
            {formFields
              .filter((item) => item.type === "calendar")
              .map((form, index) => {
                return (
                  <div className="flex-col w-3/6" key={index}>
                    <CustomCalendar
                      name={form.name}
                      title={form.title}
                      showTime={false}
                      timeOnly={form.name === "time"}
                      placeholder={form.name === "date" ? DD_MM_YYYY : HH_MM}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      maxDate={form.name === "date" ? new Date() : null}
                      dateFormat={DATE_FORMAT_3}
                      iconPos={"left"}
                      imgalt={`${form.name}-icon`}
                      imgsrc={form.imgsrc}
                      hourFormat="12"
                      className="w-full"
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex mb-4 gap-4">
            {formFields
              .filter((item) => item.type === "dropdown")
              .map((form, index) => {
                return (
                  <div className="flex-col w-3/6" key={index}>
                    <CustomDropdown
                      name={form.name}
                      title={form.title}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      options={form.options}
                      optionLabel={"label"}
                      placeholder={""}
                      showIcon={false}
                      iconSrc={form.iconSrc}
                      iconAlt={`${form.name}-icon`}
                      className="w-full"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BarChart;
