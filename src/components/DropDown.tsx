import { Dropdown } from "primereact/dropdown";
import React from "react";
import { CustomDropdownProps } from "../@types/components/commonTypes";

const CustomDropdown: React.FC<CustomDropdownProps> = (props) => {
  return props.icon ? (
    <div
      className={`flex flex-col self-end inputContainer w-[10vw] lg:w-[8vw] ${props.containerclassname}`}
    >
      <label
        className={`labelClass relative ml-[18px] ${props.labelclassname}`}
      >
        {props.label}
      </label>
      <span className="flex">
        <img className={props.imageclassname} src={props.icon} />
        <Dropdown
          dropdownIcon={props.dropdownIcon}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          options={props.options}
          optionLabel={props.optionLabel}
          placeholder={props.placeholder}
        />
      </span>
    </div>
  ) : (
    <div className="flex flex-col self-end inputContainer md:w-[8vw]">
      <label className="labelClass relative ml-[18px]">{props.label}</label>
      <Dropdown
        dropdownIcon={props.dropdownIcon}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        options={props.options}
        optionLabel={props.optionLabel}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default CustomDropdown;
