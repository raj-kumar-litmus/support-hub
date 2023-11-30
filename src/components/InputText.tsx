import { InputText } from "primereact/inputtext";
import React from "react";
import { CustomInputTextProps } from "../@types/components/commonTypes";

const CustomInputText: React.FC<CustomInputTextProps> = (props) => {
  return props.icon ? (
    <div className={`flex flex-col lg:w-[8vw] ${props.containerclassname}`}>
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[1.2vw] sm:ml-[1.25rem] sm:w-[10vw]">
        {props.label}
      </label>
      <span className="p-input-icon-left flex">
        <img className={props.imageclassname} src={props.icon} />
        <InputText
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className={props.className}
          id={props.id}
          type="text"
        />
      </span>
    </div>
  ) : (
    <div className={`flex flex-col md:w-[8vw] ${props.containerclassname}`}>
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[1.2vw]">
        {props.label}
      </label>
      <InputText
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={props.className}
        id={props.id}
        type="text"
      />
    </div>
  );
};

export default CustomInputText;
