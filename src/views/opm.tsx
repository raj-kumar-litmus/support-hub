import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
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
import CustomCalendar from "../components/Calendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
import CustomImage from "../components/common/customimage";
import { OPM_CHART } from "../config/chartConfig";

import FilterIcon from "../assets/filter.svg";
import HourGlassIcon from "../assets/hourglass.svg";
import SmallCalendar from "../assets/calendar_small.svg";
import MobileIcon from "../assets/mobile.svg";
import DropdownMobileIcon from "../assets/dropdown_mobile.svg";
import ClockIcon from "../assets/clock.svg";
import ChannelIcon from "../assets/channel.svg";
import PromoCodeIcon from "../assets/promocode.svg";
import LocaleIcon from "../assets/locale.svg";
import PaymentIcon from "../assets/payment.svg";
import expand from "../assets/expand.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend
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
  const location = useLocation();

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
  const navigate = useNavigate();


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
      const canvas = document.getElementById("myChart");
      const ctx = (canvas as HTMLCanvasElement)?.getContext("2d");
      // const ctx = document.getElementById('myChart')?.getContext('2d');
      let gradient;
      if (ctx) {
        gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "yellow");
        gradient.addColorStop(1, "white");
      }
      setData({
        labels: apiRespnose.map((e) => e.timestamp),
        datasets: [
          {
            label: "No of orders",
            data: apiRespnose.map((e) => Number(e.orderCount)),
            borderColor: "rgb(117, 117, 117)",
            backgroundColor: gradient,
            pointStyle: "circle",
            fill: true,
            borderWidth: 2,
          },
        ],
      });
    }
  };

  const clearAllHandler = () => {
    setDate(undefined);
    setDuration(null);
    setChannel(null);
    setLocale(null);
    setPaymentMode(null);
    setPromoCode(null);
  };

  useEffect(() => {
    // if (width > 700) {
    //   setUrl(
    //     `http://azruvuprep01:8080/supportdashboard/opm?period=${duration}&starttime=${date}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
    //   );
    // }
  }, [date, duration, channel, locale, paymentMode, promoCode]);

  useEffect(() => {
    (async () => {
      setOptions({
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "Total Orders Per Minute",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
          },
          datalabels: {
            display: false,
          },
        },
      });
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

  const onSubmitHandler = () => {
    setUrl(
      `http://azruvuprep01:8080/supportdashboard/opm?period=${duration}&starttime=${date}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
    );
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const handleOPMExpandClick = () => {
    navigate('/opm')
  };

  return (
    <>
      {location.pathname.includes("home") && data && (
        <div className="w-full sm:w-1/2 bg-[#F4F4F4] p-4 rounded-lg">
          <div className="flex justify-between mb-3 items-baseline">
            <span className="text-[#757575] font-bold text-lg font-helvetica">
              OPM
            </span>
            <div>
              <button
                className="rounded-full bg-[#E9E8E8] p-3"
                onClick={handleOPMExpandClick}
              >
                <CustomImage src={expand} />
              </button>
            </div>
          </div>
          <Line options={OPM_CHART} data={data} />
        </div>
      )}
      {location.pathname.includes("opm") && (
        <>
          <div className={`flex ${width > 700 ? "gap-[65vw]" : "gap-[25vw]"}`}>
            <div className="font-bold w-[200px] mt-[20px] ml-[20px]">OPM</div>
            <button onClick={onFilterClickHandler}>
              <img src={FilterIcon} />
            </button>
          </div>
          {showFilters && (
            <>
              {width > 700 ? (
                <div className="flex gap-5 opmFilters ml-[20px]">
                  <div className="flex flex-col">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="date"
                    >
                      From
                    </label>
                    <CustomCalendar
                      value={date ? new Date(date) : undefined}
                      dateFormat="dd/mm/yy"
                      onChange={(e: React.ChangeEvent<CalendarChangeEvent>) => {
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
                  <div className="flex flex-col">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="duration"
                    >
                      Duration
                    </label>
                    <CustomInputText
                      placeholder="Select a Duration"
                      imageClassName="relative left-[25px]"
                      icon={ClockIcon}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDuration(e.target.value)
                      }
                      className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                      id="promoCode"
                    />
                  </div>
                  <div className="flex flex-col channelInput dropdownWithIcon">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="channel"
                    >
                      Channel
                    </label>
                    <CustomDropdown
                      value={channels.find((e) => e.name === channel)}
                      onChange={(e: DropDownOnChangeEvent) =>
                        setChannel(e.value.name)
                      }
                      options={channels}
                      optionLabel="name"
                      imageClassName="relative left-[25px]"
                      icon={ChannelIcon}
                      placeholder="Channel"
                    />
                  </div>
                  <div className="flex flex-col localeInput dropdownWithIcon">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="locale"
                    >
                      Locale
                    </label>
                    <CustomDropdown
                      value={localeList.find((e) => e.name === locale)}
                      onChange={(e: DropDownOnChangeEvent) =>
                        setLocale(e.value.name)
                      }
                      options={localeList}
                      icon={LocaleIcon}
                      optionLabel="name"
                      placeholder="Select a Locale"
                    />
                  </div>
                  <div className="flex flex-col paymentInput dropdownWithIcon">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="payment"
                    >
                      Payment
                    </label>
                    <CustomDropdown
                      value={paymentList.find((e) => e.name === paymentMode)}
                      onChange={(e: DropDownOnChangeEvent) =>
                        setPaymentMode(e.value.name)
                      }
                      options={paymentList}
                      icon={PaymentIcon}
                      optionLabel="name"
                      placeholder="Select a Payment Mode"
                    />
                  </div>
                  <div className="flex flex-col promoCodeInput">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="promoCode"
                    >
                      Promocode
                    </label>
                    <CustomInputText
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPromoCode(e.target.value)
                      }
                      className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                      id="promoCode"
                      icon={PromoCodeIcon}
                      placeholder="Promo Code"
                      imageClassName="relative left-[25px]"
                    />
                  </div>
                  <CustomButton
                    label="Submit"
                    isDisabled={
                      !date &&
                      !duration &&
                      !channel &&
                      !locale &&
                      !paymentMode &&
                      !promoCode
                    }
                    isRounded={true}
                    className="submitBtnMobile self-end"
                    onClick={onSubmitHandler}
                  />
                </div>
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="date"
                          >
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="duration"
                          >
                            Duration
                          </label>
                          <CustomInputText
                            placeholder="Select a Duration"
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="channel"
                          >
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="locale"
                          >
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="payment"
                          >
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
                          <label
                            className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                            htmlFor="promoCode"
                          >
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
                        isRounded={true}
                        className="submitBtnMobile"
                        onClick={onSubmitHandler}
                      />
                    </div>
                  </CustomModal>
                </>
              )}
            </>
          )}
          <div className="flex items-center gap-4 mt-[10px] overflow-scroll ml-[20px]">
            {date && (
              <FilteredCard
                leftIcon={SmallCalendar}
                content={date}
                onClickHandler={() => setDate(undefined)}
              />
            )}
            {duration && (
              <FilteredCard
                leftIcon={HourGlassIcon}
                content={duration}
                onClickHandler={() => setDuration(null)}
              />
            )}
            {channel && (
              <FilteredCard
                leftIcon={MobileIcon}
                content={channel}
                onClickHandler={() => setChannel(null)}
              />
            )}
            {paymentMode && (
              <FilteredCard
                content={paymentMode}
                onClickHandler={() => setPaymentMode(null)}
              />
            )}
            {locale && (
              <FilteredCard
                content={locale}
                onClickHandler={() => setLocale(null)}
              />
            )}
            {promoCode && (
              <FilteredCard
                content={promoCode}
                onClickHandler={() => setPromoCode(null)}
              />
            )}
            {(date ||
              duration ||
              channel ||
              paymentMode ||
              locale ||
              promoCode) && (
              <CustomButton
                label="Clear All"
                severity="secondary"
                className="text-[12px] text-[#575353]"
                isTextButton={true}
                onClick={clearAllHandler}
              />
            )}
          </div>
          {data && (
            <div className="bg-[#F4F4F4] border-0 rounded-[10px] w-[95%] ml-[20px] h-[700px]">
              <LineChart options={OPM_CHART} data={data} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OPM;
