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
import CustomModal from "../components/Modal";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomImage from "../components/common/customimage";
import Loader from "../components/loader";
import BarChartComp from "../components/BarChartComp";
import AutoRefresh from "../components/common/AutoRefresh";
import CustomTab from "../components/common/customtab";
import ArrowDownIcon from "../assets/arrown_down_white.svg";
import GreyCalendarIcon from "../assets/calendar-grey.svg";
import GreyChannelIcon from "../assets/channel-grey.svg";
import ChannelIcon from "../assets/channel.svg";
import DropDownIcon from "../assets/dropdownIcon.svg";
import FilterIcon from "../assets/filter.svg";
import GreyCardIcon from "../assets/grey_card.svg";
import GreyGlobeIcon from "../assets/grey_globe.svg";
import GreyPromoIcon from "../assets/grey_promo.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import LocaleIcon from "../assets/locale.svg";
import openNewPageIcon from "../assets/open_in_new.svg";
import PaymentIcon from "../assets/payment.svg";
import PromoCodeIcon from "../assets/promocode.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import WhiteCalendarIcon from "../assets/white_calendar.svg";
import WhiteCrossIcon from "../assets/white_cross.svg";
import {
  OPM_BAR_CHART_OPTIONS,
  OPM_BAR_CHART_OPTIONS_HOME,
  OPM_OPTIONS,
  OPM_OPTIONS_HOME,
} from "../config/chartConfig";
import { URL_OPM } from "../constants/apiConstants";
import {
  CHART_LABELS,
  CHART_TABS,
  DASHBOARD_LABELS,
  DATE_AND_TIME_FORMATS,
  DURATIONS,
  INPUT_TYPES,
  LABELS,
  LOCALE_OPTIONS,
  OPM_CHANNELS,
  OPM_CHART_DEFAULT,
  PAGE_TITLES,
  PAYMENT_TYPES,
  SCREEN_WIDTH,
} from "../constants/appConstants";
import { LoaderContext } from "../context/loaderContext";
import { LoaderContextType } from "../@types/components/commonTypes";
import { ChartData, ChartOptions, ModalEnums } from "../@types/pages/opmCharts";
import {
  CURRENT_PST_DATE,
  DATE_TIME_FORMAT_3,
  DATE_TIME_FORMAT_4,
  formatDate,
  getFormattedPSTDate,
} from "../utils/dateTimeUtil";
import { fetchData } from "../utils/fetchUtil";
import { ROUTES, submitOnEnter } from "../components/utils/Utils";

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

const OPM: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ModalEnums>("center");
  const { hideLoader } = useContext(LoaderContext) as LoaderContextType;

  const { width } = useScreenSize();
  const navigate = useNavigate();
  const IS_FULLSCREEN = location?.pathname.includes(ROUTES.fullScreen);

  const DEFAULT = {
    duration: 10,
    starttime: "",
    channel: OPM_CHANNELS.All,
    promocode: "",
    paymentType: PAYMENT_TYPES.All,
    country: "",
  };

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
      name: "date",
      label: LABELS.DATE,
      value: getFormattedPSTDate(),
      showTime: true,
      cardIcon: GreyCalendarIcon,
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
    {
      type: INPUT_TYPES.dropdown,
      name: "locale",
      label: LABELS.LOCALE,
      icon: LocaleIcon,
      cardIcon: GreyGlobeIcon,
      value: {
        name: "All",
        code: "",
      },
      options: Object.keys(LOCALE_OPTIONS).map((e) => ({
        name: e,
        code: LOCALE_OPTIONS[e],
      })),
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "payment",
      label: LABELS.PAYMENT,
      icon: PaymentIcon,
      cardIcon: GreyCardIcon,
      value: {
        name: "All",
        code: "",
      },
      options: Object.keys(PAYMENT_TYPES).map((e) => ({
        name: e,
        code: PAYMENT_TYPES[e],
      })),
    },
    {
      type: INPUT_TYPES.text,
      name: "promocode",
      label: LABELS.PROMOCODE,
      imgsrc: PromoCodeIcon,
      cardIcon: GreyPromoIcon,
      value: "",
    },
  ];

  const [url, setUrl] = useState<string | null>(null);

  const [options, setOptions] = useState<null | ChartOptions>(null);
  const [barChartoptions, setBarChartOptions] = useState<null | ChartOptions>(
    null,
  );
  const [data, setData] = useState<ChartData | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilteredCards, setShowFilteredCards] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [maxOPM, setMaxOPM] = useState<number>(OPM_CHART_DEFAULT.MAX);
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);

  useEffect(() => {
    const removeEventListener = submitOnEnter(submit);
    return removeEventListener;
  }, []);

  useEffect(() => {
    setUrl(
      `${URL_OPM}?period=${location.pathname.includes(ROUTES.opm)
        ? DEFAULT.duration
        : DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION
      }&starttime=${DEFAULT.starttime}&channel=${DEFAULT.channel}&promocode=${DEFAULT.promocode
      }&paymentType=${DEFAULT.paymentType}&country=${DEFAULT.country}`,
    );
  }, []);

  const getData = async (showLoader = true) => {
    try {
      if (showLoader) setIsLoading(true);
      const data = await fetchData(url, {});
      if (showLoader) setIsLoading(false);
      hideLoader();
      setIsLoading(false);
      const xAxisLabels = data.map((e) => e.timestamp);
      const dataArr = data.map((e) => Number(e.orderCount));
      setMaxOPM(
        Math.round(Math.max(...dataArr) / OPM_CHART_DEFAULT.STEP_SIZE) *
        OPM_CHART_DEFAULT.STEP_SIZE +
        OPM_CHART_DEFAULT.STEP_SIZE,
      );
      setData({
        labels: xAxisLabels,
        datasets: [
          {
            label: CHART_LABELS.NO_OF_ORDERS,
            data: dataArr,
            borderColor: "#599DF5",
            pointStyle: "circle",
            borderWidth: 2,
          },
        ],
      });
      setBarChartData({
        labels: xAxisLabels,
        datasets: [
          {
            label: CHART_LABELS.NO_OF_ORDERS,
            data: dataArr,
            borderColor: "#599DF5",
            backgroundColor: "#599DF5",
            borderWidth: 2,
          },
        ],
      });
    } catch (err) {
      console.log(`Error occured while fetching ${url}`);
    }
  };

  useEffect(() => {
    (async () => {
      if (url) {
        setOptions(
          location.pathname.includes(ROUTES.home)
            ? OPM_OPTIONS_HOME(
              width < SCREEN_WIDTH.SM,
              Number(url.split("period=")[1].split("&")[0]) < 16 &&
              width > SCREEN_WIDTH.SM,
            )
            : OPM_OPTIONS(
              width < SCREEN_WIDTH.SM,
              Number(url.split("period=")[1].split("&")[0]) < 16 &&
              width > SCREEN_WIDTH.SM,
            ),
        );
        setBarChartOptions(
          location.pathname.includes(ROUTES.home)
            ? OPM_BAR_CHART_OPTIONS_HOME(
              width < SCREEN_WIDTH.SM,
              Number(url.split("period=")[1].split("&")[0]) < 16 &&
              width > SCREEN_WIDTH.SM,
            )
            : OPM_BAR_CHART_OPTIONS(
              width < SCREEN_WIDTH.SM,
              Number(url.split("period=")[1].split("&")[0]) < 16 &&
              width > SCREEN_WIDTH.SM,
            ),
        );
        await getData();
      }
    })();
  }, [url]);

  const onFilterClickHandler = () => {
    setShowFilters(!showFilters);
    setPosition("bottom");
    setVisible(true);
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const [disabled, setDisabled] = useState(true);

  const handleFormChange = (event) => {
    const data = [...formFields];
    const val = event.target.name || event.value.name;
    if (val === "date") {
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

  const submit = (e) => {
    e.preventDefault();
    let str = ``;
    let dateString = "";
    formFields.forEach((e: any) => {
      if (e.value) {
        if (e.name === "date") {
          dateString = formatDate(e.value, DATE_TIME_FORMAT_3);
          str += `starttime=${dateString}&`;
        } else {
          if (typeof e.value.code === "string" && e.value.code.length === 0) {
            str += `${e.name}=&`;
            return;
          }
          str += `${e.name}=${(e.value.code !== undefined && String(e.value.code)) || e.value
            }&`;
        }
      }
    });
    setUrl(`${URL_OPM}?${str}`);
    if (showFilters && width < SCREEN_WIDTH.SM) setShowFilters(false);
  };

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

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

  const handleOPMExpandClick = () => {
    navigate(ROUTES.opm);
  };

  const handleOPMRefreshBtnClick = () => {
    getData();
  };

  const startPollingHandler = () => {
    (async () => {
      try {
        await getData();
      } catch (err) {
        console.log(`Something went wrong white fetching data : ${err}`);
      }
    })();
  };

  return (
    <>
      {location.pathname.includes(ROUTES.home) && isLoading && (
        <Loader className="!p-0 w-40w m-auto min-h-21r" />
      )
      }
      {
        location.pathname.includes(ROUTES.home) && data && !isLoading && (
          <div className="w-full xl:w-1/2 bg-black-200 rounded-lg px-4 lg:px-6 py-4">
            <div className="flex justify-between items-center relative mb-2 md:mb-4 lg:mb-2 xl:mb-4">
              <span className="text-gray-200 font-bold text-lg font-helvetica">
                {PAGE_TITLES.OPM}
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
                  onClick={handleOPMRefreshBtnClick}
                >
                  <CustomImage src={refreshIcon} />
                </CustomButton>
                <CustomButton
                  className="home-expand-btn ml-2"
                  onClick={handleOPMExpandClick}
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
              <BarChartComp
                title={PAGE_TITLES.OPM}
                options={getChartConfig()}
                data={barChartData}
                className="border-0 w-full h-64"
                defaultClasses={true}
              />
            ) : (
              <LineChart
                title={PAGE_TITLES.OPM}
                className="border-0 w-full h-64"
                options={getChartConfig()}
                data={data}
                defaultClasses={true}
              />
            )}
          </div>
        )
      }
      {
        !IS_FULLSCREEN && location.pathname.includes(ROUTES.opm) && (
          <div className="flex justify-between items-start">
            <p className="font-bold text-gray-200">{PAGE_TITLES.OPM}</p>
            {width < SCREEN_WIDTH.SM && (
              <CustomImage
                src={FilterIcon}
                className="self-end"
                alt="Filter Icon"
                onClick={onFilterClickHandler}
              />
            )}
          </div>
        )
      }
      {
        showFilters && location.pathname.includes(ROUTES.opm) && (
          <>
            {width > SCREEN_WIDTH.SM ? (
              <>
                <form className="lg:flex md:gap-[0.15rem] opmFilters sm:grid sm:grid-cols-3 lg:ml-2 sm:mb-4">
                  {formFields.map((form, index) => {
                    return (
                      <div
                        className="flex justify-center items-center"
                        key={index}
                      >
                        {form.type === INPUT_TYPES.text && (
                          <CustomInputText
                            containerclassname="relative top-0.5 md:-left-0.2w lg:-left-9p"
                            value={form.value}
                            name={form.name}
                            label={form.label}
                            icon={form.imgsrc}
                            placeholder={form.label}
                            imageclassname="relative left-25 z-1"
                            onChange={(event) => handleFormChange(event)}
                            className="border rounded-lg border-solid border-slate-300 border-1 h-38 sm:w-20w lg:w-11w"
                          />
                        )}
                        {form.type === INPUT_TYPES.time && (
                          <CustomCalendar
                            name={form.name}
                            containerclassname="calendarOpmComparison ml-2.5 lg:w-10w lg:w-12w xl:w-14w sm:-mr-1"
                            titleclassname="top-5"
                            imageclassname="h-5 w-5 relative top-7 left-0.5w z-1"
                            placeholder={DATE_AND_TIME_FORMATS.MM_DD_YYYY_HH_MM}
                            title={form.label}
                            showTime={form.showTime}
                            iconPos={form.iconPos || "left"}
                            imgsrc={form.imgsrc}
                            onChange={(event) => handleFormChange(event)}
                            value={form.value}
                            maxDate={
                              form.name === "date" ? CURRENT_PST_DATE : null
                            }
                            dateFormat="dd-MM-yyyy hh:mm"
                          />
                        )}
                        {form.type === INPUT_TYPES.dropdown && (
                          <CustomDropdown
                            value={form.value}
                            name={form.name}
                            onChange={(e) => handleFormChange(e)}
                            containerclassname="sm:w-20w lg:!w-11w"
                            imageclassname="relative left-25 z-1"
                            dropdownIcon={<CustomImage src={ArrowDownIcon} />}
                            icon={form.icon}
                            options={form.options}
                            label={form.label}
                            optionLabel="name"
                            placeholder=""
                          />
                        )}
                      </div>
                    );
                  })}
                </form>
                <CustomButton
                  id="page-btn-submit"
                  btnclassname="w-full"
                  label={LABELS.SUBMIT}
                  isDisabled={disabled}
                  isRounded={true}
                  onClick={submit}
                  className="self-end relative left-5w sm:w-21w md:w-[15vw] lg:w-10w sm:top-[2vh] md:top-0 sm:left-2.5w md:left-[1.5vw] lg:left-1w"
                />
              </>
            ) : (
              <>
                <CustomModal
                  header="Filters"
                  visible={visible}
                  position={position}
                  className="!bg-slate-900 filtersModal opmFiltersMobile h-[450px] w-screen"
                  onHide={onModalCloseHandler}
                  isDraggable={false}
                  closeIcon={<CustomImage src={WhiteCrossIcon} />}
                  isResizable={false}
                >
                  <form
                    className="grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-5"
                    onSubmit={submit}
                  >
                    {formFields.map((form, index) => {
                      return (
                        <React.Fragment key={index}>
                          {form.type === INPUT_TYPES.text && (
                            <CustomInputText
                              containerclassname="w-45w mobileInput"
                              value={form.value}
                              name={form.name}
                              label={form.label}
                              icon={form.imgsrc}
                              imageclassname="relative left-3 md:left-25 z-1"
                              placeholder={form.label}
                              onChange={(event) => handleFormChange(event)}
                              className="border rounded-lg border-solid border-slate-300 border-1 h-10	"
                            />
                          )}
                          {form.type === INPUT_TYPES.time && (
                            <CustomCalendar
                              name={form.name}
                              containerclassname="opmFiltersMobileCalendar"
                              titleclassname="left-1w md:left-0 top-5"
                              imageclassname="h-5 w-5 relative top-7 md:top-3h left-3.5w z-1"
                              title={form.label}
                              showTime={form.showTime}
                              iconPos={form.iconPos || "left"}
                              imgsrc={form.imgsrc}
                              onChange={(event) => handleFormChange(event)}
                              value={form.value}
                              maxDate={
                                form.name === "date" ? CURRENT_PST_DATE : null
                              }
                            />
                          )}
                          {form.type === INPUT_TYPES.dropdown && (
                            <CustomDropdown
                              value={form.value}
                              name={form.name}
                              dropdownIcon={<CustomImage src={DropDownIcon} />}
                              onChange={(e) => handleFormChange(e)}
                              containerclassname="w-44w"
                              imageclassname="relative left-25 z-1"
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
                      label={LABELS.SUBMIT}
                      isDisabled={disabled}
                      isRounded={true}
                      className="submitBtnMobile opmPopUp col-span-full"
                    />
                  </form>
                </CustomModal>
              </>
            )}
          </>
        )
      }

      {
        location.pathname.includes(ROUTES.opm) && showFilteredCards && (
          <div
            className={`flex items-center gap-4 mt-2.5 overflow-auto ml-0 sm:ml-5w lg:ml-4 ${IS_FULLSCREEN
              ? "rotate-90 absolute -left-9h top-45h ml-25w w-70h mt-0"
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
                        ? formatDate(e.value, DATE_TIME_FORMAT_4)
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
        )
      }

      {
        !IS_FULLSCREEN && location.pathname.includes(ROUTES.opm) && (
          <AutoRefresh
            getData={getData}
            startPollingHandler={startPollingHandler}
            inputClassname="w-60w sm:w-38w md:w-24w"
            inputContainerClassname="w-38w md:w-24w"
            checkBoxLabelClassname="text-white-500 text-xs ml-0.5w"
            checkBoxContainerClassname="flex autoRefreshCheckBox sm:ml-2.5w md:ml-1w md:ml-[1.5vw] lg:ml-[1.25vw] items-center mt-3h md:mt-0"
          />
        )
      }
      {
        isLoading && location.pathname.includes(ROUTES.opm) ? (
          <Loader className="h-[50vh]" />
        ) : (
          data &&
          !isLoading &&
          location.pathname.includes(ROUTES.opm) && (
            <div
              className={`relative h-96 lg:h-29r ${IS_FULLSCREEN ? "rotate-90" : ""
                }`}
            >
              <CustomTab
                className={`opm-tabs absolute z-10 pt-2 top-2 ${IS_FULLSCREEN
                  ? "right-100vh-57r"
                  : "right-14 sm:right-3 md:right-4 lg:right-6"
                  }`}
                tabData={CHART_TABS}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
              {tabValue === 0 ? (
                <BarChartComp
                  options={getChartConfig()}
                  data={barChartData}
                  className={`opm-page-chart-container ${IS_FULLSCREEN ? "opm-page-chart-container-rotated" : ""
                    }`}
                  title={PAGE_TITLES.OPM}
                  isFullScreen={IS_FULLSCREEN}
                />
              ) : (
                <LineChart
                  title={PAGE_TITLES.OPM}
                  isFullScreen={IS_FULLSCREEN}
                  className={`opm-page-chart-container ${IS_FULLSCREEN ? "opm-page-chart-container-rotated" : ""
                    }`}
                  options={getChartConfig()}
                  data={data}
                />
              )}
            </div>
          )
        )
      }
    </>
  );
};

export default OPM;