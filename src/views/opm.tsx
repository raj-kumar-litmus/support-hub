import React, { useEffect, useState } from "react";
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
// import CustomCalendar from "../components/Calendar";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
import CustomImage from "../components/common/customimage";

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
import SandGlassIcon from "../assets/sandglass.svg";

import { formatTime, formatDate, DATE_FORMAT_2 } from "../utils/dateTimeUtil";

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
  const [date, setDate] = useState<undefined | string>();
  const [duration, setDuration] = useState<null | string>(null);
  const [channel, setChannel] = useState<null | string>(null);
  const [locale, setLocale] = useState<null | string>(null);
  const [paymentMode, setPaymentMode] = useState<null | string>(null);
  const [promoCode, setPromoCode] = useState<null | string>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ModalEnums>("center");

  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [startDateTime, setStartDateTime] = useState<Date | string>("");
  const [startTime, setStartTime] = useState<Date | string | null>(null);

  const { width } = useScreenSize();

  const durations = [
    { name: "15 mins", code: "15 mins" },
    { name: "30 mins", code: "30 mins" },
    { name: "45 mins", code: "45 mins" },
    { name: "60 mins", code: "60 mins" },
  ];
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
    `http://azruvuprep01:8080/supportdashboard/opm?period=${duration}&starttime=${date}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`,
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);

  const [data, setData] = useState<ChartData | null>(null);

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

  const changeStartDate = (value: string) => {
    setStartDate(value);
    const selectedDate = new Date(value);
    let defaultTime: string = "";
    defaultTime = formatTime(startTime ? startTime : new Date());
    setStartDateTime(
      `${formatDate(selectedDate, DATE_FORMAT_2)}T${defaultTime}`,
    );
  };

  const changeStartTime = (value: string) => {
    const formattedTime = formatTime(value);
    setStartTime(value);
    let defaultDate: string = "";
    defaultDate = startDate
      ? formatDate(startDate, DATE_FORMAT_2)
      : `${new Date().toISOString().split("T")[0]}`;
    setStartDateTime(`${defaultDate}T${formattedTime}`);
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
      `http://azruvuprep01:8080/supportdashboard/opm?period=${duration}&starttime=${date}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`,
    );
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className={`flex gap-[66vw]`}>
        <p className="font-bold w-[3vw] mt-[3.9vh] ml-[3vw]">OPM</p>
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
            <div className="flex gap-[1vw] ml-[1.8vw] opmFilters">
              <div className="flex flex-col">
                <label className="text-[12px] text-[#757575] mb-[5px] font-medium pt-[2.5vh] relative ml-[18px]">
                  Duration
                </label>
                <CustomDropdown
                  value={durations.find((e) => e.name === duration)}
                  onChange={(e: DropDownOnChangeEvent) =>
                    setDuration(e.value.name)
                  }
                  imageClassName="relative left-[25px] z-[1]"
                  icon={SandGlassIcon}
                  options={durations}
                  optionLabel="name"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col w-[8.78vw] self-end">
                <CustomCalendar
                  title="Date"
                  placeholder="mm/dd/yy"
                  value={startDate}
                  onChange={changeStartDate}
                  maxDate={new Date()}
                  dateFormat="mm/dd/yy"
                  iconPos={"left"}
                  imgalt="date-icon"
                  imgsrc="src/assets/calendar.svg"
                />
              </div>
              <div className="flex flex-col timeInput w-[7.91vw] self-end">
                <CustomCalendar
                  title="Time"
                  placeholder="HH:MM"
                  value={startTime}
                  onChange={changeStartTime}
                  timeOnly
                  iconPos={"left"}
                  imgalt="time-icon"
                  imgsrc="src/assets/clock.svg"
                />
              </div>
              <div className="flex flex-col channelInput dropdownWithIcon w-[7vw]">
                <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
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
                  placeholder=""
                />
              </div>
              <div className="flex flex-col localeInput dropdownWithIcon w-[7vw]">
                <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
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
                  placeholder=""
                />
              </div>
              <div className="flex flex-col paymentInput dropdownWithIcon w-[9vw]">
                <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
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
                  placeholder=""
                />
              </div>
              <div className="flex flex-col promoCodeInput w-[9vw]">
                <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
                  Promocode
                </label>
                <CustomInputText
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPromoCode(e.target.value)
                  }
                  className="relative left-[-25px] border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                  icon={PromoCodeIcon}
                  placeholder=""
                  imageClassName="z-[1]"
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
                className="submitBtnMobile self-end relative left-[-2vw]"
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
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
                        From
                      </label>
                      <CustomCalendar
                        placeholder={"mm/dd/yyyy"}
                        icon={<img src={SmallCalendar} />}
                        dateFormat="mm/dd/yy"
                        onChange={(
                          e: React.ChangeEvent<CalendarChangeEvent>,
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
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
                        Duration
                      </label>
                      <CustomInputText
                        placeholder=""
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDuration(e.target.value)
                        }
                        className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                        id="promoCode"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col w-[40vw]">
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
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
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
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
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
                        Payment
                      </label>
                      <CustomDropdown
                        dropdownIcon={<img src={DropdownMobileIcon} />}
                        value={paymentList.find((e) => e.name === paymentMode)}
                        onChange={(e: DropDownOnChangeEvent) =>
                          setPaymentMode(e.value.name)
                        }
                        options={paymentList}
                        optionLabel="name"
                        placeholder="Klarna"
                      />
                    </div>
                    <div className="flex flex-col w-[40vw]">
                      <label className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]">
                        Promocode
                      </label>
                      <CustomInputText
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPromoCode(e.target.value)
                        }
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
      <div className="flex items-center gap-4 mt-[10px] overflow-scroll ml-[3vw]">
        {startDate && (
          <FilteredCard
            leftIcon={SmallCalendar}
            content={startDate.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            onClickHandler={() => setStartDate(null)}
          />
        )}
        {startTime && (
          <FilteredCard
            leftIcon={HourGlassIcon}
            content={startTime.toLocaleString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
            onClickHandler={() => setStartTime(null)}
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
            label="Reset"
            severity="secondary"
            className="text-[12px] text-[#575353]"
            isTextButton={true}
            onClick={clearAllHandler}
          />
        )}
      </div>
      {data && (
        <div className="bg-[#F4F4F4] border-0 rounded-[10px] w-[71.74vw] ml-[2.85vw] h-[62.23vh] mt-[3vh]">
          <LineChart options={options} data={data} />
        </div>
      )}
    </>
  );
};

export default OPM;
