import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useScreenSize from "../hooks/useScreenSize";
import CustomButton from "../components/Button";
import CustomDropdown from "../components/DropDown";
import FilteredCard from "../components/FilteredCard";
import CustomInputText from "../components/InputText";
import LineChart from "../components/LineChart";
import CustomDialog from "../components/atoms/customdialog";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomImage from "../components/atoms/customimage";
import Loader from "../components/loader";
import ArrowDownIcon from "../assets/arrown_down_white.svg";
import WhiteCrossIcon from "../assets/white_cross.svg";
import GreyCalendarIcon from "../assets/calendar-grey.svg";
import GreyChannelIcon from "../assets/channel-grey.svg";
import ChannelIcon from "../assets/channel.svg";
import FilterIcon from "../assets/filter.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import openNewPageIcon from "../assets/open_in_new.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import WhiteCalendarIcon from "../assets/white_calendar.svg";
import {
  ChartData,
  ChartOptions,
  OpmComparisonType,
} from "../@types/pages/opmCharts";
import {
  OPM_COMPARISON_BAR_OPTIONS,
  OPM_COMPARISON_BAR_OPTIONS_HOME,
  OPM_COMPARISON_OPTIONS,
  OPM_COMPARISON_OPTIONS_HOME,
} from "../config/chartConfig";
import { URL_OPM_COMPARISON } from "../constants/apiConstants";
import { ROUTES, submitOnEnter } from "../utils/Utils";
import {
  OPM_CHANNELS,
  LABELS,
  PAGE_TITLES,
  INPUT_TYPES,
  DASHBOARD_LABELS,
  DATE_AND_TIME_FORMATS,
  CHART_LABELS,
  CHART_TABS,
  OPM_COMPARISON_CHART_STYLES,
  OPM_CHART_DEFAULT,
  SCREEN_WIDTH,
  DURATIONS,
} from "../constants/appConstants";
import { LoaderContext } from "../context/loaderContext";
import { LoaderContextType } from "../@types/components/commonTypes";
import {
  CURRENT_PST_DATE,
  DATE_TIME_FORMAT_3,
  DATE_TIME_FORMAT_4,
  formatDate,
  getFormattedPSTDate,
  getPSTdate,
} from "../utils/dateTimeUtil";
import { fetchData } from "../utils/fetchUtil";
import CustomTab from "../components/atoms/customtab";
import BarChart from "../components/BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const OpmComparison: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<null | OpmComparisonType>(
    null,
  );
  const [counter, setCounter] = useState<number>(0);

  const { width } = useScreenSize();
  const navigate = useNavigate();
  const IS_FULLSCREEN = location?.pathname.includes(ROUTES.fullScreen);

  const DEFAULT = {
    duration: 10,
    startTimeOne: getFormattedPSTDate(), // 10 minutes ago.
    startDateTwo: new Date(
      new Date(getPSTdate(new Date())).getTime() - 86400000,
    ).toLocaleDateString("en-US"),
    channel: "",
  };

  const [url, setUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<null | ChartOptions>(null);
  const [barChartoptions, setBarChartOptions] = useState<null | ChartOptions>(
    null,
  );
  const [data, setData] = useState<ChartData | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilteredCards, setShowFilteredCards] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const [tabValue, setTabValue] = useState<number>(0);
  const [maxOPM, setMaxOPM] = useState<number>(OPM_CHART_DEFAULT.MAX);

  const { hideLoader } = useContext(LoaderContext) as LoaderContextType;
  const DEFAULT_FORM_FIELDS = [
    {
      type: INPUT_TYPES.dropdown,
      name: "period",
      label: LABELS.DURATION,
      icon: SandGlassIcon,
      cardIcon: GreyHourGlassIcon,
      value: {
        name: "10 mins",
        code: 10,
      },
      options: Object.keys(DURATIONS).map((e) => ({
        name: e,
        code: DURATIONS[e],
      })),
    },
    {
      type: INPUT_TYPES.time,
      name: "startDate",
      label: LABELS.STARTDATE,
      showTime: true,
      cardIcon: GreyCalendarIcon,
      value: new Date(DEFAULT.startTimeOne),
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.time,
      name: "endDate",
      label: LABELS.ENDDATE,
      cardIcon: GreyCalendarIcon,
      showTime: false,
      value: new Date(DEFAULT.startDateTwo),
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "channel",
      label: LABELS.CHANNEL,
      icon: ChannelIcon,
      cardIcon: GreyChannelIcon,
      value: {
        name: "All",
        code: "",
      },
      options: Object.keys(OPM_CHANNELS).map((e) => ({
        name: e,
        code: OPM_CHANNELS[e],
      })),
    },
  ];
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);

  useEffect(() => {
    const startTimeOne = getFormattedPSTDate(null, DEFAULT.duration);
    const startDateTwo = new Date(
      new Date(getPSTdate(new Date())).getTime() - 86400000,
    ).toLocaleDateString("en-US");
    setUrl(
      `${URL_OPM_COMPARISON}?period=${
        location.pathname.includes(ROUTES.opmComparison)
          ? DEFAULT.duration
          : DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION
      }&startTimeOne=${startTimeOne}&startDateTwo=${startDateTwo}&channel=${
        DEFAULT.channel
      }`,
    );
  }, [counter]);

  useEffect(() => {
    const removeEventListener = submitOnEnter(submit);
    return removeEventListener;
  }, []);

  const handleFormChange = (event) => {
    const data = [...formFields];
    const val = event.target.name || event.value.name;
    if (["startDate", "endDate"].includes(val)) {
      data.find((e) => e.name === val).value = isNaN(event.value)
        ? CURRENT_PST_DATE
        : event.value;
    } else {
      data.find((e) => e.name === val).value = event.target.value;
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

  const submit = (event) => {
    event.preventDefault();
    let str = ``;
    formFields.forEach((e: any) => {
      if (e.value) {
        if (e.name === "startDate") {
          str += `startTimeOne=${formatDate(e.value, DATE_TIME_FORMAT_3)}&`;
          str += `startTimeOne=${formatDate(e.value, DATE_TIME_FORMAT_3)}&`;
          return;
        }
        if (e.name === "endDate") {
          str += `startDateTwo=${new Date(
            new Date(getPSTdate(e.value)).getTime() - 86400000,
          ).toLocaleDateString("en-US")}&`;
          return;
        }
        str += `${e.name}=${String(e.value.code)}&`;
      }
    });
    setUrl(`${URL_OPM_COMPARISON}?${str}`);
    if (showFilters && width < SCREEN_WIDTH.SM) setShowFilters(false);
  };

  useEffect(() => {
    if (apiResponse) {
      const canvas = document.getElementById("myChart");
      const ctx = (canvas as HTMLCanvasElement)?.getContext("2d");
      let gradient;
      if (ctx) {
        gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "white");
      }
      const xAxisLabels = apiResponse["opmOne"].map((e) => e.timestamp);
      const allOrderCounts = Object.values(apiResponse).flatMap((opm) =>
        opm.map((item) => parseInt(item.orderCount)),
      );
      const maxValue = Math.max(...allOrderCounts);
      setMaxOPM(
        Math.round(maxValue / OPM_CHART_DEFAULT.STEP_SIZE) *
          OPM_CHART_DEFAULT.STEP_SIZE +
          OPM_CHART_DEFAULT.STEP_SIZE,
      );

      setData({
        labels: xAxisLabels,
        datasets:
          apiResponse &&
          Object.keys(apiResponse)?.map((e, index) => ({
            data: apiResponse?.[e].map((e) => Number(e.orderCount)),
            backgroundColor: "white",
            label: CHART_LABELS.NO_OF_ORDERS,
            index,
            borderColor:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            borderWidth: 2,
          })),
      });
      setBarChartData({
        labels: xAxisLabels,
        datasets:
          apiResponse &&
          Object.keys(apiResponse)?.map((e, index) => ({
            data: apiResponse?.[e].map((e) => Number(e.orderCount)),
            label: CHART_LABELS.NO_OF_ORDERS,
            backgroundColor:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            borderColor:
              index === 0
                ? OPM_COMPARISON_CHART_STYLES.PRIMARY_COLOR
                : OPM_COMPARISON_CHART_STYLES.SECONDARY_COLOR,
            borderWidth: 2,
          })),
      });
      setOptions(
        location.pathname.includes(ROUTES.home)
          ? OPM_COMPARISON_OPTIONS_HOME({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < SCREEN_WIDTH.SM,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 11 &&
                width > SCREEN_WIDTH.SM,
            })
          : OPM_COMPARISON_OPTIONS({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < SCREEN_WIDTH.SM,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 11 &&
                width > SCREEN_WIDTH.SM,
            }),
      );
      setBarChartOptions(
        location.pathname.includes(ROUTES.home)
          ? OPM_COMPARISON_BAR_OPTIONS_HOME({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < SCREEN_WIDTH.SM,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 11 &&
                width > SCREEN_WIDTH.SM,
            })
          : OPM_COMPARISON_BAR_OPTIONS({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < SCREEN_WIDTH.SM,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 11 &&
                width > SCREEN_WIDTH.SM,
            }),
      );
    }
  }, [apiResponse]);

  const getData = async () => {
    try {
      setIsLoading(true);
      if (url) {
        const data = await fetchData(url, {});
        hideLoader();
        setIsLoading(false);
        setApiResponse(data);
      }
    } catch (err) {
      console.log(`Error occured while fetching ${url}`);
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [url]);

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  const onFilterClickHandler = () => {
    setShowFilters(!showFilters);
    if (width < SCREEN_WIDTH.SM) {
      setVisible(true);
    }
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const getChartConfig = () => {
    let customChartConfig = null;
    if (tabValue === 0) {
      customChartConfig = { ...barChartoptions };
      customChartConfig.scales.y.max = maxOPM;
      if (width > SCREEN_WIDTH.SM && width <= SCREEN_WIDTH.LG) {
        customChartConfig.plugins.datalabels.rotation = 270;
        customChartConfig.plugins.datalabels.anchor = "center";
        customChartConfig.plugins.datalabels.align = "center";
      } else {
        customChartConfig.plugins.datalabels.rotation = 0;
      }
    } else {
      customChartConfig = { ...options };
      customChartConfig.scales.y.max = maxOPM;
    }
    return customChartConfig;
  };

  const handleOPMCompExpandClick = () => {
    navigate(ROUTES.opmComparison);
  };

  const handleOPMCompRefreshBtnClick = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      {location.pathname.includes(ROUTES.home) && isLoading && (
        <Loader className="!p-0 w-40w m-auto min-h-21r" />
      )}
      {location.pathname.includes(ROUTES.home) && !isLoading && data && (
        <div className="w-full xl:w-1/2 bg-black-200 rounded-lg px-4 lg:px-6 py-4">
          <div className="flex justify-between items-center relative mb-2 md:mb-4 lg:mb-2 xl:mb-4">
            <span className="text-gray-200 font-bold text-lg font-helvetica">
              {PAGE_TITLES.OPM_COMPARISON}
            </span>
            <div className="flex items-center">
              <CustomTab
                className="opm-tabs mr-2 hidden md:block"
                tabData={CHART_TABS}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
              <CustomButton
                className="home-refresh-btn"
                onClick={handleOPMCompRefreshBtnClick}
              >
                <CustomImage src={refreshIcon} />
              </CustomButton>
              <CustomButton
                className="home-expand-btn ml-2"
                onClick={handleOPMCompExpandClick}
              >
                <CustomImage src={openNewPageIcon} />
              </CustomButton>
            </div>
          </div>
          <div className="flex justify-start items-center relative mb-0 sm:mb-4 lg:mb-1 xl:mb-4 md:hidden">
            <CustomTab
              className="opm-tabs mr-2"
              tabData={CHART_TABS}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
          </div>
          {tabValue === 0 ? (
            <BarChart
              title={PAGE_TITLES.OPM_COMPARISON}
              options={getChartConfig()}
              data={barChartData}
              className="border-0 w-full h-64"
              defaultClasses={true}
            />
          ) : (
            <LineChart
              title={PAGE_TITLES.OPM_COMPARISON}
              className="border-0 w-full h-64"
              options={getChartConfig()}
              data={data}
              defaultClasses={true}
              plugins={false}
            />
          )}
          <div className="text-xs text-gray-300 flex justify-center mt-3 sm:mt-[-1.65rem] mb-2 sm:mb-0">
            <div className="w-auto font-helvetica">
              {CHART_LABELS.TOTAL_ORDERS_PER_MINUTE}
            </div>
          </div>
        </div>
      )}
      {location.pathname.includes(ROUTES.opmComparison) && (
        <div className={`${isLoading ? "h-4/5" : ""}`}>
          {!IS_FULLSCREEN &&
            location.pathname.includes(ROUTES.opmComparison) && (
              <div className="flex justify-between items-start">
                <p className="font-bold text-gray-200">
                  {PAGE_TITLES.OPM_COMPARISON}
                </p>
                {width < SCREEN_WIDTH.SM && (
                  <CustomImage
                    src={FilterIcon}
                    className="self-end"
                    alt="Filter Icon"
                    onClick={onFilterClickHandler}
                  />
                )}
              </div>
            )}
          {showFilters && location.pathname.includes(ROUTES.opmComparison) && (
            <>
              {width > SCREEN_WIDTH.SM ? (
                <form
                  id="custom-hover"
                  className="flex gap-4 opmFilters opmComparisonFilters"
                  onSubmit={submit}
                >
                  {formFields.map((form, index) => {
                    return (
                      <React.Fragment key={index}>
                        {form.type === "text" && (
                          <CustomInputText
                            type="text"
                            value={form.value}
                            name={form.label}
                            placeholder={form.label}
                            onChange={(event) => handleFormChange(event)}
                          />
                        )}
                        {form.type === "time" && (
                          <CustomCalendar
                            name={form.name}
                            titleclassname="top-1.25r"
                            containerclassname="lg:max-w-[11rem]"
                            imageclassname="relative top-1.75r left-0.75w z-1"
                            title={form.label}
                            placeholder={DATE_AND_TIME_FORMATS.MM_DD_YYYY_HH_MM}
                            showTime={form.showTime}
                            iconPos={form.iconPos || "left"}
                            imgsrc={form.imgsrc}
                            onChange={(event) => handleFormChange(event)}
                            value={form.value}
                            maxDate={
                              form.name === "startDate" ||
                              form.name === "endDate"
                                ? CURRENT_PST_DATE
                                : null
                            }
                          />
                        )}
                        {form.type === "dropdown" && (
                          <CustomDropdown
                            name={form.name}
                            value={form.value}
                            containerclassname="max-w-[8rem]"
                            onChange={(e) => handleFormChange(e)}
                            imageclassname="z-1"
                            dropdownIcon={<CustomImage src={ArrowDownIcon} />}
                            icon={form.icon}
                            options={form.options}
                            label={form.label}
                            optionLabel="name"
                            placeholder=""
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                  <CustomButton
                    id="page-btn-submit"
                    label={LABELS.SUBMIT}
                    isDisabled={disabled}
                    isRounded={true}
                    className="ml-auto  self-end relative "
                  />
                </form>
              ) : (
                <>
                  <CustomDialog
                    header={LABELS.FILTERS}
                    visible={visible}
                    className="!bg-slate-900 filtersModal filtersModal-popup opmFiltersMobile "
                    onHide={onModalCloseHandler}
                    closeIcon={<CustomImage src={WhiteCrossIcon} />}
                  >
                    <form
                      className="grid grid-cols-2 grid-rows-3 gap-x-3 gap-y-5"
                      onSubmit={submit}
                    >
                      {formFields.map((form, index) => {
                        return (
                          <React.Fragment key={index}>
                            {form.type === INPUT_TYPES.text && (
                              <CustomInputText
                                containerclassname="w-45w mobileInput"
                                value={form.value}
                                name={form.label}
                                placeholder={form.label}
                                onChange={(event) => handleFormChange(event)}
                                className="border rounded-lg border-solid border-slate-300 border-1 h-38"
                              />
                            )}
                            {form.type === INPUT_TYPES.time && (
                              <CustomCalendar
                                name={form.name}
                                containerclassname="opmFiltersMobileCalendar"
                                imageclassname="h-5 w-5 relative top-8 md:top-3h left-2w z-1"
                                titleclassname="top-5"
                                title={form.label}
                                showTime={form.showTime}
                                iconPos={form.iconPos || "left"}
                                imgsrc={form.imgsrc}
                                onChange={(event) => handleFormChange(event)}
                                value={form.value}
                                maxDate={
                                  form.name === "startDate" ||
                                  form.name === "endDate"
                                    ? CURRENT_PST_DATE
                                    : null
                                }
                              />
                            )}
                            {form.type === INPUT_TYPES.dropdown && (
                              <CustomDropdown
                                value={form.value}
                                name={form.name}
                                dropdownIcon={
                                  <CustomImage src={ArrowDownIcon} />
                                }
                                onChange={(e) => handleFormChange(e)}
                                imageclassname="z-1"
                                icon={form.icon}
                                options={form.options}
                                label={form.label}
                                optionLabel="name"
                                placeholder=""
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                      <CustomButton
                        btnclassname="w-full"
                        label={LABELS.SUBMIT}
                        isDisabled={disabled}
                        isRounded={true}
                        className="opm-btn p-button-rounded min-w-[160px] col-span-full	m-auto"
                      />
                    </form>
                  </CustomDialog>
                </>
              )}
            </>
          )}
          {location.pathname.includes(ROUTES.opmComparison) &&
            showFilteredCards && (
              <div
                className={`flex items-center gap-4 mt-2.5 overflow-auto ml-5w lg:ml-0 ${
                  IS_FULLSCREEN
                    ? "landScape opmComparison rotate-90 absolute -left-9h top-45h ml-25w w-70h mt-0"
                    : `${width < SCREEN_WIDTH.SM ? "portrait" : ""}`
                }`}
              >
                {formFields
                  .filter((e) => e.value)
                  .map((e: any) => (
                    <Fragment key={e.name}>
                      <FilteredCard
                        label={e.name}
                        leftIcon={e.cardIcon}
                        onClickHandler={removeFormEntry}
                        content={
                          e.type === "time"
                            ? e.name === "startDate"
                              ? formatDate(e.value, DATE_TIME_FORMAT_4)
                              : e.value.toLocaleDateString("en-US")
                            : e.value.name || e.value
                        }
                      />
                    </Fragment>
                  ))}
                {!disabled && !IS_FULLSCREEN && (
                  <CustomButton
                    label={LABELS.RESET}
                    severity="secondary"
                    className="resetFilters text-xs text-gray-300"
                    isTextButton={true}
                    onClick={() => resetFormEntry()}
                  />
                )}
              </div>
            )}
          {isLoading && location.pathname.includes(ROUTES.opmComparison) ? (
            <Loader className="h-full" />
          ) : (
            data &&
            !isLoading &&
            location.pathname.includes(ROUTES.opmComparison) && (
              <div
                className={`relative ${
                  IS_FULLSCREEN ? "rotate-90 h-[23rem]" : "h-[28rem] lg:h-29r"
                }`}
              >
                <CustomTab
                  className={`opm-tabs absolute z-10 pt-2  top-2 ${
                    IS_FULLSCREEN
                      ? "right-100vh-57r"
                      : "right-14 sm:right-3 md:right-4 lg:right-6"
                  }`}
                  tabData={CHART_TABS}
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                />
                {tabValue === 0 ? (
                  <BarChart
                    title={PAGE_TITLES.OPM_COMPARISON}
                    isFullScreen={IS_FULLSCREEN}
                    className={`opm-comparison-page-chart-container ${
                      IS_FULLSCREEN
                        ? "opm-comparison-page-chart-container-rotated"
                        : ""
                    }`}
                    options={getChartConfig()}
                    data={barChartData}
                  />
                ) : (
                  <LineChart
                    title={PAGE_TITLES.OPM_COMPARISON}
                    isFullScreen={IS_FULLSCREEN}
                    className={`opm-comparison-page-chart-container ${
                      IS_FULLSCREEN
                        ? "opm-comparison-page-chart-container-rotated"
                        : ""
                    }`}
                    options={getChartConfig()}
                    data={data}
                  />
                )}
                <div
                  className={`text-xs text-gray-300 flex justify-center -mt-10 ${
                    IS_FULLSCREEN ? "w-[calc(100vh-5vh)]" : ""
                  }`}
                >
                  <div className="w-auto font-helvetica">
                    {CHART_LABELS.TOTAL_ORDERS_PER_MINUTE}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default OpmComparison;
