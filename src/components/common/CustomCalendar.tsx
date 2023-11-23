import { Calendar } from "primereact/calendar";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { FC, useEffect, useState } from "react";
import { CustomCalendarProps } from "../../@types/BarChart";
import ArrowDown from "../../assets/arrow_down.svg";
import ArrowUp from "../../assets/arrow_up.svg";
import { AM_PM_OPTIONS } from "../../constants/appConstants";
import { CURRENT_PST_DATE } from "../../utils/dateTimeUtil";
import { convert12to24Hour, convert24to12Hour } from "../utils/Utils";
import CustomImage from "./customimage";
import CustomToast from "./CustomToast";

type ManualInputTimeProps = {
  hour: number;
  minute: number;
  handleHourChange: (e: InputNumberValueChangeEvent) => void;
  handleMinuteChange: (e: InputNumberValueChangeEvent) => void;
  ampm: string;
  toggleAmPmChange: (e) => void;
};

const CustomCalendar: FC<CustomCalendarProps> = (props) => {
  const [hour, setHour] = useState<number>(convert24to12Hour(CURRENT_PST_DATE.getHours()).hour12);
  const [minute, setMinute] = useState<number>(CURRENT_PST_DATE.getMinutes());
  const [date, setDate] = useState<Date>(CURRENT_PST_DATE);
  const [event, setEvent] = useState(null);
  const [ampm, setAmPm] = useState(convert24to12Hour(CURRENT_PST_DATE.getHours()).ampm);
  const [showFutureDateToast, setShowFutureDateToast] =
    useState<boolean>(false);

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
    let _date = new Date(date);
    _date.setHours(_hour);
    _date.setMinutes(minute);
    setShowFutureDateToast(false);
    if (props.maxDate && !(_date < props.maxDate)) {
      setShowFutureDateToast(true);
      setHour(convert24to12Hour(CURRENT_PST_DATE.getHours()).hour12);
      setMinute(CURRENT_PST_DATE.getMinutes());
      setAmPm(convert24to12Hour(CURRENT_PST_DATE.getHours()).ampm);
      setDate(CURRENT_PST_DATE)
      return;
    }
    setDate(_date);
    let event = { ...e, value: _date, target: { value: _date, name: props.name } };
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
      <CustomToast
        onHide={() => setShowFutureDateToast(false)}
        showToast={showFutureDateToast}
        severity="warn"
        detail="Please select a date and time on or before the current moment."
        position="top-center"
        life={3000}
      />
    </div>
  )
}

const ManualInputTime: FC<ManualInputTimeProps> = ({ hour, minute, handleHourChange, handleMinuteChange, ampm, toggleAmPmChange }) => {
  return (
    <div className="flex justify-evenly w-[12rem] mx-auto items-center">
      <InputNumber value={hour < 1 ? 12 : hour} step={1} onValueChange={(e) => handleHourChange(e)} showButtons buttonLayout="vertical" min={0} max={12} prefix={hour && hour < 10 && "0"} /> :
      <InputNumber value={minute} onValueChange={(e) => handleMinuteChange(e)} showButtons buttonLayout="vertical" step={1} min={0} max={59} prefix={minute < 10 && "0"} />:
      <div className="ampm-comp px-[1rem] min-w-[4rem]">
        <CustomImage
          src={ArrowUp}
          className="cursor-pointer ampm-arrow"
          onClick={toggleAmPmChange}
        />
        <div className="my-[0.3rem]">{ampm}</div>
        <CustomImage
          src={ArrowDown}
          className="cursor-pointer ampm-arrow"
          onClick={toggleAmPmChange}
        />
      </div>
    </div>
  )
}
export default CustomCalendar;
