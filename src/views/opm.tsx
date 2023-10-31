import React, { useEffect, useState, Fragment } from "react";
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
import GreyGlobeIcon from "../assets/grey_globe.svg";
import GreyCardIcon from "../assets/grey_card.svg";
import GreyPromoIcon from "../assets/grey_promo.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import PromoCodeIcon from "../assets/promocode.svg";
import open_in_new from "../assets/open_in_new.svg";
import { fetchData } from "../utils/fetchUtil";
import {
  CHANNELS,
  OPM_OPTIONS,
  DURATIONS,
  PAYMENT_TYPES,
  LABELS,
  INPUT_TYPES,
  TITLE,
  LOCALE_OPTIONS,
} from "../constants/appConstants";
import { URL_OPM } from "../constants/apiConstants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const OPM: React.FC = () => {
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ModalEnums>("center");

  const { width } = useScreenSize();
  const navigate = useNavigate();
  const IS_FULLSCREEN = location?.pathname.includes("fullscreen");

  const DEFAULT = {
    duration: 10,
    starttime: new Date(),
    channel: CHANNELS.DESKTOP,
    promocode: "",
    paymentType: "",
    country: "US",
  };

  const [url, setUrl] = useState<string>(
    `${URL_OPM}?period=${DEFAULT.duration}&date=${DEFAULT.starttime}&channel=${DEFAULT.channel}&promocode=${DEFAULT.promocode}&paymentType=${DEFAULT.paymentType}&country=${DEFAULT.country}`
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);
  const [data, setData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getGradient(ctx, chartArea) {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0.9, "#5A9EF566");
    gradient.addColorStop(0.4, "#5A9EF52F");
    gradient.addColorStop(0, "#5A9EF500");
    return gradient;
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(url, {});
      setIsLoading(false);
      setData({
        labels: data.map((e) => e.timestamp),
        datasets: [
          {
            label: "No of orders",
            data: data.map((e) => Number(e.orderCount)),
            borderColor: "#599DF5",
            pointStyle: "circle",
            fill: true,
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return;
              return getGradient(ctx, chartArea);
            },
            borderWidth: 2,
          },
        ],
      });
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
      setOptions(OPM_OPTIONS(width < 700));
      await getData();
    })();
  }, [url]);

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

  const [disabled, setDisabled] = useState(true);

  const [formFields, setFormFields] = useState([
    {
      type: INPUT_TYPES.dropdown,
      name: "period",
      label: LABELS.duration,
      icon: SandGlassIcon,
      cardIcon: GreyHourGlassIcon,
      value: "",
      options: Object.keys(DURATIONS).map((e) => ({
        name: e,
        code: DURATIONS[e],
      })),
    },
    {
      type: INPUT_TYPES.time,
      name: "date",
      label: LABELS.date,
      value: "",
      showTime: true,
      cardIcon: GreyCalendarIcon,
      imgsrc: "src/assets/white_calendar.svg",
    },
    {
      type: INPUT_TYPES.dropdown,
      name: "channel",
      label: LABELS.channel,
      icon: ChannelIcon,
      cardIcon: GreyChannelIcon,
      value: "",
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
      value: "",
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
      value: "",
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
  ]);

  const handleFormChange = (event) => {
    const data = [...formFields];
    const val = event.target.name || event.value.name;
    if (val === "date") {
      data.find((e) => e.name === val).value = event.value;
    } else {
      data.find((e) => e.name === val).value = event.target.value;
    }
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
        if (typeof e.value.code === "string" && e.value.code.length === 0) {
          str += `${e.name}=&`;
          return;
        }
        str += `${e.name}=${
          (e.value.code && String(e.value.code)) || e.value
        }&`;
      }
    });
    setUrl(`${URL_OPM}?${str}`);
    if (showFilters && width < 700) setShowFilters(false);
  };

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  useEffect(() => {
    // on page load, we compare yesterday with today;
    handleFormChange({
      target: {
        name: "date",
        value: new Date(Date.now() - 86400000),
      },
    });
  }, []);

  const getChartConfig = () => {
    const customChartConfig = { ...options };
    if (width < 700) {
      customChartConfig.layout.padding.top = 70;
      customChartConfig.layout.padding.bottom = 0;
    } else {
      customChartConfig.layout.padding.top = 100;
    }
    return customChartConfig;
  };

  const handleOPMExpandClick = () => {
    navigate("/opm");
  };

  return (
    <>
      {location.pathname.includes("home") && data && (
        <div className="w-full sm:w-1/2 bg-[#22262C] p-0 bg-transparent rounded-lg">
          <div className="flex justify-between mb-3 items-center relative top-[3vh] sm:top-[6vh] z-[1] ml-[5vw] sm:ml-[2vw] mr-[1vw]">
            <span className="text-[#F2F2F2] font-bold text-lg font-helvetica">
              {TITLE.OPM}
            </span>
            <div>
              <button
                className="rounded-full pr-2"
                onClick={handleOPMExpandClick}
              >
                <CustomImage src={open_in_new} />
              </button>
            </div>
          </div>
          <LineChart
            title="OPM"
            className="home-opm border-0 rounded-[10px] w-[89vw] lg:w-full lg:ml-[0] h-[380px] lg:h-[380px] lg:mt-[3vh] top-[-5vh]"
            options={getChartConfig()}
            data={data}
          />
        </div>
      )}
      {!IS_FULLSCREEN && location.pathname.includes("opm") && (
        <div className="flex justify-between items-start lg:mb-[2vh] lg:mt-[4vh] ml-[5vw] lg:ml-[3vw] mr-[5vw] lg:mr-[3vw] mt-[3vh]">
          <p className="font-bold w-[50vw] text-[#F2F2F2] w-[50vw] lg:w-[30vw]">
            {TITLE.OPM}
          </p>
          <CustomImage
            src={FilterIcon}
            className="lg:w-[2.34vw] self-end"
            alt="Filter Icon"
            onClick={onFilterClickHandler}
          />
        </div>
      )}
      {showFilters && location.pathname.includes("opm") && (
        <>
          {width > 700 ? (
            <form
              className="flex gap-[1vw] ml-[2.4vw] opmFilters"
              onSubmit={submit}
            >
              {formFields.map((form, index) => {
                return (
                  <React.Fragment key={index}>
                    {form.type === INPUT_TYPES.text && (
                      <CustomInputText
                        containerClassName="lg:w-[10vw]"
                        value={form.value}
                        name={form.name}
                        label={form.label}
                        icon={form.imgsrc}
                        placeholder={form.label}
                        imageClassName="relative left-[25px] z-[1]"
                        onChange={(event) => handleFormChange(event)}
                        className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px] w-[9vw]"
                      />
                    )}
                    {form.type === INPUT_TYPES.time && (
                      <CustomCalendar
                        name={form.name}
                        containerClassName="ml-[10px] md:w-[14vw]"
                        titleClassName="top-[2vh]"
                        imageClassName="h-[20px] w-[20px] relative top-[3vh] left-[0.5vw] z-[1]"
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
                        onChange={(e) => handleFormChange(e)}
                        imageClassName="relative left-[25px] z-[1]"
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
                label={LABELS.submit}
                isDisabled={disabled}
                isRounded={true}
                className="submitBtnMobile self-end relative"
              />
            </form>
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
                  {formFields.map((form) => {
                    return (
                      <>
                        {form.type === INPUT_TYPES.text && (
                          <CustomInputText
                            containerClassName="w-[41vw] mobileInput"
                            value={form.value}
                            name={form.name}
                            label={form.label}
                            icon={form.imgsrc}
                            imageClassName="relative left-[12px] md:left-[25px] z-[1]"
                            placeholder={form.label}
                            onChange={(event) => handleFormChange(event)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[40px]"
                          />
                        )}
                        {form.type === INPUT_TYPES.time && (
                          <CustomCalendar
                            name={form.name}
                            containerClassName="opmFiltersMobileCalendar"
                            titleClassName="top-[2.2vh]"
                            imageClassName="h-[20px] w-[20px] relative top-[3.5vh] left-[3.5vw] z-[1]"
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
                            containerClassName="w-[41vw]"
                            imageClassName="relative left-[25px] z-[1]"
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
      {location.pathname.includes("opm") && (
        <div
          className={`flex items-center gap-4 mt-[10px] overflow-scroll ml-[5vw] lg:ml-[3vw] ${
            IS_FULLSCREEN
              ? "landScape rotate-90 absolute left-[40vw] top-[45vh] ml-[25vw] w-[22vh]"
              : "portrait"
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
                      ? e.value.toLocaleString("en-US", { hour12: false })
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
      {data && !isLoading && location.pathname.includes("opm") && (
        <LineChart
          title={TITLE.OPM}
          isFullScreen={IS_FULLSCREEN}
          className="border-0 rounded-[10px] lg:w-[71.74vw] lg:ml-[2.85vw] h-[340px] lg:h-[62.23vh] lg:mt-[3vh] "
          options={options}
          data={data}
        />
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default OPM;
