import React, { Fragment, useEffect, useState } from "react";
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

import {
  OPM_COMPARISON_OPTIONS,
  OPM_COMPARISON_OPTIONS_HOME,
  CHANNELS,
  DURATIONS,
  LABELS,
  TITLE,
  INPUT_TYPES,
  HOME_PAGE_REFERSH_DURATION,
} from "../constants/appConstants";
import { URL_OPM_COMPARISON } from "../constants/apiConstants";
import { fetchData } from "../utils/fetchUtil";
import { tenMinutesAgoInCurrentTimeZone } from "../utils/dateTimeUtil";

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

  const { width } = useScreenSize();
  const navigate = useNavigate();
  const IS_FULLSCREEN = location?.pathname.includes("fullscreen");

  const DEFAULT = {
    duration: 10,
    startTimeOne: tenMinutesAgoInCurrentTimeZone(),
    startDateTwo: new Date(Date.now() - 86400000).toLocaleDateString("en-US"),
    channel: "",
  };

  const [url, setUrl] = useState<string | null>(null);

  const [options, setOptions] = useState<null | ChartOptions>(null);
  const [data, setData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFilteredCards, setShowFilteredCards] = useState<boolean>(false);

  const [disabled, setDisabled] = useState(true);

  const [formFields, setFormFields] = useState([
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
      value: new Date(Date.now() - 600000),
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.time,
      name: "endDate",
      label: LABELS.endDate,
      cardIcon: GreyCalendarIcon,
      showTime: false,
      value: new Date(Date.now() - 86400000),
      imgsrc: WhiteCalendarIcon,
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "channel",
      label: LABELS.channel,
      icon: ChannelIcon,
      cardIcon: GreyChannelIcon,
      value: {
        name: "ALL",
        code: "",
      },
      options: Object.keys(CHANNELS).map((e) => ({
        name: e,
        code: CHANNELS[e],
      })),
    },
  ]);

  useEffect(() => {
    setUrl(
      `${URL_OPM_COMPARISON}?period=${
        location.pathname.includes("opm")
          ? DEFAULT.duration
          : HOME_PAGE_REFERSH_DURATION
      }&startTimeOne=${DEFAULT.startTimeOne}&startDateTwo=${
        DEFAULT.startDateTwo
      }&channel=${DEFAULT.channel}`,
    );
  }, []);

  const handleFormChange = (event) => {
    const data = [...formFields];
    const val = event.target.name || event.value.name;
    if (val === "date") {
      data.find((e) => e.name === val).value = event.value;
    } else {
      data.find((e) => e.name === val).value = event.target.value;
    }
    setShowFilteredCards(true);
    setFormFields(data);
  };

  const removeFormEntry = (event) => {
    const data = [...formFields];
    data.find((e) => e.name === event.target.id).value = null;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    let str = ``;
    formFields.forEach((e: any) => {
      if (e.value) {
        if (e.name === "startDate") {
          str += `startTimeOne=${tenMinutesAgoInCurrentTimeZone(
            e.value.toISOString(),
          )}&`;
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
    if (showFilters && width < 700) setShowFilters(false);
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
              isMobile: width < 700,
              showDataLabels:
                Number(url.split("period=")[1].split("&")[0]) < 16,
            })
          : OPM_COMPARISON_OPTIONS({
              apiResponse,
              startDate: formFields.find((e) => e.name === "startDate").value,
              endDate: formFields.find((e) => e.name === "endDate").value,
              isMobile: width < 700,
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
        setIsLoading(false);
        setApiResponse(data);
      }
    } catch (err) {
      console.log(`Error occured while fetching ${url}`);
    }
  };

  const clearAllHandler = () => {
    const data = [...formFields];
    data.forEach((e) => (e.value = ""));
    setFormFields(data);
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
    if (width < 700) {
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
    if (width < 700) {
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
    getData();
  };

  return (
    <>
      {location.pathname.includes("home") && isLoading && (
        <Loader className="!p-0 w-[40vw]" />
      )}
      {location.pathname.includes("home") && !isLoading && data && (
        <div className="w-full sm:w-1/2 bg-[#22262C] p-0 bg-transparent rounded-lg flex flex-col justify-between">
          <div className="flex justify-between sm:mb-3 items-center relative top-[3vh] z-[1] ml-[5vw] sm:ml-[2vw] mr-[1vw]">
            <span className="text-[#F2F2F2] font-bold text-lg font-helvetica">
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
            className="home-opm-comp border-0 rounded-[10px] w-full sm:w-[89vw] lg:w-full lg:ml-[0] h-[340px] lg:h-[380px] top-[-5vh]"
            options={getChartConfig()}
            data={data}
          />
        </div>
      )}
      {!IS_FULLSCREEN && location.pathname.includes("opmcomparison") && (
        <div className="flex justify-between items-start lg:mt-[4vh] ml-[6vw] mr-[6vw] sm:ml-[1vw] sm:mr-0  lg:ml-[0.5vw] mt-[3vh]">
          <p className="font-bold w-[50vw] text-[#F2F2F2] w-[50vw] lg:w-[30vw]">
            {TITLE.OPM_COMPARISON}
          </p>
          {width < 700 && (
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
          {width > 700 ? (
            <form
              className="flex gap-[0.5vw] sm:gap-[0.1vw] opmFilters"
              onSubmit={submit}
            >
              {formFields.map((form, index) => {
                return (
                  <React.Fragment key={index}>
                    {form.type === "text" && (
                      <CustomInputText
                        containerclassname="lg:relative lg:top-[2px] lg:left-[-9px]"
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
                        containerclassname="calendarOpmComparison ml-[10px] md:w-[10vw] lg:w-[12vw] xl:w-[14vw]"
                        titleclassname="top-[2vh]"
                        imageclassname="h-[20px] w-[20px] relative top-[3vh] left-[0.5vw] z-[1]"
                        title={form.label}
                        showTime={form.showTime}
                        iconPos={form.iconPos || "left"}
                        imgsrc={form.imgsrc}
                        onChange={(event) => handleFormChange(event)}
                        value={form.value}
                      />
                    )}
                    {form.type === "dropdown" && (
                      <CustomDropdown
                        value={form.value}
                        name={form.name}
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
                className="ml-[1vw] self-end relative"
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
                            imageclassname="h-[20px] w-[20px] relative top-[4vh] md:top-[3vh] left-[3.5vw] z-[1]"
                            titleclassname="left-[1vw] md:left-[0] top-[2.2vh]"
                            title={form.label}
                            showTime={form.showTime}
                            iconPos={form.iconPos || "left"}
                            imgsrc={form.imgsrc}
                            onChange={(event) => handleFormChange(event)}
                            value={form.value}
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
          className={`flex items-center gap-4 mt-[10px] overflow-scroll ml-[5vw] lg:ml-[0.5vw] ${
            IS_FULLSCREEN
              ? "landScape opmComparison rotate-90 absolute left-[40vw] top-[45vh]"
              : `${width < 700 ? "portrait" : ""}`
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
              className="resetFilters text-[12px] text-[#575353]"
              isTextButton={true}
              onClick={clearAllHandler}
            />
          )}
        </div>
      )}
      {isLoading && location.pathname.includes("opmcomparison") ? (
        <Loader />
      ) : (
        data &&
        !isLoading &&
        location.pathname.includes("opmcomparison") && (
          <LineChart
            title={TITLE.OPM_COMPARISON}
            isFullScreen={IS_FULLSCREEN}
            className="border-0 rounded-[10px] sm:w-[70vw] lg:w-[75vw] lg:ml-[0] h-[340px] md:h-[340px] lg:h-[62.23vh] mt-[10vh] md:mt-[1vh] lg:mt-[3vh]"
            options={options}
            data={data}
          />
        )
      )}
    </>
  );
};

export default OpmComparison;
