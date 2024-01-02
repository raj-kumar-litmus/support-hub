import { Dropdown } from "primereact/dropdown";
import React from "react";
import CustomImage from "./customimage";
import { CustomDropdownProps } from "../../@types/components/commonTypes";

const CustomDropdown: React.FC<CustomDropdownProps> = (props) => {
  const {
    containerclassname = "",
    labelclassname = "",
    imageclassname = "",
    className = "",
  } = props;

  return props.icon ? (
    <div
      className={`w-full self-end ${containerclassname}`}
    >
      <label
        className={`labelClass relative ${labelclassname}`}
      >
        {props.label}
      </label>
      <div className="flex w-full relative">
        <CustomImage className={`${imageclassname} absolute top-[0.6rem] pl-2.5`} src={props.icon} />
        <Dropdown
          dropdownIcon={props.dropdownIcon}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          options={props.options}
          optionLabel={props.optionLabel}
          placeholder={props.placeholder}
          className={`w-full label-position ${className}`}
          {...props}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col self-end md:w-8w">
      <label className="labelClass relative ml-18">{props.label}</label>
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
