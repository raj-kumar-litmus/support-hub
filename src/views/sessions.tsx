import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import useScreenSize from "../hooks/useScreenSize";
import BarChartComp from "../components/BarChartComp";
import CustomButton from "../components/Button";
import FilteredCard from "../components/FilteredCard";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomDropdown from "../components/DropDown";
import CustomDialog from "../components/common/customdialog";
import CustomIcon from "../components/common/CustomIcon";
import CustomImage from "../components/common/customimage";
import CustomTab from "../components/common/customtab";
import Loader from "../components/loader";
import ChannelIcon from "../assets/channel.svg";
import FilterIcon from "../assets/filter-dark.svg";
import ArrowDownIcon from "../assets/arrown_down_white.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import openNewPageIcon from "../assets/open_in_new.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import CalendarIcon from "../assets/white_calendar.svg";
import { ChartData, SessionData } from "../@types/pages/Sessions";
import { LoaderContextType } from "../@types/components/commonTypes";
import { BAR_CHART_OPTIONS } from "../config/chartConfig";
import { URL_SESSIONS } from "../constants/apiConstants";
import {
  SESSIONS_CHANNEL_LIST,
  DATE_AND_TIME_FORMATS,
  LABELS,
  DASHBOARD_LABELS,
  PAGE_TITLES,
  SESSIONS_TABS,
  CHART_LABELS,
  SESSIONS_CHART_DEFAULT,
  SCREEN_WIDTH,
  DURATIONS,
} from "../constants/appConstants";
import { LoaderContext } from "../context/loaderContext";
import {
  CURRENT_PST_DATE,
  DATE_FORMAT_3,
  DATE_TIME_FORMAT_4,
  formatDate,
  getFormattedPSTDate,
} from "../utils/dateTimeUtil";
import { fetchData } from "../utils/fetchUtil";
import { ROUTES, submitOnEnter } from "../components/utils/Utils";

const Sessions = () => {
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
      title: LABELS.DURATION,
      value: 10,
      iconSrc: SandGlassIcon,
      options: Object.keys(DURATIONS).map((e) => ({
        label: e,
        value: DURATIONS[e],
      })),
    },
    {
      type: "calendar",
      name: "date",
      title: LABELS.DATE,
      value: getFormattedPSTDate(),
      imgsrc: CalendarIcon,
    },
    {
      type: "dropdown",
      name: "channel",
      title: LABELS.CHANNEL,
      value: "all",
      iconSrc: ChannelIcon,
      options: SESSIONS_CHANNEL_LIST,
    },
  ];
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const [disabled, setDisabled] = useState(true);
  const [tabValue, setTabValue] = useState<number>(2);
  const [maxOPM, setMaxOPM] = useState<number>(SESSIONS_CHART_DEFAULT.MAX);
  const [id, setId] = useState<string>("home-bar-chart");
  const [showFilteredCards, setShowFilteredCards] = useState<boolean>(false);

  const { hideLoader } = useContext(LoaderContext) as LoaderContextType;
  const { width } = useScreenSize();
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
      period: location.pathname.includes(ROUTES.home)
        ? DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION
        : DASHBOARD_LABELS.DEFAULT_PERIOD,
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
      dataItem.value = isNaN(event.value) ? CURRENT_PST_DATE : event.value;
    } else {
      const dataItem = data.find((e) => e.name === val);
      dataItem.value = event.target.value;
    }
    setShowFilteredCards(true);
    setFormFields(data);
  };

  const removeFormEntry = (label) => {
    const data = [...formFields];
    data.find((e) => e.name === label).value = null;
    setFormFields(data);
  };

  const resetFormEntry = () => {
    setFormFields(DEFAULT_FORM_FIELDS);
    setShowFilteredCards(false);
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
      <CustomButton
        id="popup-btn-submit"
        label={LABELS.SUBMIT}
        onClick={onSubmit}
        autoFocus
      />
    );
  };

  const handleExpandClick = () => {
    navigate(ROUTES.sessions);
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
      {location.pathname.includes(ROUTES.sessions) && (
        <>
          <div className="flex basis-full justify-between pb-0 items-baseline">
            <div className="text-lg text-gray-200 font-bold">
              {PAGE_TITLES.SESSIONS}
            </div>
            <CustomIcon
              alt="show-filters"
              src={FilterIcon}
              width="2rem"
              height="2rem"
              className="cursor-pointer sm:hidden"
              onClick={() => toggleFilterVisibility()}
            />
          </div>
          {showFilters && (
            <div className="justify-between items-end hidden sm:block lg:flex">
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
                          imageclassname="h-5 w-5 relative top-7 left-0.75w z-1"
                          showTime
                          timeOnly={form.name === "time"}
                          placeholder={DATE_AND_TIME_FORMATS.MM_DD_YYYY_HH_MM}
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
                          label={form.title}
                          containerclassname="!min-w-[9rem]"
                          value={form.value}
                          imageclassname="z-1"
                          onChange={(event) => handleFormChange(event)}
                          dropdownIcon={<CustomImage src={ArrowDownIcon} />}
                          options={form.options}
                          optionLabel={"label"}
                          placeholder=""
                          icon={form.iconSrc}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <CustomButton
                disabled={disabled}
                label={LABELS.SUBMIT}
                id="page-btn-submit"
                className="p-button-rounded min-w-[118px] mb-4"
                onClick={incrementCounter}
              />
            </div>
          )}
          {showFilteredCards && (
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
                <CustomButton
                  label={LABELS.RESET}
                  severity="secondary"
                  className="resetFilters text-xs text-white-700 ml-2"
                  isTextButton={true}
                  onClick={() => resetFormEntry()}
                />
              )}
            </div>
          )}
        </>
      )}
      {isLoading && <Loader className="!p-0 m-auto min-h-24r" />}
      {!isLoading && (
        <div
          className={`${
            location.pathname.includes(ROUTES.home)
              ? "home-sessions"
              : "main-sessions"
          } flex justify-center relative bg-black-200 h-96 md:h-21r lg:h-29r rounded-lg flex-col min-h-24r md:min-h-21r`}
        >
          <>
            {location.pathname.includes(ROUTES.home) && (
              <>
                <div className="flex flex-row justify-between mb-2 md:mb-4">
                  <div className="session-page-title self-center">
                    {PAGE_TITLES.SESSIONS}
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
            {location.pathname.includes(ROUTES.sessions) && (
              <>
                <div className="block sm:hidden session-page-title mb-2">
                  {PAGE_TITLES.SESSIONS}
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
              <BarChartComp
                title={PAGE_TITLES.SESSIONS}
                options={chartOptions}
                data={allData}
                className={`border-0 w-full h-64 ${
                  location.pathname.includes(ROUTES.home)
                    ? "lg:h-96"
                    : "sm:h-21r md:h-64 lg:h-29r sm:min-h-21r md:min-h-16r lg:min-h-24r"
                }`}
              />
            )}
            <div className="text-center text-xs text-gray-300 mt-2 sm:-mt-6">
              {CHART_LABELS.TOTAL_SESSIONS_PER_MINUTE}
            </div>
          </>
        </div>
      )}

      <CustomDialog
        id="modal-section"
        header={LABELS.FILTERS}
        visible={showFilterPopup}
        footer={renderFooter()}
        onHide={onHide}
        blockScroll={true}
        className="filtersModal-popup"
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
                      imageclassname="h-5 w-5 relative top-7 md:top-3h left-2w z-1"
                      placeholder={DATE_AND_TIME_FORMATS.DD_MM_YYYY}
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
                      imageclassname="top-0.8r z-1"
                      onChange={(event) => handleFormChange(event)}
                      options={form.options}
                      optionLabel="label"
                      placeholder={""}
                      dropdownIcon={<CustomImage src={ArrowDownIcon} />}
                      icon={form.iconSrc}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Sessions;
