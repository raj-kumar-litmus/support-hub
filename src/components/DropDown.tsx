import React from "react";
import { Dropdown } from "primereact/dropdown";

interface Props {
  onChange: any;
  options: any;
  icon?: string;
  dropdownIcon?: any;
  value?: string;
  imageclassname?: string;
  optionLabel: string;
  label?: string;
  containerclassname?: string;
  name?: string;
  placeholder: string;
}

const CustomDropdown: React.FC<Props> = ({
  onChange,
  options,
  icon,
  name,
  imageclassname,
  containerclassname,
  label,
  value,
  optionLabel,
  dropdownIcon,
  placeholder,
}) => {
  return icon ? (
    <div
      className={`flex flex-col self-end inputContainer w-[10vw] md:w-[8vw] ${containerclassname}`}
    >
      <label className="labelClass relative ml-[18px]">{label}</label>
      <span className="flex">
        <img className={imageclassname} src={icon} />
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
