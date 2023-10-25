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
import { CalendarChangeEvent } from "primereact/calendar";

import {
  ModalEnums,
  ChartData,
  ChartOptions,
  DropDownOnChangeEvent,
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
import { OPM_OPTIONS } from "../constants/appConstants";

import FilterIcon from "../assets/filter.svg";
import SmallCalendar from "../assets/calendar_small.svg";
import DropdownMobileIcon from "../assets/dropdown_mobile.svg";
import ChannelIcon from "../assets/channel.svg";
import PromoCodeIcon from "../assets/promocode.svg";
import LocaleIcon from "../assets/locale.svg";
import PaymentIcon from "../assets/payment.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import GreyChannelIcon from "../assets/channel-grey.svg";
import GreyCalendarIcon from "../assets/calendar-grey.svg";
import GreyHourGlassIcon from "../assets/hourglass-grey.svg";
import open_in_full_window from "../assets/open_in_full_window.svg";

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
  const [date, setDate] = useState<undefined | string>();
  const [duration, setDuration] = useState<null | string>(null);
  const [channel, setChannel] = useState<null | string>(null);
  const [locale, setLocale] = useState<null | string>(null);
  const [paymentMode, setPaymentMode] = useState<null | string>(null);
  const [promoCode, setPromoCode] = useState<null | string>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ModalEnums>("center");

  const { width } = useScreenSize();
  const navigate = useNavigate();

  const channels = [
    { name: "All", code: "All" },
    { name: "Mobile", code: "Mobile" },
  ];
  const localeList = [
    { name: "US", code: "US" },
    { name: "CA", code: "CA" },
  ];
  const paymentList = [
    { name: "Klarna", code: "Klarna" },
    { name: "PayPal", code: "PayPal" },
  ];
  const [url, setUrl] = useState<string>(
    `http://azruvuprep01:8080/supportdashboard/opm?period=${duration}&starttime=${date}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);

  const [data, setData] = useState<ChartData | null>(null);

  function getGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
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
      await fetch(url);
    } catch (err) {
      const apiRespnose = [
        {
          timestamp: "08:24",
          orderCount: "95",
        },
        {
          timestamp: "08:25",
          orderCount: "107",
        },
        {
          timestamp: "08:26",
          orderCount: "105",
        },
        {
          timestamp: "08:27",
          orderCount: "111",
        },
        {
          timestamp: "08:28",
          orderCount: "108",
        },
        {
          timestamp: "08:29",
          orderCount: "122",
        },
        {
          timestamp: "08:30",
          orderCount: "107",
        },
        {
          timestamp: "08:31",
          orderCount: "108",
        },
        {
          timestamp: "08:32",
          orderCount: "112",
        },
        {
          timestamp: "08:33",
          orderCount: "94",
        },
      ];
      setData({
        labels: apiRespnose.map((e) => e.timestamp),
        datasets: [
          {
            label: "No of orders",
            data: apiRespnose.map((e) => Number(e.orderCount)),
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
    }
  };

  const clearAllHandler = () => {
    let data = [...formFields];
    data.forEach((e) => (e.value = ""));
    setFormFields(data);
  };

  useEffect(() => {
    (async () => {
      setOptions(OPM_OPTIONS);
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
      type: "dropdown",
      name: "duration",
      label: "Duration",
      icon: SandGlassIcon,
      cardIcon: GreyHourGlassIcon,
      value: "",
      options: [
        { name: "15", code: "15" },
        { name: "30", code: "30" },
        { name: "45", code: "45" },
        { name: "60", code: "60" },
      ],
    },
    {
      type: "time",
      name: "date",
      label: "Date",
      value: "",
      showTime: true,
      cardIcon: GreyCalendarIcon,
      imgsrc: "src/assets/calendar.svg",
    },
    // {
    //   type: "time",
    //   name: "time",
    //   label: "Time",
    //   value: "",
    //   timeOnly: true,
    //   imgsrc: "src/assets/clock.svg",
    // },
    {
      type: "dropdown",
      name: "channel",
      label: "Channel",
      icon: ChannelIcon,
      cardIcon: GreyChannelIcon,
      value: "",
      options: [
        { name: "All", code: "All" },
        { name: "Mobile", code: "Mobile" },
      ],
    },
    {
      type: "dropdown",
      name: "locale",
      label: "Locale",
      icon: LocaleIcon,
      value: "",
      options: [
        { name: "US", code: "US" },
        { name: "CA", code: "CA" },
      ],
    },
    {
      type: "dropdown",
      name: "payment",
      label: "Payment",
      icon: PaymentIcon,
      value: "",
      options: [
        { name: "Klarna", code: "Klarna" },
        { name: "PayPal", code: "PayPal" },
      ],
    },
    {
      type: "dropdown",
      name: "promocode",
      label: "Promo Code",
      icon: PromoCodeIcon,
      value: "",
      options: [
        { name: "Promo123", code: "Promo123" },
        { name: "Promo234", code: "Promo234" },
        { name: "Promo456", code: "Promo456" },
        { name: "Promo567", code: "Promo567" },
        { name: "Promo678", code: "Promo678" },
        { name: "Promo91011", code: "Promo91011" },
      ],
    },
  ]);

  const handleFormChange = (event) => {
    let data = [...formFields];
    let val = event.target.name || event.value.name;
    if (val === "date") {
      data.find((e) => e.name === val).value = event.value;
    } else {
      data.find((e) => e.name === val).value = event.target.value;
    }
    setFormFields(data);
  };

  const removeFormEntry = (event) => {
    let data = [...formFields];
    data.find((e) => e.name === event.target.id).value = null;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    let str = ``;
    formFields.forEach((e: any) => {
      if (e.value) {
        str += `${e.name}=${e.value.name || e.value}&`;
      }
    });
    setUrl(`http://azruvuprep01:8080/supportdashboard/opm?${str}`);
  };

  useEffect(() => {
    setDisabled(formFields.map((e) => e.value).filter(Boolean).length === 0);
  }, [formFields]);

  const handleOPMExpandClick = () => {
    navigate("/opm");
  };

  const getConfigOptions = () => {
    const chartOptions = JSON.parse(JSON.stringify(options));
    chartOptions.layout.padding = 0;
    chartOptions.scales.x.title.padding.top = 10;
    return chartOptions;
  };

  return (
    <>
      {location.pathname.includes("home") && data && (
        <div className="w-full sm:w-1/2 bg-[#30343B] p-4 rounded-lg">
          <div className="flex justify-between mb-3 items-center">
            <span className="text-[#F2F2F2] font-bold text-lg font-helvetica">
              OPM
            </span>
            <div>
              <button
                className="rounded-full pr-2"
                onClick={handleOPMExpandClick}
              >
                <CustomImage src={open_in_full_window} />
              </button>
            </div>
          </div>
          {/* <div className="bg-[#30343B] border-0 rounded-[10px] w-[71.74vw] ml-[2.85vw] h-[62.23vh] mt-[3vh]">
            <LineChart options={options} data={data} />
          </div> */}
          {/* <LineChart options={options} data={data} /> */}
          <LineChart className={"home-opm"} options={getConfigOptions()} data={data} />
        </div>
      )}
      {location.pathname.includes("opm") && (
        <>
          <div className={`flex gap-[66vw]`}>
            <p className="font-bold w-[3vw] mt-[3.9vh] ml-[3vw] text-[#F2F2F2]">
              OPM
            </p>
            <CustomImage
              src={FilterIcon}
              className="w-[2.34vw] self-end"
              alt="Filter Icon"
              onClick={onFilterClickHandler}
            />
          </div>
          {showFilters && (
            <>
              {width > 700 ? (
                <form
                  className="flex gap-[1vw] ml-[2.4vw] opmFilters"
                  onSubmit={submit}
                >
                  {formFields.map((form, index) => {
                    return (
                      <div key={index}>
                        {form.type === "text" && (
                          <CustomInputText
                            value={form.value}
                            name={form.label}
                            placeholder={form.label}
                            onChange={(event) => handleFormChange(event)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                            id="promoCode"
                          />
                        )}
                        {form.type === "time" && (
                          <CustomCalendar
                            name={form.name}
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
                            imageClassName="relative left-[25px] z-[1]"
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
                  <CustomButton
                    label="Submit"
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
                    className="filtersModal opmFilters h-[500px] left-[-4vw] w-[100vw]"
                    onHide={onModalCloseHandler}
                    isDraggable={false}
                    isResizable={false}
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-5">
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            From
                          </label>
                          <CustomCalendar
                            placeholder={"mm/dd/yyyy"}
                            icon={<img src={SmallCalendar} />}
                            dateFormat="mm/dd/yy"
                            onChange={(
                              e: React.ChangeEvent<CalendarChangeEvent>
                            ) => {
                              if (
                                e.target.value &&
                                typeof e.target.value === "object" &&
                                "toLocaleDateString" in e.target.value
                              ) {
                                setDate(e.target.value?.toLocaleDateString());
                              }
                            }}
                          />
                        </div>
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            Duration
                          </label>
                          <CustomInputText
                            placeholder=""
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setDuration(e.target.value)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                            id="promoCode"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-5">
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            Channel
                          </label>
                          <CustomDropdown
                            dropdownIcon={<img src={DropdownMobileIcon} />}
                            value={channels.find((e) => e.name === channel)}
                            onChange={(e: DropDownOnChangeEvent) =>
                              setChannel(e.value.name)
                            }
                            options={channels}
                            optionLabel="name"
                            placeholder="All"
                          />
                        </div>
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            Locale
                          </label>
                          <CustomDropdown
                            dropdownIcon={<img src={DropdownMobileIcon} />}
                            value={localeList.find((e) => e.name === locale)}
                            onChange={(e: DropDownOnChangeEvent) =>
                              setLocale(e.value.name)
                            }
                            options={localeList}
                            optionLabel="name"
                            placeholder="US"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-5">
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            Payment
                          </label>
                          <CustomDropdown
                            dropdownIcon={<img src={DropdownMobileIcon} />}
                            value={paymentList.find(
                              (e) => e.name === paymentMode
                            )}
                            onChange={(e: DropDownOnChangeEvent) =>
                              setPaymentMode(e.value.name)
                            }
                            options={paymentList}
                            optionLabel="name"
                            placeholder="Klarna"
                          />
                        </div>
                        <div className="flex flex-col w-[40vw]">
                          <label className="labelClass mb-[5px] mt-[14px]">
                            Promocode
                          </label>
                          <CustomInputText
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setPromoCode(e.target.value)}
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                            id="promoCode"
                            placeholder="Enter Code Here"
                          />
                        </div>
                      </div>
                      <CustomButton
                        label="Submit"
                        isDisabled={disabled}
                        isRounded={true}
                        className="submitBtnMobile self-end relative"
                      />
                    </div>
                  </CustomModal>
                </>
              )}
            </>
          )}
          <div className="flex items-center gap-4 mt-[10px] overflow-scroll ml-[3vw]">
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
            {!disabled && (
              <CustomButton
                label="Reset"
                severity="secondary"
                className="resetFilters text-[12px] text-[#575353]"
                isTextButton={true}
                onClick={clearAllHandler}
              />
            )}
          </div>
          {data && (
            <div className="bg-[#30343B] border-0 rounded-[10px] w-[71.74vw] ml-[2.85vw] h-[62.23vh] mt-[3vh]">
              <LineChart options={options} data={data} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OPM;
