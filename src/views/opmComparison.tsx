import React, { Fragment, useEffect, useState, useContext } from "react";
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

import {
  ModalEnums,
  ChartData,
  ChartOptions,
  OpmComparisonType,
} from "../@types/supportHub";
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
import SandGlassIcon from "../assets/sandglass.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import openNewPageIcon from "../assets/open_in_new.svg";
import WhiteCalendarIcon from "../assets/white_calendar.svg";
import GreyCalendarIcon from "../assets/calendar-grey.svg";
import GreyChannelIcon from "../assets/channel-grey.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import { submitOnEnter } from "../components/utils/Utils";
import {
  CHANNELS,
  DURATIONS,
  LABELS,
  TITLE,
  INPUT_TYPES,
  HOME_PAGE_REFERSH_DURATION,
  MM_DD_YYYY_HH_MM,
} from "../constants/appConstants";
import { URL_OPM_COMPARISON } from "../constants/apiConstants";
import { fetchData } from "../utils/fetchUtil";
import { LoaderContext, LoaderContextType } from "../context/loaderContext";
import { getFormattedPSTDate, getPSTdate } from "../utils/dateTimeUtil";
import {
  OPM_COMPARISON_OPTIONS,
  OPM_COMPARISON_OPTIONS_HOME,
} from "../config/chartConfig";

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
  const [position, setPosition] = useState<ModalEnums>("center");
  const [apiResponse, setApiResponse] = useState<null | OpmComparisonType>(
    null,
  );
  const [counter, setCounter] = useState<number>(0);

  const { width } = useScreenSize();
  const navigate = useNavigate();
  const IS_FULLSCREEN = location?.pathname.includes("fullscreen");

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
  const [data, setData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilteredCards, setShowFilteredCards] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const { hideLoader } = useContext(LoaderContext) as LoaderContextType;
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
      name: "startDate",
      label: LABELS.startDate,
      showTime: true,
      cardIcon: GreyCalendarIcon,
      value: new Date(DEFAULT.startTimeOne),
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.time,
      name: "endDate",
      label: LABELS.endDate,
      cardIcon: GreyCalendarIcon,
      showTime: false,
      value: new Date(DEFAULT.startDateTwo),
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
  ];
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);

  useEffect(() => {
    const startTimeOne = getFormattedPSTDate();
    const startDateTwo = new Date(
      new Date(getPSTdate(new Date())).getTime() - 86400000,
    ).toLocaleDateString("en-US");
    setUrl(
      `${URL_OPM_COMPARISON}?period=${
        location.pathname.includes("opm")
          ? DEFAULT.duration
          : HOME_PAGE_REFERSH_DURATION
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
    formFields.forEach((e: any) => {
      if (e.value) {
        if (e.name === "startDate") {
          str += `startTimeOne=${getFormattedPSTDate(e.value)}&`;
          return;
        }
        if (e.name === "endDate") {
          str += `startDateTwo=${e.value.toLocaleDateString("en-US")}&`;
          return;
        }
        str += `${e.name}=${String(e.value.code)}&`;
      }
    });
    setUrl(`${URL_OPM_COMPARISON}?${str}`);
    if (showFilters && width < 640) setShowFilters(false);
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
      setData({
        labels: apiResponse["opmOne"].map((e) => e.timestamp),
        datasets:
          apiResponse &&
          Object.keys(apiResponse)?.map((e, index) => ({
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            data: apiResponse?.[e].map((e) => Number(e.orderCount)),
            backgroundColor: "white",
            label: "No of orders",
            index,
            borderColor: index === 0 ? "#6370FF" : "#FDA44F",
            borderWidth: 2,
          })),
      });
      setOptions(
        location.pathname.includes("home")
          ? OPM_COMPARISON_OPTIONS_HOME({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < 640,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 16,
            })
          : OPM_COMPARISON_OPTIONS({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < 640,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 16,
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
    if (width < 640) {
      setPosition("bottom");
      setVisible(true);
    }
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const getChartConfig = () => {
    const customChartConfig = { ...options };
    if (width < 640) {
      customChartConfig.layout.padding.top = 70;
      customChartConfig.layout.padding.bottom = 20;
    } else {
      customChartConfig.layout.padding.top = 70;
    }
    return customChartConfig;
  };

  const handleOPMCompExpandClick = () => {
    navigate("/opmcomparison");
  };

  const handleOPMCompRefreshBtnClick = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      {location.pathname.includes("home") && isLoading && (
        <Loader className="!p-0 w-[40vw] m-auto" />
      )}
      {location.pathname.includes("home") && !isLoading && data && (
        <div className="w-full lg:w-[49%] bg-black-200 p-0 rounded-lg">
          <div className="flex justify-between sm:mb-3 items-center relative top-[3vh] z-[1] ml-[5vw] sm:ml-[2vw] mr-[1vw]">
            <span className="text-gray-200 font-bold text-lg font-helvetica">
              {TITLE.OPM_COMPARISON}
            </span>
            <div className="flex items-center">
              <CustomButton
                className="home-refresh-btn"
                onClick={handleOPMCompRefreshBtnClick}
              >
                <CustomImage src={refreshIcon} />
              </CustomButton>
              <CustomButton
                className="home-expand-btn mr-2 ml-2 sm:mr-0"
                onClick={handleOPMCompExpandClick}
              >
                <CustomImage src={openNewPageIcon} />
              </CustomButton>
            </div>
          </div>
          <LineChart
            title="OPM Comparison"
            className="home-opm-comp border-0 rounded-[10px] w-full lg:w-full sm:ml-[0] h-[400px] lg:h-[424px] relative top-[-4vh] 3xl:top-[-4vh]"
            options={getChartConfig()}
            data={data}
            defaultClasses={true}
            plugins={true}
          />
        </div>
      )}
      {location.pathname.includes("opmcomparison") && (
        <div
          className={`${isLoading ? "h-[80%]" : ""} ${
            IS_FULLSCREEN ? "" : "sm:mx-4"
          }`}
        >
          {!IS_FULLSCREEN && location.pathname.includes("opmcomparison") && (
            <div className="flex justify-between items-start ml-[1vw] md:ml-[6vw] mr-[0] md:mr-[6vw] sm:ml-[1vw] sm:mr-0  lg:ml-0">
              <p className="font-bold w-[50vw] text-gray-200 w-[50vw] lg:w-[30vw] sm:ml-[-1vw] md:ml-[-6vw] lg:ml-[0]">
                {TITLE.OPM_COMPARISON}
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
          {showFilters && location.pathname.includes("opmcomparison") && (
            <>
              {width > 640 ? (
                <form
                  className="flex gap-[0.5vw] sm:gap-[0.8vw] opmFilters opmComparisonFilters"
                  onSubmit={submit}
                >
                  {formFields.map((form, index) => {
                    return (
                      <React.Fragment key={index}>
                        {form.type === "text" && (
                          <CustomInputText
                            containerclassname="relative top-[2px] md:left-[-0.2vw] lg:left-[-9px]"
                            value={form.value}
                            name={form.label}
                            placeholder={form.label}
                            onChange={(event) => handleFormChange(event)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px] w-[8vw] lg:w-[10vw]"
                          />
                        )}
                        {form.type === "time" && (
                          <CustomCalendar
                            name={form.name}
                            containerclassname={`calendarOpmComparison ${
                              form.name === "startDate"
                                ? "md:!w-[18vw] lg:w-[14vw]"
                                : ""
                            } ${
                              form.name === "endDate"
                                ? "md:!w-[11vw] lg:!w-[12vw]"
                                : ""
                            } `}
                            titleclassname="top-[1.25rem]"
                            imageclassname="h-[20px] w-[20px] relative top-[1.75rem] left-[0.5vw] z-[1]"
                            title={form.label}
                            placeholder={MM_DD_YYYY_HH_MM}
                            showTime={form.showTime}
                            iconPos={form.iconPos || "left"}
                            imgsrc={form.imgsrc}
                            onChange={(event) => handleFormChange(event)}
                            value={form.value}
                            maxDate={
                              form.name === "startDate" ||
                              form.name === "endDate"
                                ? new Date()
                                : null
                            }
                          />
                        )}
                        {form.type === "dropdown" && (
                          <CustomDropdown
                            name={form.name}
                            value={form.value}
                            containerclassname="opmComparionInput"
                            onChange={(e) => handleFormChange(e)}
                            imageclassname="relative left-[25px] z-[1]"
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
                    label={LABELS.submit}
                    isDisabled={disabled}
                    isRounded={true}
                    className="ml-auto  self-end relative "
                  />
                </form>
              ) : (
                <>
                  <CustomModal
                    header="Filters"
                    visible={visible}
                    position={position}
                    className="!bg-slate-900 filtersModal opmFiltersMobile h-[350px] w-[100vw]"
                    onHide={onModalCloseHandler}
                    isDraggable={false}
                    closeIcon={<CustomImage src={WhiteCrossIcon} />}
                    isResizable={false}
                  >
                    <form
                      className="grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-5"
                      onSubmit={submit}
                    >
                      {formFields.map((form) => {
                        return (
                          <>
                            {form.type === INPUT_TYPES.text && (
                              <CustomInputText
                                containerclassname="w-[45vw] mobileInput"
                                value={form.value}
                                name={form.label}
                                placeholder={form.label}
                                onChange={(event) => handleFormChange(event)}
                                className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                              />
                            )}
                            {form.type === INPUT_TYPES.time && (
                              <CustomCalendar
                                name={form.name}
                                containerclassname="opmFiltersMobileCalendar"
                                imageclassname="h-[20px] w-[20px] relative top-[1.75rem] md:top-[3vh] left-[3.5vw] z-[1]"
                                titleclassname="left-[2vw] md:left-[0] top-[1.25rem]"
                                title={form.label}
                                showTime={form.showTime}
                                iconPos={form.iconPos || "left"}
                                imgsrc={form.imgsrc}
                                onChange={(event) => handleFormChange(event)}
                                value={form.value}
                                maxDate={
                                  form.name === "startDate" ||
                                  form.name === "endDate"
                                    ? new Date()
                                    : null
                                }
                              />
                            )}
                            {form.type === INPUT_TYPES.dropdown && (
                              <CustomDropdown
                                value={form.value}
                                name={form.name}
                                dropdownIcon={
                                  <CustomImage src={DropDownIcon} />
                                }
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
                          </>
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
          {location.pathname.includes("opmcomparison") && showFilteredCards && (
            <div
              className={`flex items-center gap-4 mt-[10px] overflow-auto ml-[5vw] lg:ml-[0] ${
                IS_FULLSCREEN
                  ? "landScape opmComparison rotate-90 absolute left-[-9vh] top-[45vh] ml-[25vw] w-[70vh] mt-[0]"
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
                          ? e.name === "startDate"
                            ? e.value.toLocaleString("en-US", {
                                hour12: false,
                              })
                            : e.value.toLocaleDateString("en-US")
                          : e.value.name || e.value
                      }
                    />
                  </Fragment>
                ))}
              {!disabled && !IS_FULLSCREEN && (
                <CustomButton
                  label={LABELS.reset}
                  severity="secondary"
                  className="resetFilters text-[12px] text-gray-300"
                  isTextButton={true}
                  onClick={() => setFormFields(DEFAULT_FORM_FIELDS)}
                />
              )}
            </div>
          )}
          {isLoading && location.pathname.includes("opmcomparison") ? (
            <Loader className="h-full" />
          ) : (
            data &&
            !isLoading &&
            location.pathname.includes("opmcomparison") && (
              <LineChart
                title={TITLE.OPM_COMPARISON}
                isFullScreen={IS_FULLSCREEN}
                className={`border-0 rounded-[10px] sm:w-[66vw] lg:w-[72.75vw] h-[340px] md:h-[340px] lg:h-[62.23vh] sm:mt-[10vh] md:mt-[5vh] lg:mt-[3vh] ${
                  IS_FULLSCREEN
                    ? "ml-[-3rem] pb-[1rem] !w-[90vh] !ml-[-60vw]"
                    : "!ml-[0] lg:!ml-[0]"
                }`}
                options={options}
                data={data}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default OpmComparison;
