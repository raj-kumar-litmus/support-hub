import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
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

import CustomDropdown from "../components/DropDown";
import CustomInputText from "../components/InputText";
import CustomCalendar from "../components/Calendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
import Loader from "../components/Loader";
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
    null
  );
  const [showPromoCodeLoader, setshowPromoCodeLoader] = useState<boolean>(true);
  const [showDurationLoader, setshowDurationLoader] = useState<boolean>(true);

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
    `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);

  const [data, setData] = useState<ChartData | null>(null);

  const navigate = useNavigate();

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
      `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
    );
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const handleOPMCompExpandClick = () => {
    navigate("/opmcomparison");
  };

  return (
    <>
      {location.pathname.includes("home") && data && (
        <div className="w-full sm:w-1/2 bg-[#F4F4F4] p-4 rounded-lg">
          <div className="flex justify-between mb-3 items-baseline">
            <span className="text-[#757575] font-bold text-lg font-helvetica">
              OPM Comparison
            </span>
            <div>
              <button
                className="rounded-full bg-[#E9E8E8] p-3"
                onClick={handleOPMCompExpandClick}
              >
                <CustomImage src={expand} />
              </button>
            </div>
          </div>
          <Line options={options} data={data} />
        </div>
      )}
      {location.pathname.includes("opmcomparison") && (
        <>
          <div className={`flex ${width > 700 ? "gap-[65vw]" : "gap-[25vw]"}`}>
            <p className="font-bold w-[200px] mt-[20px] ml-[20px]">
              OPM Comparison
            </p>
            <button className="self-end" onClick={onFilterClickHandler}>
              <img src={FilterIcon} />
            </button>
          </div>
          {showFilters && (
            <>
              {width > 700 ? (
                <div className="flex gap-5 opmFilters ml-[20px]">
                  <div className="flex flex-col calendarInput">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px]"
                      htmlFor="date"
                    >
                      Date 1
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
                          setFirstDate(e.target.value?.toLocaleDateString());
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col calendarInput">
                    <label
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
                    />
                  </div>
                  <div className="flex flex-col durationInput">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px] relative ml-[18px]"
                      htmlFor="duration"
                    >
                      Duration
                    </label>
                    <CustomInputText
                      placeholder="Duration"
                      imageClassName="relative left-[25px]"
                      icon={ClockIcon}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setshowDurationLoader(true);
                        setTimeout(() => {
                          setDuration(e.target.value);
                          setshowDurationLoader(false);
                        }, 1500);
                      }}
                      className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                      id="duration"
                    />
                  </div>
                  <div className="flex flex-col channelInput dropdownWithIcon">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px] ml-[18px]"
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
                  </div>
                  <div className="flex flex-col promoCodeInput">
                    <label
                      className="text-[12px] text-[#757575] mb-[5px] font-medium mt-[14px] ml-[18px]"
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
                      className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
                      id="promoCode"
                    />
                  </div>
                  <CustomButton
                    label="Submit"
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
                              e: React.ChangeEvent<CalendarChangeEvent>
                            ) => {
                              if (
                                e.target.value &&
                                typeof e.target.value === "object" &&
                                "toLocaleDateString" in e.target.value
                              ) {
                                setFirstDate(
                                  e.target.value?.toLocaleDateString()
                                );
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
                              e: React.ChangeEvent<CalendarChangeEvent>
                            ) => {
                              if (
                                e.target.value &&
                                typeof e.target.value === "object" &&
                                "toLocaleDateString" in e.target.value
                              ) {
                                setSecondDate(
                                  e.target.value?.toLocaleDateString()
                                );
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setTimeout(
                                () => setDuration(e.target.value),
                                1500
                              )
                            }
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[38px]"
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
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setTimeout(
                                () => setPromoCode(e.target.value),
                                1500
                              )
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
          <div className="flex items-center gap-4 mt-[10px] overflow-scroll ml-[20px]">
            {firstDate && (
              <FilteredCard
                leftIcon={SmallCalendar}
                content={firstDate}
                onClickHandler={() => setFirstDate(null)}
              />
            )}
            {secondDate && (
              <FilteredCard
                leftIcon={SmallCalendar}
                content={secondDate}
                onClickHandler={() => setSecondDate(null)}
              />
            )}
            {duration && showDurationLoader && <Loader className="h-[25px]" />}
            {duration && !showDurationLoader && (
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
            {promoCode && showPromoCodeLoader && (
              <Loader className="h-[25px]" />
            )}
            {promoCode && !showPromoCodeLoader && (
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
              <LineChart options={options} data={data} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OpmComparison;
