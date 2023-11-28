import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router";
import useScreenSize from "../../hooks/useScreenSize";
import CustomButton from "../Button";
import FilteredCard from "../FilteredCard";
import CustomCalendar from "../common/CustomCalendar";
import CustomDropdown from "../common/CustomDropdown";
import CustomIcon from "../common/CustomIcon";
import CustomImage from "../common/customimage";
import CustomTab from "../common/customtab";
import Loader from "../loader";
import ChannelIcon from "../../assets/channel.svg";
import FilterIcon from "../../assets/filter-dark.svg";
import openNewPageIcon from "../../assets/open_in_new.svg";
import refreshIcon from "../../assets/refresh_icon.svg";
import SandGlassIcon from "../../assets/sandglass.svg";
import CalendarIcon from "../../assets/white_calendar.svg";
import { ChartData, SessionData } from "../../@types/BarChart";
import { BAR_CHART_OPTIONS } from "../../config/chartConfig";
import { URL_SESSIONS } from "../../constants/apiConstants";
import {
  CHANNEL,
  CHANNEL_LIST,
  DATE,
  DD_MM_YYYY,
  DEFAULT_PERIOD,
  DURATION,
  DURATION_LIST,
  FILTERS,
  HOME_PAGE_REFERSH_DURATION,
  MM_DD_YYYY_HH_MM,
  RESET,
  SESSIONS,
  SESSIONS_TABS,
  SUBMIT,
  TOTAL_SESSIONS_PER_MINUTE,
  SESSIONS_CHART_DEFAULT,
  SCREEN_WIDTH,
} from "../../constants/appConstants";
import { LoaderContext, LoaderContextType } from "../../context/loaderContext";
import {
  CURRENT_PST_DATE,
  DATE_FORMAT_3,
  DATE_TIME_FORMAT_4,
  formatDate,
  getFormattedPSTDate,
} from "../../utils/dateTimeUtil";
import { fetchData } from "../../utils/fetchUtil";
import { increaseLegendSpacing, submitOnEnter } from "../utils/Utils";
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
  const DEFAULT_FORM_FIELDS = [
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
      value: getFormattedPSTDate(),
      imgsrc: CalendarIcon,
    },
    {
      type: "dropdown",
      name: "channel",
      title: CHANNEL,
      value: "all",
      iconSrc: ChannelIcon,
      options: CHANNEL_LIST,
    },
  ];
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const [disabled, setDisabled] = useState(true);
  const [tabValue, setTabValue] = useState<number>(2);
  const [maxOPM, setMaxOPM] = useState<number>(SESSIONS_CHART_DEFAULT.MAX);
  const [id, setId] = useState<string>("home-bar-chart");
  const { hideLoader } = useContext(LoaderContext) as LoaderContextType;
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

    const maxValue = Math.max(...azurePrimary, ...azureSecondary);
    const yMaxRange = SESSIONS_CHART_DEFAULT.STEP_SIZE;
    setMaxOPM(Math.round(maxValue / yMaxRange) * yMaxRange + yMaxRange);
    setXAxisLabels([...labels]);
    setAzurePrimaryData([...azurePrimary]);
    setAzureSecondaryData([...azureSecondary]);
  }, [sessionData]);

  useEffect(() => {
    setChartOptions(getChartConfig());
  }, [maxOPM]);

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
      formFields.forEach((e: any) => {
        if (e.value) {
          switch (e.name) {
            case "period":
            case "channel":
              params[e.name] = e.value;
              break;
            case "date":
              params["starttime"] = getFormattedPSTDate(e.value);
              break;
            default:
              break;
          }
        }
      });
    }
    setIsLoading(true);
    const data = await fetchData(URL_SESSIONS, params);
    setSessionData(data || []);
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
    if (val === "date") {
      const dataItem = data.find((e) => e.name === val);
      dataItem.value = isNaN(event.value) ? new Date() : event.value;
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

  const getFilterCardContent = (e) => {
    if (e.type === "calendar") {
      return `${formatDate(e.value, DATE_TIME_FORMAT_4)}`;
    } else {
      return e.options.find((option) => option.value === e.value).label;
    }
  };

  const toggleFilterVisibility = () => {
    width > SCREEN_WIDTH.SM
      ? setShowFilters(!showFilters)
      : setShowFilterPopup(!showFilterPopup);
  };

  const getChartConfig = (duration) => {
    const customChartConfig = {
      ...BAR_CHART_OPTIONS(
        (duration ||
          Number(formFields.find((e) => e.name === "period").value)) < 11 &&
          width > SCREEN_WIDTH.SM,
      ),
    };
    if (width > SCREEN_WIDTH.SM) {
      customChartConfig.plugins.legend.position = "bottom";
      customChartConfig.plugins.legend.align = "start";
    } else {
      customChartConfig.plugins.legend.position = "top";
      customChartConfig.plugins.legend.align = "start";
    }

    if (width > SCREEN_WIDTH.SM && width <= SCREEN_WIDTH.LG) {
      customChartConfig.plugins.datalabels.rotation = 270;
      customChartConfig.plugins.datalabels.anchor = "center";
      customChartConfig.plugins.datalabels.align = "center";
    } else {
      customChartConfig.plugins.datalabels.rotation = 0;
    }
    customChartConfig.scales.y.max = maxOPM;

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
          <div className="flex basis-full justify-between pb-0 items-baseline">
            <div className="text-lg text-gray-200 font-bold">{SESSIONS}</div>
            <div
              className="cursor-pointer sm:hidden"
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
            <div className="basis-full justify-between pb-0 items-end hidden sm:block lg:flex">
              <div className="flex justify-start pb-4 items-end">
                {formFields.map((form, index) => {
                  return (
                    <div className="flex-col mr-4" key={index}>
                      {form.type === "calendar" && (
                        <CustomCalendar
                          name={form.name}
                          title={form.title}
                          containerclassname="calendarSessions"
                          titleclassname="top-5"
                          imageclassname="h-[20px] w-[20px] relative top-[1.75rem] left-[0.5vw] z-[1]"
                          showTime
                          timeOnly={form.name === "time"}
                          placeholder={MM_DD_YYYY_HH_MM}
                          value={form.value}
                          onChange={(event) => handleFormChange(event)}
                          maxDate={
                            form.name === "date" ? CURRENT_PST_DATE : null
                          }
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
                className="p-button-rounded min-w-[118px] mb-4"
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
                onClick={() => setFormFields(DEFAULT_FORM_FIELDS)}
                className="text-gray-300 font-normal text-xs ml-2 cursor-pointer"
              >
                {RESET}
              </div>
            )}
          </div>
        </>
      )}
      {isLoading && <Loader className="!p-0 m-auto min-h-[24rem]" />}
      {!isLoading && (
        <div
          className={`${
            location.pathname.includes("home")
              ? "home-sessions"
              : "main-sessions"
          } flex justify-center relative bg-black-200 h-96 lg:h-[29rem] rounded-lg flex-col min-h-[24rem]`}
        >
          <>
            {location.pathname.includes("home") && (
              <>
                <div className="flex flex-row justify-between mb-2 sm:mb-4">
                  <div className="session-page-title self-center">
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
                      className="home-expand-btn ml-3"
                      onClick={handleExpandClick}
                    >
                      <CustomImage src={openNewPageIcon} />
                    </CustomButton>
                  </div>
                </div>
                <div className="flex justify-start mb-2 md:mb-0 md:justify-center items-center">
                  <CustomTab
                    className="custom-tab md:absolute md:top-5 md:right-32"
                    tabData={SESSIONS_TABS}
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                  />
                </div>
              </>
            )}
            {location.pathname.includes("sessions") && (
              <>
                <div className="block sm:hidden session-page-title mb-2">
                  {SESSIONS}
                </div>
                <CustomTab
                  className={`custom-tab ${
                    width < SCREEN_WIDTH.SM ? "!self-start" : ""
                  }`}
                  tabData={SESSIONS_TABS}
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                />
              </>
            )}
            {allData.labels.length > 0 && chartOptions && (
              <Bar
                ref={chartRef}
                options={chartOptions}
                data={allData}
                plugins={increaseLegendSpacing(20)}
              />
            )}
            <div className="text-center text-xs text-gray-300 mt-2 sm:-mt-11">
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
                      titleclassname="top-5"
                      imageclassname="h-[20px] w-[20px] relative top-[1.75rem] md:top-[3vh] left-[0.5vw] z-[1]"
                      placeholder={DD_MM_YYYY}
                      value={form.value}
                      onChange={(event) => handleFormChange(event)}
                      maxDate={form.name === "date" ? CURRENT_PST_DATE : null}
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
