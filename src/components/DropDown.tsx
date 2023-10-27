import React from "react";
import { Dropdown } from "primereact/dropdown";

interface Props {
  onChange: any;
  options: any;
  icon?: string;
  dropdownIcon?: any;
  value?: string;
  imageClassName?: string;
  optionLabel: string;
  label?: string;
  containerClassName?: string;
  name?: string;
  placeholder: string;
}

const CustomDropdown: React.FC<Props> = ({
  onChange,
  options,
  icon,
  name,
  imageClassName,
  containerClassName,
  label,
  value,
  optionLabel,
  dropdownIcon,
  placeholder,
}) => {
  return icon ? (
    <div
      className={`flex flex-col self-end inputContainer md:w-[8vw] ${containerClassName}`}
    >
      <label className="labelClass relative ml-[18px]">{label}</label>
      <span className="flex">
        <img className={imageClassName} src={icon} />
        <Dropdown
          dropdownIcon={dropdownIcon}
          value={value}
          name={name}
          onChange={onChange}
          options={options}
          optionLabel={optionLabel}
          placeholder={placeholder}
        />
      </span>
    </div>
  ) : (
    <div className="flex flex-col self-end inputContainer md:w-[8vw]">
      <label className="labelClass relative ml-[18px]">{label}</label>
      <Dropdown
        dropdownIcon={dropdownIcon}
        value={value}
        name={name}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomDropdown;
