import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { ChartData, SessionData } from "../../@types/BarChart";
import ChannelIcon from "../../assets/channel.svg";
import FilterIcon from "../../assets/filter-dark.svg";
import SandGlassIcon from "../../assets/sandglass.svg";
import openNewPageIcon from "../../assets/open_in_new.svg";
import CalendarIcon from "../../assets/white_calendar.svg";
import refreshIcon from "../../assets/refresh_icon.svg";
import { BAR_CHART_OPTIONS } from "../../config/chartConfig";
import { URL_SESSIONS } from "../../constants/apiConstants";
import {
  CHANNEL,
  CHANNEL_LIST,
  DATE,
  DD_MM_YYYY,
  MM_DD_YYYY_HH_MM,
  DEFAULT_PERIOD,
  DURATION,
  HOME_PAGE_REFERSH_DURATION,
  DURATION_LIST,
  FILTERS,
  RESET,
  SESSIONS,
  SESSIONS_TABS,
  SUBMIT,
  TOTAL_SESSIONS_PER_MINUTE,
} from "../../constants/appConstants";
import useScreenSize from "../../hooks/useScreenSize";
import {
  DATE_FORMAT_2,
  DATE_FORMAT_3,
  formatDate,
  getLocaleTime,
} from "../../utils/dateTimeUtil";
import { fetchData } from "../../utils/fetchUtil";
import FilteredCard from "../FilteredCard";
import CustomCalendar from "../common/CustomCalendar";
import CustomDropdown from "../common/CustomDropdown";
import CustomIcon from "../common/CustomIcon";
import CustomTab from "../common/customtab";
import Loader from "../loader";
import CustomImage from "../common/customimage";
import CustomButton from "../Button";
import { LoaderContext, LoaderContextType } from "../../context/loaderContext";
import { submitOnEnter } from "../utils/Utils";
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
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [formFields, setFormFields] = useState([
    {
      type: "dropdown",
      name: "period",
      title: DURATION,
      value: 10,
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
      type: "dropdown",
      name: "channel",
      title: CHANNEL,
      value: "",
      iconSrc: ChannelIcon,
      options: CHANNEL_LIST,
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const [tabValue, setTabValue] = useState<number>(2);
  const [id, setId] = useState<string>("home-bar-chart");
  const { hideLoader } = useContext(
    LoaderContext
  ) as LoaderContextType;
  const { width } = useScreenSize();
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    const primaryDataset = {
      label: "Primary",
      data: azurePrimaryData,
      backgroundColor: "#0977FF",
    };
    const secondaryDataset = {
      label: "Secondary",
      data: azureSecondaryData,
      backgroundColor: "#41E2D8",
    };
    let chartData: ChartData = {
      labels: xAxisLabels,
    };
    switch (tabValue) {
      case 0:
        chartData = { ...chartData, datasets: [primaryDataset] };
        break;
      case 1:
        chartData = { ...chartData, datasets: [secondaryDataset] };
        break;
      case 2:
        chartData = {
          ...chartData,
          datasets: [primaryDataset, secondaryDataset],
        };
        break;
    }
    setAllData({ ...chartData });
  }, [xAxisLabels, tabValue]);

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  const getSessionData = async () => {
    const params = {
      period: location.pathname.includes("home")
        ? HOME_PAGE_REFERSH_DURATION
        : DEFAULT_PERIOD,
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
    setIsLoading(true);
    const data = await fetchData(URL_SESSIONS, params);
    setSessionData(data || []);
    setChartOptions(
      location.pathname.includes("home")
        ? getChartConfig(HOME_PAGE_REFERSH_DURATION)
        : getChartConfig(),
    );
    hideLoader();
    setIsLoading(false);
  };
  useEffect(() => {
    const removeEventListener = submitOnEnter(incrementCounter);
    return removeEventListener;
  }, [submitCounter]);

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

  const removeFormEntry = (label) => {
    const data = [...formFields];
    data.find((e) => e.name === label).value = null;
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

  const getChartConfig = (duration) => {
    const customChartConfig = { ...BAR_CHART_OPTIONS };
    if (width > 700) {
      customChartConfig.plugins.legend.position = "bottom";
      customChartConfig.plugins.legend.align = "start";
      customChartConfig.plugins.datalabels.rotation =
        (duration ||
          Number(formFields.find((e) => e.name === "period").value)) < 11
          ? 0
          : 270;
    } else {
      customChartConfig.plugins.legend.position = "top";
      customChartConfig.plugins.legend.align = "start";
      customChartConfig.plugins.datalabels.rotation = 270;
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

  const handleExpandClick = () => {
    navigate("/sessions");
  };

  const handleOPMCompRefreshBtnClick = () => {
    getSessionData();
  };

  useEffect(() => {
    setId(
      location?.pathname?.includes("sessions") ? "bar-chart" : "home-bar-chart",
    );
  }, []);

  return (
    <div id={id}>
      {location.pathname.includes("sessions") && (
        <>
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
                          containerclassname="calendarSessions"
                          imageclassname="h-[20px] w-[20px] relative top-[2.8vh] left-[0.5vw] z-[1]"
                          // showTime={false}
                          showTime
                          timeOnly={form.name === "time"}
                          placeholder={MM_DD_YYYY_HH_MM}
                          value={form.value}
                          onChange={(event) => handleFormChange(event)}
                          maxDate={form.name === "date" ? new Date() : null}
                          dateFormat={DATE_FORMAT_3}
                          iconPos={"left"}
                          imgalt={`${form.name}-icon`}
                          imgsrc={form.imgsrc}
                          className="w-[190px]"
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
                          showLeftIcon={true}
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
        </>
      )}
      {isLoading && <Loader className="!p-0 m-auto" />}
      {!isLoading && (
        <div className="home-sessions flex justify-center basis-full relative px-3 py-8 sm:px-5 h-64 mb-4 bg-[#22262C] w-[full] h-[22rem] sm:h-[24rem] drop-shadow-md rounded-xl flex-col">
          <>
            {location.pathname.includes("home") && (
              <>
                <div className="flex flex-row justify-between">
                  <div className="text-[#F2F2F2] text-base sm:text-lg font-bold self-center">
                    {SESSIONS}
                  </div>
                  <div className="flex">
                    <CustomButton
                      className="home-refresh-btn"
                      onClick={handleOPMCompRefreshBtnClick}
                    >
                      <CustomImage src={refreshIcon} />
                    </CustomButton>
                    <CustomButton
                      className="home-expand-btn ml-3 pb-[4px]"
                      onClick={handleExpandClick}
                    >
                      <CustomImage src={openNewPageIcon} />
                    </CustomButton>
                  </div>
                </div>
                <CustomTab
                  className="custom-tab sm:absolute sm:top-[1.25rem] sm:right-[8rem]"
                  tabData={SESSIONS_TABS}
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                />
              </>
            )}
            {location.pathname.includes("sessions") && (
              <CustomTab
                className="custom-tab"
                tabData={SESSIONS_TABS}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
            )}
            {allData.labels.length > 0 && chartOptions && (
              <Bar ref={chartRef} options={chartOptions} data={allData} />
            )}
            <div className="text-center text-xs text-[#FAF9F6] -mt-[2px] sm:-mt-[28px]">
              {TOTAL_SESSIONS_PER_MINUTE}
            </div>
          </>
        </div>
      )}

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
          <div className="flex gap-4 mb-4 w-full">
            {formFields
              .filter((item) => item.type === "calendar")
              .map((form, index) => {
                return (
                  <div className="flex-col w-full" key={index}>
                    <CustomCalendar
                      name={form.name}
                      title={form.title}
                      showTime
                      containerclassname="calendarSessions"
                      imageclassname="h-[20px] w-[20px] relative top-[4vh] md:top-[3vh] left-[0.5vw] z-[1]"
                      // timeOnly={form.name === "time"}
                      placeholder={DD_MM_YYYY}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      maxDate={form.name === "date" ? new Date() : null}
                      dateFormat={DATE_FORMAT_3}
                      iconPos={"left"}
                      imgalt={`${form.name}-icon`}
                      imgsrc={form.imgsrc}
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
