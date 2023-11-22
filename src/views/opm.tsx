import React, { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { ModalEnums, ChartData, ChartOptions } from "../@types/supportHub";
import useScreenSize from "../hooks/useScreenSize";
import CustomDropdown from "../components/DropDown";
import CustomInputText from "../components/InputText";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
import CustomImage from "../components/common/customimage";
import Loader from "../components/loader";

import WhiteCrossIcon from "../assets/white_cross.svg";
import DropDownIcon from "../assets/dropdownIcon.svg";
import ArrowDownIcon from "../assets/arrown_down_white.svg";
import FilterIcon from "../assets/filter.svg";
import ChannelIcon from "../assets/channel.svg";
import LocaleIcon from "../assets/locale.svg";
import PaymentIcon from "../assets/payment.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import GreyChannelIcon from "../assets/channel-grey.svg";
import GreyCalendarIcon from "../assets/calendar-grey.svg";
import WhiteCalendarIcon from "../assets/white_calendar.svg";
import GreyGlobeIcon from "../assets/grey_globe.svg";
import GreyCardIcon from "../assets/grey_card.svg";
import GreyPromoIcon from "../assets/grey_promo.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import PromoCodeIcon from "../assets/promocode.svg";
import openNewPageIcon from "../assets/open_in_new.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import { fetchData } from "../utils/fetchUtil";
import {
  CHANNELS,
  DURATIONS,
  PAYMENT_TYPES,
  LABELS,
  INPUT_TYPES,
  TITLE,
  LOCALE_OPTIONS,
  HOME_PAGE_REFERSH_DURATION,
  MM_DD_YYYY_HH_MM,
  CHART_TABS,
} from "../constants/appConstants";
import { submitOnEnter } from "../components/utils/Utils";
import { URL_OPM } from "../constants/apiConstants";
import { LoaderContext, LoaderContextType } from "../context/loaderContext";
import CustomTab from "../components/common/customtab";
import { OPM_BAR_CHART_OPTIONS, OPM_OPTIONS } from "../config/chartConfig";
import {
  DATE_TIME_FORMAT_2,
  formatDate,
  getFormattedPSTDate,
} from "../utils/dateTimeUtil";
import BarChartComp from "../components/BarChartComp";
import AutoRefresh from "../components/common/AutoRefresh";

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
  const IS_FULLSCREEN = location?.pathname.includes("fullscreen");

  const DEFAULT = {
    duration: 10,
    starttime: "",
    channel: CHANNELS.All,
    promocode: "",
    paymentType: PAYMENT_TYPES.All,
    country: "",
  };

  const DEFAULT_FORM_FIELDS = [
    {
      type: INPUT_TYPES.dropdown,
      name: "period",
      label: LABELS.duration,
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
      label: LABELS.date,
      value: new Date(),
      showTime: true,
      cardIcon: GreyCalendarIcon,
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "channel",
      label: LABELS.channel,
      icon: ChannelIcon,
      cardIcon: GreyChannelIcon,
      value: {
        name: "All",
        code: "",
      },
      options: Object.keys(CHANNELS).map((e) => ({
        name: e,
        code: CHANNELS[e],
      })),
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "locale",
      label: LABELS.locale,
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
      label: LABELS.payment,
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
      label: LABELS.promoCode,
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
  const [tabValue, setTabValue] = useState<number>(1);
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);

  useEffect(() => {
    const removeEventListener = submitOnEnter(submit);
    return removeEventListener;
  }, []);

  useEffect(() => {
    setUrl(
      `${URL_OPM}?period=${
        location.pathname.includes("opm")
          ? DEFAULT.duration
          : HOME_PAGE_REFERSH_DURATION
      }&starttime=${DEFAULT.starttime}&channel=${DEFAULT.channel}&promocode=${
        DEFAULT.promocode
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
      setData({
        labels: xAxisLabels,
        datasets: [
          {
            label: "No of orders",
            data: dataArr,
            borderColor: "#599DF5",
            pointStyle: "circle",
            backgroundColor: "white",
            borderWidth: 2,
          },
        ],
      });
      setBarChartData({
        labels: xAxisLabels,
        datasets: [
          {
            label: "No of orders",
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
          OPM_OPTIONS(
            width < 640,
            Number(url.split("period=")[1].split("&")[0]) < 16,
          ),
        );
        setBarChartOptions(
          OPM_BAR_CHART_OPTIONS(
            width < 640,
            Number(url.split("period=")[1].split("&")[0]) < 16,
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
        ? new Date()
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

  const submit = (e) => {
    e.preventDefault();
    let str = ``;
    let dateString = "";
    formFields.forEach((e: any) => {
      if (e.value) {
        if (e.name === "date") {
          dateString = getFormattedPSTDate(e.value);
          str += `starttime=${dateString}&`;
        } else {
          if (typeof e.value.code === "string" && e.value.code.length === 0) {
            str += `${e.name}=&`;
            return;
          }
          str += `${e.name}=${
            (e.value.code !== undefined && String(e.value.code)) || e.value
          }&`;
        }
      }
    });
    setUrl(`${URL_OPM}?${str}`);
    if (showFilters && width < 640) setShowFilters(false);
  };

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  const getChartConfig = () => {
    const customChartConfig = { ...options };
    if (width < 640) {
      customChartConfig.layout.padding.top = 70;
      customChartConfig.layout.padding.bottom = 0;
    } else {
      customChartConfig.layout.padding.top = 20;
      customChartConfig.layout.padding.left = 10;
      customChartConfig.layout.padding.right = 20;
    }
    return customChartConfig;
  };

  const handleOPMExpandClick = () => {
    navigate("/opm");
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
      {location.pathname.includes("home") && isLoading && (
        <Loader className="!p-0 w-[40vw] m-auto" />
      )}
      {location.pathname.includes("home") && data && !isLoading && (
        <div className="w-full lg:w-[49%] bg-[#22262C] p-0 rounded-lg">
          <div className="flex justify-between items-center relative top-[3vh] z-[1] ml-[5vw] sm:ml-[2vw] mr-[1vw]">
            <span className="text-[#F2F2F2] font-bold text-lg font-helvetica">
              {TITLE.OPM}
            </span>
            <div className="flex items-center">
              <CustomTab
                className="opm-tabs mr-2"
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
                className="home-expand-btn mr-2 ml-2 sm:mr-0"
                onClick={handleOPMExpandClick}
              >
                <CustomImage src={openNewPageIcon} />
              </CustomButton>
            </div>
          </div>
          <>
            {tabValue === 0 ? (
              <BarChartComp
                title={TITLE.OPM}
                options={barChartoptions}
                data={barChartData}
                className="home-opm border-0 rounded-[10px] w-full lg:w-full lg:ml-[0] h-[380px] lg:h-[380px] lg:mt-[3vh] top-[-5vh]"
                defaultClasses={true}
              />
            ) : (
              <LineChart
                title={TITLE.OPM}
                className="home-opm border-0 rounded-[10px] w-full lg:w-full sm:ml-[0] h-[380px] lg:h-[380px] lg:mt-[3vh] top-[-5vh]"
                options={getChartConfig()}
                data={data}
                defaultClasses={true}
              />
            )}
          </>
        </div>
      )}
      {!IS_FULLSCREEN && location.pathname.includes("opm") && (
        <div className="flex justify-between items-start">
          <p className="font-bold w-[50vw] text-[#F2F2F2] w-[50vw] lg:w-[30vw] sm:ml-[2.5vw] md:ml-[1.5vw] lg:ml-[1vw]">
            {TITLE.OPM}
          </p>
          {width < 640 && (
            <CustomImage
              src={FilterIcon}
              className="lg:w-[2.34vw] self-end"
              alt="Filter Icon"
              onClick={onFilterClickHandler}
            />
          )}
        </div>
      )}
      {showFilters && location.pathname.includes("opm") && (
        <>
          {width > 640 ? (
            <>
              <form
                className="lg:flex md:gap-[0.15rem] opmFilters sm:grid sm:grid-cols-3 lg:ml-[0.5rem] sm:mb-4"
              >
                {formFields.map((form, index) => {
                  return (
                    <div
                      className="flex justify-center items-center"
                      key={index}
                    >
                      {form.type === INPUT_TYPES.text && (
                        <CustomInputText
                          containerclassname="relative top-[2px] md:left-[-0.2vw] lg:left-[-9px]"
                          value={form.value}
                          name={form.name}
                          label={form.label}
                          icon={form.imgsrc}
                          placeholder={form.label}
                          imageclassname="relative left-[25px] z-[1]"
                          onChange={(event) => handleFormChange(event)}
                          className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px] sm:w-[20vw] lg:w-[11vw]"
                        />
                      )}
                      {form.type === INPUT_TYPES.time && (
                        <CustomCalendar
                          name={form.name}
                          containerclassname="calendarOpmComparison ml-[10px] lg:w-[10vw] lg:w-[12vw] xl:w-[14vw] sm:mr-[-0.25rem]"
                          titleclassname="top-[1.25rem]"
                          imageclassname="h-[20px] w-[20px] relative top-[1.75rem] left-[0.5vw] z-[1]"
                          placeholder={MM_DD_YYYY_HH_MM}
                          title={form.label}
                          showTime={form.showTime}
                          iconPos={form.iconPos || "left"}
                          imgsrc={form.imgsrc}
                          onChange={(event) => handleFormChange(event)}
                          value={form.value}
                          maxDate={form.name === "date" ? new Date() : null}
                          dateFormat="dd-MM-yyyy hh:mm"
                        />
                      )}
                      {form.type === INPUT_TYPES.dropdown && (
                        <CustomDropdown
                          value={form.value}
                          name={form.name}
                          onChange={(e) => handleFormChange(e)}
                          containerclassname="sm:w-[20vw] lg:!w-[11vw]"
                          imageclassname="relative left-[25px] z-[1]"
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
                label={LABELS.submit}
                isDisabled={disabled}
                isRounded={true}
                onClick={submit}
                className="self-end relative left-[5vw] sm:w-[21vw] md:w-[15vw] lg:w-[10vw] sm:top-[2vh] md:top-[0] sm:left-[2.5vw] md:left-[1.5vw] lg:left-[1vw]"
              />
            </>
          ) : (
            <>
              <CustomModal
                header="Filters"
                visible={visible}
                position={position}
                className="!bg-slate-900 filtersModal opmFiltersMobile h-[450px] w-[100vw]"
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
                            containerclassname="w-[45vw] mobileInput"
                            value={form.value}
                            name={form.name}
                            label={form.label}
                            icon={form.imgsrc}
                            imageclassname="relative left-[12px] md:left-[25px] z-[1]"
                            placeholder={form.label}
                            onChange={(event) => handleFormChange(event)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[40px]"
                          />
                        )}
                        {form.type === INPUT_TYPES.time && (
                          <CustomCalendar
                            name={form.name}
                            containerclassname="opmFiltersMobileCalendar"
                            titleclassname="left-[1vw] md:left-[0] top-[1.25rem]"
                            imageclassname="h-[20px] w-[20px] relative top-[1.75rem] md:top-[3vh] left-[3.5vw] z-[1]"
                            title={form.label}
                            showTime={form.showTime}
                            iconPos={form.iconPos || "left"}
                            imgsrc={form.imgsrc}
                            onChange={(event) => handleFormChange(event)}
                            value={form.value}
                            maxDate={form.name === "date" ? new Date() : null}
                          />
                        )}
                        {form.type === INPUT_TYPES.dropdown && (
                          <CustomDropdown
                            value={form.value}
                            name={form.name}
                            dropdownIcon={<CustomImage src={DropDownIcon} />}
                            onChange={(e) => handleFormChange(e)}
                            containerclassname="w-[44vw]"
                            imageclassname="relative left-[25px] z-[1]"
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
                    label={LABELS.submit}
                    isDisabled={disabled}
                    isRounded={true}
                    className="submitBtnMobile opmPopUp col-span-full"
                  />
                </form>
              </CustomModal>
            </>
          )}
        </>
      )}

      {location.pathname.includes("opm") && showFilteredCards && (
        <div
          className={`flex items-center gap-4 mt-[10px] overflow-auto ml-[0] sm:ml-[5vw] lg:ml-[1rem] ${
            IS_FULLSCREEN
              ? "rotate-90 absolute left-[-9vh] top-[45vh] ml-[25vw] w-[70vh] mt-[0]"
              : `${width < 640 ? "portrait" : ""}`
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
                      ? formatDate(e.value, DATE_TIME_FORMAT_2)
                      : e.value.name || e.value
                  }
                />
              </Fragment>
            ))}
          {!disabled && !IS_FULLSCREEN && (
            <CustomButton
              label={LABELS.reset}
              severity="secondary"
              className="resetFilters text-[12px] text-[#575353]"
              isTextButton={true}
              onClick={() => setFormFields(DEFAULT_FORM_FIELDS)}
            />
          )}
        </div>
      )}

      {!IS_FULLSCREEN && location.pathname.includes("opm") && (
        <AutoRefresh
          getData={getData}
          startPollingHandler={startPollingHandler}
          inputClassname="w-[60vw] sm:w-[38vw] md:w-[24vw]"
          inputContainerClassname="w-[38vw] md:w-[24vw]"
          checkBoxLabelClassname="text-white text-[12px] ml-[0.5vw]"
          checkBoxContainerClassname="flex autoRefreshCheckBox sm:ml-[2.5vw] md:ml-[1vw] md:ml-[1.5vw] lg:ml-[1.25vw] items-center mt-[3vh] md:mt-[0]"
        />
      )}
      {isLoading && location.pathname.includes("opm") ? (
        <Loader className="h-[50vh]" />
      ) : (
        data &&
        !isLoading &&
        location.pathname.includes("opm") && (
          <div className="relative">
            <CustomTab
              className={`opm-tabs absolute ${
                IS_FULLSCREEN
                  ? "rotate-90 right-[-10rem] top-[1.35rem] relative top-[75vh] left-[59vw]"
                  : "right-[15vw] sm:right-[2vw] top-[3vh] sm:top-[1vh] lg:right-[4%]"
              }  z-10`}
              tabData={CHART_TABS}
              tabValue={tabValue}
              setTabValue={setTabValue}
            />
            {tabValue === 0 ? (
              <BarChartComp
                options={barChartoptions}
                data={barChartData}
                className="opm-page-chart-container pt-2 px-4"
                title={TITLE.OPM}
                isFullScreen={IS_FULLSCREEN}
              />
            ) : (
              <LineChart
                title={TITLE.OPM}
                isFullScreen={IS_FULLSCREEN}
                className="opm-page-chart-container pt-2 px-4"
                options={options}
                data={data}
              />
            )}
          </div>
        )
      )}
    </>
  );
};

export default OPM;
