import { Calendar } from "primereact/calendar";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { FC, useEffect, useState } from "react";
import { CustomCalendarProps } from "../../@types/BarChart";
import ArrowDown from "../../assets/arrow_down.svg";
import ArrowUp from "../../assets/arrow_up.svg";
import { AM_PM_OPTIONS } from "../../constants/appConstants";
import { convert12to24Hour, convert24to12Hour } from "../utils/Utils";
import CustomImage from "./customimage";

type ManualInputTimeProps = {
  hour: number;
  minute: number;
  handleHourChange: (e: InputNumberValueChangeEvent) => void;
  handleMinuteChange: (e: InputNumberValueChangeEvent) => void;
  ampm: string;
  toggleAmPmChange: (e) => void;
};

const CustomCalendar: FC<CustomCalendarProps> = (props) => {
  const today = new Date();
  const [hour, setHour] = useState<number>(convert24to12Hour(today.getHours()).hour12);
  const [minute, setMinute] = useState<number>(today.getMinutes());
  const [date, setDate] = useState<Date>(today);
  const [event, setEvent] = useState(null);
  const [ampm, setAmPm] = useState(convert24to12Hour(today.getHours()).ampm);

  const handleHourChange = (e) => {
    setHour(e.target.value);
    setEvent(e);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
    setEvent(e);
  };

  const toggleAmPmChange = (e) => {
    setEvent(e)
    if (ampm === AM_PM_OPTIONS[0].value) {
      setAmPm(AM_PM_OPTIONS[1].value)
    } else {
      setAmPm(AM_PM_OPTIONS[0].value);
    }
  };

  const getUpdatedDate = (e) => {
    let _hour = convert12to24Hour(hour, ampm);
    date.setHours(_hour);
    date.setMinutes(minute);
    setDate(date);
    let event = { ...e, value: date, target: { value: date, name: props.name } };
    props.onChange(event);
  }

  const onChange = (e) => {
    if (props.showTime) {
      let date = e.target?.value;
      setDate(date);
      setEvent(e);
    } else {
      props.onChange(e);
    }
  }

  useEffect(() => {
    if (props.value) {
      let _date = new Date(props.value);
      setDate(_date);
      setHour(convert24to12Hour(_date.getHours()).hour12);
      setMinute(_date.getMinutes());
    }
  }, [props.value]);


  useEffect(() => {
    if (event) {
      getUpdatedDate(event);
    }
  }, [hour, minute, ampm, event])

  return (
    <div className={`flex flex-col self-end ${props.containerclassname}`}>
      <div
        className={`text-xs font-medium pb-1 text-[#898A8D] relative ${props.titleclassname}`}
      >
        {props.title}
      </div>
      <img className={props.imageclassname} src={props.imgsrc} />
      <Calendar
        {...props}
        readOnlyInput
        showTime={props.showTime || false}
        hourFormat={props.hourFormat || "12"}
        placeholder={props.placeholder}
        value={date}
        dateFormat="mm/dd/yy"
        hideOnDateTimeSelect={props.hideOnDateTimeSelect || true}
        onChange={(e) => onChange(e)}
        iconPos={props.iconPos}
        footerTemplate={() => (props.showTime &&
          <ManualInputTime
            hour={hour}
            minute={minute}
            handleHourChange={handleHourChange}
            handleMinuteChange={handleMinuteChange}
            ampm={ampm}
          toggleAmPmChange={toggleAmPmChange}
        />
        )
        } />
    </div>
  )
}

const ManualInputTime: FC<ManualInputTimeProps> = ({ hour, minute, handleHourChange, handleMinuteChange, ampm, toggleAmPmChange }) => {
  return (
    <div className="flex justify-evenly w-[12rem] mx-auto items-center">
      <InputNumber value={hour} step={1} onValueChange={(e) => handleHourChange(e)} showButtons buttonLayout="vertical" min={0} max={12} /> :
      <InputNumber value={minute} onValueChange={(e) => handleMinuteChange(e)} showButtons buttonLayout="vertical" step={1} min={0} max={59} />:
      <div className="ampm-comp px-[1rem] min-w-[4rem]">
        <CustomImage
          src={ArrowUp}
          className="cursor-pointer"
          onClick={toggleAmPmChange}
        />
        <div className="my-[0.3rem]">{ampm}</div>
        <CustomImage
          src={ArrowDown}
          className="cursor-pointer"
          onClick={toggleAmPmChange}
        />
      </div>
    </div>
  )
}
export default CustomCalendar;
