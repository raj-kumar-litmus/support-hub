import { InputText } from "primereact/inputtext";
import React from "react";
import { CustomInputTextProps } from "../@types/components/commonTypes";

const CustomInputText: React.FC<CustomInputTextProps> = (props) => {
  return props.icon ? (
    <div className={`flex flex-col lg:w-8w ${props.containerclassname}`}>
      <label className="labelClass relative mb-5p mt-3.5 ml-1.2w sm:ml-5 sm:w-10w">
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
    <div className={`flex flex-col md:w-8w ${props.containerclassname}`}>
      <label className="labelClass relative mb-5p mt-3.5 ml-1.2w">
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
