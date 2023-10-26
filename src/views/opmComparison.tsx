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

import FilterIcon from "../assets/filter.svg";
import ChannelIcon from "../assets/channel.svg";
import SandGlassIcon from "../assets/sandglass.svg";
import open_in_full_window from "../assets/open_in_full_window.svg";
import OPM from "./opm";

import { OPM_COMPARISON_OPTIONS } from "../constants/appConstants";
import { fetchData } from "../utils/fetchUtil";

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
    startTimeOne: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    startDateTwo: new Date(Date.now() - 86400000).toLocaleDateString("en-US"),
    channel: "",
  };

  const [url, setUrl] = useState<string>(
    `/compareOPM?period=${DEFAULT.duration}&startTimeOne=${DEFAULT.startTimeOne}&startDateTwo=${DEFAULT.startDateTwo}&channel=${DEFAULT.channel}`,
  );

  const [options, setOptions] = useState<null | ChartOptions>(null);
  const [data, setData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      imgsrc: "src/assets/white_calendar.svg",
    },
    {
      type: "time",
      name: "endDate",
      label: "Date 2",
      value: "",
      imgsrc: "src/assets/white_calendar.svg",
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
        if (e.name === "startDate") {
          str += `startTimeOne=${e.value.toISOString()}&`;
          return;
        }
        if (e.name === "endDate") {
          str += `startDateTwo=${e.value.toLocaleDateString("en-US")}&`;
          return;
        }
        str += `${e.name}=${e.value.name || e.value}&`;
      }
    });
    setUrl(`/compareOPM?${str}`);
    if (showFilters) setShowFilters(false);
  };

  useEffect(() => {
    // on page load, we compare yesterday with today ten minutes earlier;
    handleFormChange({
      target: {
        name: "startDate",
        value: new Date(Date.now() - 600000),
      },
    });
    handleFormChange({
      target: {
        name: "endDate",
        value: new Date(Date.now() - 86400000),
      },
    });
  }, []);

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
          isMobile: width < 700,
        }),
      );
    }
  }, [apiResponse]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(url, {});
      setIsLoading(false);
      setApiResponse(data);
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
                  className="grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-5"
                  onSubmit={submit}
                >
                  {formFields.map((form) => {
                    return (
                      <>
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
                            containerClassName="opmFiltersMobileCalendar"
                            title={form.label}
                            // showTime={form.showTime}
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
                    label="Submit"
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
      <div
        className={`flex items-center gap-4 mt-[10px] overflow-scroll ml-[5vw] lg:ml-[3vw] w-[90vw] ${
          IS_FULLSCREEN ? "rotate-90 absolute left-[40vw] top-[45vh]" : ""
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
            label="Reset"
            severity="secondary"
            className="resetFilters text-[12px] text-[#575353]"
            isTextButton={true}
            onClick={clearAllHandler}
          />
        )}
      </div>
      {data && !isLoading && (
        <div className="">
          <LineChart
            title="OPM Comparison"
            isFullScreen={IS_FULLSCREEN}
            className="border-0 rounded-[10px] lg:w-[71.74vw] lg:ml-[2.85vw] h-[340px] lg:h-[62.23vh] lg:mt-[3vh] "
            options={options}
            data={data}
          />
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default OpmComparison;
