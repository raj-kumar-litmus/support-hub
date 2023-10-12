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
import { CalendarChangeEvent } from "primereact/calendar";

import {
  ModalEnums,
  ChartData,
  ChartOptions,
  OpmComparisonType,
  DropDownOnChangeEvent,
} from "../@types/supportHub";
import useScreenSize from "../hooks/useScreenSize";

import { formatTime, formatDate, DATE_FORMAT_2 } from "../utils/dateTimeUtil";

import CustomDropdown from "../components/DropDown";
import CustomInputText from "../components/InputText";
// import CustomCalendar from "../components/Calendar";
import CustomCalendar from "../components/common/CustomCalendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
// import Loader from "../components/Loader";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const OpmComparison: React.FC = () => {
  const [firstDate, setFirstDate] = useState<null | string>(null);
  const [secondDate, setSecondDate] = useState<null | string>(null);
  const [duration, setDuration] = useState<null | string>(null);
  const [channel, setChannel] = useState<null | string>(null);
  const [locale, setLocale] = useState<null | string>(null);
  const [paymentMode, setPaymentMode] = useState<null | string>(null);
  const [promoCode, setPromoCode] = useState<null | string>();
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<ModalEnums>("center");
  const [apiResponse, setApiResponse] = useState<null | OpmComparisonType>(
    null,
  );
  // const [showPromoCodeLoader, setshowPromoCodeLoader] = useState<boolean>(true);
  // const [showDurationLoader, setshowDurationLoader] = useState<boolean>(true);

  const [startTime, setStartTime] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");

  const [endTime, setEndTime] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const { width } = useScreenSize();

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
    `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`,
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);

  const [data, setData] = useState<ChartData | null>(null);

  const changeStartTime = (value: string) => {
    const formattedTime = formatTime(value);
    setStartTime(value);
    let defaultDate: string = "";
    defaultDate = startDate
      ? formatDate(startDate, DATE_FORMAT_2)
      : `${new Date().toISOString().split("T")[0]}`;
    setStartDateTime(`${defaultDate}T${formattedTime}`);
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

  const changeEndDate = (value: string) => {
    setEndDate(value);
    const selectedDate = new Date(value);
    let defaultTime: string = "";
    defaultTime = formatTime(endTime ? endTime : new Date());
    setEndDateTime(`${formatDate(selectedDate, DATE_FORMAT_2)}T${defaultTime}`);
  };

  // const [options, setOptions] = useState<Options>({
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'OPM Comparison',
  //     },
  //   },
  // });

  // const [data, setData] = useState<OpmData>({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: '',
  //       data: [],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // });

  useEffect(() => {
    if (apiResponse) {
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
        labels: apiResponse["opmOne"].map((e) => e.timestamp),
        datasets:
          apiResponse &&
          Object.keys(apiResponse)?.map((e, index) => ({
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            data: apiResponse?.[e].map((e) => Number(e.orderCount)),
            backgroundColor: "transparent",
            label: "No of orders",
            borderColor: index === 0 ? "#BABABA" : "#707070",
            pointStyle: "circle",
            fill: true,
            borderWidth: 2,
          })),
      });
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
          datalabels: {
            display: false,
          },
          legend: {
            display: true,
            position: "bottom",
            align: "start",
            labels: {
              usePointStyle: true,
              generateLabels: () => {
                return Object.keys(apiResponse).map((_, index) => ({
                  text: index === 0 ? firstDate : secondDate,
                  fillStyle: index === 0 ? "#BABABA" : "#757575",
                  strokeStyle: index === 0 ? "#BABABA" : "#757575",
                }));
              },
            },
          },
          tooltip: {
            displayColors: false,
          },
        },
      });
    }
  }, [apiResponse]);

  const getData = async () => {
    try {
      await fetch(url);
    } catch (err) {
      setApiResponse({
        opmOne: [
          {
            timestamp: "12:57",
            orderCount: "111",
          },
          {
            timestamp: "12:58",
            orderCount: "143",
          },
          {
            timestamp: "12:59",
            orderCount: "116",
          },
          {
            timestamp: "13:00",
            orderCount: "138",
          },
          {
            timestamp: "13:01",
            orderCount: "119",
          },
          {
            timestamp: "13:02",
            orderCount: "130",
          },
          {
            timestamp: "13:03",
            orderCount: "112",
          },
          {
            timestamp: "13:04",
            orderCount: "120",
          },
          {
            timestamp: "13:05",
            orderCount: "108",
          },
          {
            timestamp: "13:06",
            orderCount: "132",
          },
        ],
        opmTwo: [
          {
            timestamp: "12:57",
            orderCount: "94",
          },
          {
            timestamp: "12:58",
            orderCount: "105",
          },
          {
            timestamp: "12:59",
            orderCount: "114",
          },
          {
            timestamp: "13:00",
            orderCount: "142",
          },
          {
            timestamp: "13:01",
            orderCount: "113",
          },
          {
            timestamp: "13:02",
            orderCount: "103",
          },
          {
            timestamp: "13:03",
            orderCount: "106",
          },
          {
            timestamp: "13:04",
            orderCount: "122",
          },
          {
            timestamp: "13:05",
            orderCount: "127",
          },
          {
            timestamp: "13:06",
            orderCount: "113",
          },
        ],
      });
    }
  };

  const clearAllHandler = () => {
    // setDate(null);
    setFirstDate(null);
    setSecondDate(null);
    setDuration(null);
    setChannel(null);
    setLocale(null);
    setPaymentMode(null);
    setPromoCode(null);
  };

  // useEffect(() => {
  //   if (width > 700) {
  //     setUrl(
  //       `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
  //     );
  //   }
  // }, [
  //   firstDate,
  //   secondDate,
  //   duration,
  //   channel,
  //   locale,
  //   paymentMode,
  //   promoCode,
  // ]);

  useEffect(() => {
    (async () => {
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
      `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`,
    );
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    console.log(`startTime`);
    console.log(startTime);
  }, [startTime]);

  return (
    <>
      <div className="flex gap-[59.5vw]">
        <p className="font-bold  mt-[20px] ml-[3vw]">OPM Comparison</p>
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
            <div className="flex gap-[1.17vw] ml-[1.8vw] mt-[2.2vh] opmFilters">
              <div className="flex flex-col w-[6.58vw]">
                <label
                  className="text-[12px] text-[#757575] mb-[3px] font-medium mt-[6px] relative ml-[18px]"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <CustomInputText
                  imageClassName="relative left-[25px]"
                  icon={ClockIcon}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDuration(e.target.value);
                    // setshowDurationLoader(true);
                    // setTimeout(() => {
                    //   setDuration(e.target.value);
                    //   setshowDurationLoader(false);
                    // }, 1500);
                  }}
                  className="border rounded-[8px] border-solid border-slate-300 border-1 h-[4.95vh] w-full"
                  id="duration"
                />
              </div>
              <div className="flex flex-col calendarInput w-[8.78vw] relative top-[1.1vh]">
                {/* <label
                  className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                  htmlFor="date"
                >
                  Date 1
                </label> */}
                <CustomCalendar
                  title="Date 1"
                  placeholder="dd/mm/yy"
                  value={startDate}
                  onChange={changeStartDate}
                  maxDate={new Date()}
                  dateFormat="dd/mm/yy"
                  iconPos={"left"}
                  imgalt="date-icon"
                  imgsrc="src/assets/calendar.svg"
                />
                {/* <CustomCalendar
                  // value={date}
                  dateFormat="dd/mm/yy"
                  onChange={(e: React.ChangeEvent<CalendarChangeEvent>) => {
                    if (
                      e.target.value &&
                      typeof e.target.value === "object" &&
                      "toLocaleDateString" in e.target.value
                    ) {
                      setFirstDate(e.target.value?.toLocaleDateString());
                    }
                  }}
                /> */}
              </div>
              <div className="flex flex-col calendarInput w-[8.78vw] relative top-[1.1vh]">
                {/* <label
                  className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                  htmlFor="date"
                >
                  Date 2
                </label>
                <CustomCalendar
                  // value={date}
                  dateFormat="dd/mm/yy"
                  onChange={(e: React.ChangeEvent<CalendarChangeEvent>) => {
                    if (
                      e.target.value &&
                      typeof e.target.value === "object" &&
                      "toLocaleDateString" in e.target.value
                    ) {
                      setSecondDate(e.target.value?.toLocaleDateString());
                    }
                  }}
                /> */}
                <CustomCalendar
                  title="Date 2"
                  placeholder="dd/mm/yy"
                  value={endDate}
                  onChange={changeEndDate}
                  maxDate={new Date()}
                  dateFormat="dd/mm/yy"
                  iconPos={"left"}
                  imgalt="date-icon"
                  imgsrc="src/assets/calendar.svg"
                />
              </div>
              <div className="flex flex-col calendarInput w-[7.91vw] relative top-[1.1vh]">
                {/* <label
                  className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                  htmlFor="date"
                >
                  Time
                </label> */}
                {/* <CustomCalendar
                  // value={date}
                  timeOnly={true}
                  dateFormat="dd/mm/yy"
                  onChange={(e: React.ChangeEvent<CalendarChangeEvent>) => {
                    if (
                      e.target.value &&
                      typeof e.target.value === "object" &&
                      "toLocaleDateString" in e.target.value
                    ) {
                      setSecondDate(e.target.value?.toLocaleDateString());
                    }
                  }}
                /> */}
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
              <div className="flex flex-col channelInput dropdownWithIcon w-[9.88vw] relative top-[1vh]">
                <label
                  className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[1px]"
                  htmlFor="channel"
                >
                  Channel
                </label>
                <CustomDropdown
                  value={channels.find((e) => e.name === channel)}
                  onChange={(e: DropDownOnChangeEvent) =>
                    setChannel(e.value.name)
                  }
                  imageClassName="relative left-[25px]"
                  icon={ChannelIcon}
                  options={channels}
                  optionLabel="name"
                  placeholder="Channel"
                />
              </div>
              {/* <div className="flex flex-col localeInput dropdownWithIcon">
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
                  placeholder="Locale"
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
                  placeholder="Payment Mode"
                />
              </div> */}
              {/* <div className="flex flex-col promoCodeInput">
                <label
                  className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[7px] ml-[18px]"
                  htmlFor="promoCode"
                >
                  Promocode
                </label>
                <CustomInputText
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  //   setTimeout(() => setPromoCode(e.target.value), 1500)
                  // }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setshowPromoCodeLoader(true);
                    setTimeout(() => {
                      setPromoCode(e.target.value);
                      setshowPromoCodeLoader(false);
                    }, 1500);
                  }}
                  icon={PromoCodeIcon}
                  placeholder="Promo Code"
                  imageClassName="relative left-[25px]"
                  className="border rounded-[8px] border-solid border-slate-300 border-1 h-[4.35vh]"
                  id="promoCode"
                />
              </div> */}
              <CustomButton
                label="Submit"
                isRounded={true}
                className="submitBtnMobile self-end ml-[15vw]"
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
                    <div className="flex flex-col">
                      <label
                        className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                        htmlFor="date"
                      >
                        Date 1
                      </label>
                      <CustomCalendar
                        dateFormat="dd/mm/yy"
                        onChange={(
                          e: React.ChangeEvent<CalendarChangeEvent>,
                        ) => {
                          if (
                            e.target.value &&
                            typeof e.target.value === "object" &&
                            "toLocaleDateString" in e.target.value
                          ) {
                            setFirstDate(e.target.value?.toLocaleDateString());
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                        htmlFor="date"
                      >
                        Date 2
                      </label>
                      <CustomCalendar
                        dateFormat="dd/mm/yy"
                        onChange={(
                          e: React.ChangeEvent<CalendarChangeEvent>,
                        ) => {
                          if (
                            e.target.value &&
                            typeof e.target.value === "object" &&
                            "toLocaleDateString" in e.target.value
                          ) {
                            setSecondDate(e.target.value?.toLocaleDateString());
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col w-[40vw]">
                      <label
                        className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                        htmlFor="duration"
                      >
                        Duration
                      </label>
                      <CustomInputText
                        placeholder="Duration"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTimeout(() => setDuration(e.target.value), 1500)
                        }
                        className="border rounded-[8px] border-solid border-slate-300 border-1 h-[4.35vh]"
                        id="promoCode"
                      />
                    </div>
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
                  </div>
                  <div className="flex flex-row gap-5">
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
                    <div className="flex flex-col w-[40vw]">
                      <label
                        className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                        htmlFor="payment"
                      >
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
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col">
                      <label
                        className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                        htmlFor="promoCode"
                      >
                        Promocode
                      </label>
                      <CustomInputText
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTimeout(() => setPromoCode(e.target.value), 1500)
                        }
                        className="border rounded-[8px] border-solid border-slate-300 border-1 h-[4.35vh]"
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
        {endDate && (
          <FilteredCard
            leftIcon={SmallCalendar}
            content={endDate.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            onClickHandler={() => setSecondDate(null)}
          />
        )}
        {/* {duration && showDurationLoader && <Loader className="h-[25px]" />} */}
        {duration && (
          <FilteredCard
            leftIcon={HourGlassIcon}
            content={duration}
            onClickHandler={() => setDuration(null)}
          />
        )}
        {startTime && (
          <FilteredCard
            leftIcon={HourGlassIcon}
            content={startTime.toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            onClickHandler={() => setStartTime(null)}
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
        {/* {promoCode && showPromoCodeLoader && <Loader className="h-[25px]" />} */}
        {promoCode && (
          <FilteredCard
            content={promoCode}
            onClickHandler={() => setPromoCode(null)}
          />
        )}
        {(firstDate ||
          secondDate ||
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
        <div className="bg-[#F4F4F4] border-0 rounded-[10px] w-[71.74vw] ml-[2.85vw] h-[63.36vh] mt-[3vh]">
          <LineChart options={options} data={data} />
        </div>
      )}
    </>
  );
};

export default OpmComparison;
