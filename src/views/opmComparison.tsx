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
import CustomCalendar from "../components/common/CustomCalendar";
import CustomButton from "../components/Button";
import CustomModal from "../components/Modal";
import LineChart from "../components/LineChart";
import FilteredCard from "../components/FilteredCard";
import CustomImage from "../components/common/customimage";
import { OPM_COMPARISON_OPTIONS } from "../constants/appConstants";

import FilterIcon from "../assets/filter.svg";
import DropdownMobileIcon from "../assets/dropdown_mobile.svg";
import ChannelIcon from "../assets/channel.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import open_in_full_window from "../assets/open_in_full_window.svg";
import OPM from "./opm";

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
    `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${firstDate}&startDateTwo=${secondDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);

  const [data, setData] = useState<ChartData | null>(null);

  const [disabled, setDisabled] = useState(true);

  const [formFields, setFormFields] = useState([
    {
      type: "dropdown",
      name: "period",
      label: "Duration",
      icon: SandGlassIcon,
      value: "",
      options: [
        { name: "15", code: "15 mins" },
        { name: "30", code: "30 mins" },
        { name: "45", code: "45 mins" },
        { name: "60", code: "60 mins" },
      ],
    },
    {
      type: "time",
      name: "startDate",
      label: "Date 1",
      value: "",
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
      type: "time",
      name: "endDate",
      label: "Date 2",
      value: "",
      imgsrc: "src/assets/calendar.svg",
    },
    {
      type: "dropdown",
      name: "channel",
      label: "Channel",
      icon: ChannelIcon,
      value: "",
      options: [
        { name: "All", code: "All" },
        { name: "Mobile", code: "Mobile" },
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
        if (e.name === "startDate") {
          str += `startTimeOne=${e.value.toISOString()}`;
          return;
        }
        if (e.name === "endDate") {
          str += `startDateTwo=${e.value.toLocaleDateString("en-US")}`;
          return;
        }
        str += `${e.name}=${e.value.name || e.value}&`;
      }
    });
    setUrl(`http://azruvuprep01:8080/supportdashboard/compareOPM?${str}`);
  };

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
            backgroundColor: "white",
            label: "No of orders",
            borderColor: index === 0 ? "#6370FF" : "#FDA44F",
            borderWidth: 2,
          })),
      });
      setOptions(
        OPM_COMPARISON_OPTIONS({
          apiResponse,
          startDate: formFields.find((e) => e.name === "startDate").value,
          endDate: formFields.find((e) => e.name === "endDate").value,
        })
      );
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
    let data = [...formFields];
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

  const onSubmitHandler = () => {
    setUrl(
      `http://azruvuprep01:8080/supportdashboard/compareOPM?period=${duration}&startTimeOne=${startDate}&startDateTwo=${endDate}&channel=${channel}&promocode=${promoCode}&paymentType=${paymentMode}&country=${locale}`
    );
  };

  const onModalCloseHandler = () => {
    setVisible(false);
    setShowFilters(!showFilters);
  };

  const handleOPMCompExpandClick = () => {
    navigate("/opmcomparison");
  };

  const getConfigOptions = () => {
    const chartOptions = JSON.parse(JSON.stringify(options));
    chartOptions.layout.padding = 0;
    chartOptions.scales.x.title.padding.top = 10;
    chartOptions.plugins.legend.position = "top";

    return chartOptions;
  };

  return (
    <>
      {location.pathname.includes("home") && data && (
        <div className="w-full sm:w-1/2 bg-[#22262C] p-4 rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[#F2F2F2] font-bold text-lg font-helvetica">
              OPM Comparison
            </span>
            <div>
              <button
                className="rounded-full pr-2"
                onClick={handleOPMCompExpandClick}
              >
                <CustomImage src={open_in_full_window} />
              </button>
            </div>
          </div>
          <LineChart options={getConfigOptions()} data={data} />
        </div>
      )}
      {location.pathname.includes("opmcomparison") && (
        <>
          <div className="flex gap-[59vw] mt-[3.9vh]">
            <p className="font-bold self-center ml-[3vw] text-[#F2F2F2]">
              OPM Comparison
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
                      <Fragment key={index}>
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
                            showTime={form.name === "startDate"}
                            timeOnly={form.timeOnly || false}
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
                      </Fragment>
                    );
                  })}
                  <CustomButton
                    label="Submit"
                    isDisabled={disabled}
                    isRounded={true}
                    className="submitBtnMobile self-end ml-[11.5vw]"
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
                        <div className="flex flex-col">
                          <label
                            className="labelClass mb-[5px] mt-[14px]"
                            htmlFor="date"
                          >
                            Date 1
                          </label>
                          <CustomCalendar
                            dateFormat="mm/dd/yy"
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
                            className="labelClass mb-[5px] mt-[14px]"
                            htmlFor="date"
                          >
                            Date 2
                          </label>
                          <CustomCalendar
                            dateFormat="mm/dd/yy"
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
                            className="labelClass mb-[5px] mt-[14px]"
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
                            className="border rounded-[8px] border-solid border-slate-300 border-1 h-[4.35vh]"
                            id="promoCode"
                          />
                        </div>
                        <div className="flex flex-col w-[40vw]">
                          <label
                            className="labelClass mb-[5px] mt-[14px]"
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
                            className="labelClass mb-[5px] mt-[14px]"
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
                            className="labelClass mb-[5px] mt-[14px]"
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
                            className="labelClass mb-[5px] mt-[14px]"
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
                            className="border rounded-[8px] border-solid h-[4.35vh] bg-[#30343B] border-[#30343B]"
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
          <div className="flex items-center gap-4 mt-[10px] overflow-scroll ml-[2.85vw]">
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
                          ? e.value.toLocaleString("en-US")
                          : e.value.toLocaleDateString("en-US")
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
            <div className="bg-[#30343B] border-0 rounded-[10px] w-[71.74vw] ml-[2.85vw] h-[63.36vh] mt-[3vh]">
              <LineChart options={options} data={data} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OpmComparison;
