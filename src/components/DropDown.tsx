import React from "react";
import { Dropdown } from "primereact/dropdown";

interface value {
  name: string;
  code: string;
}

interface Props {
  onChange: any;
  options: any;
  icon?: string;
  dropdownIcon?: any;
  value?: value | undefined;
  imageClassName?: string;
  optionLabel: string;
  placeholder: string;
}

const CustomDropdown: React.FC<Props> = ({
  onChange,
  options,
  icon,
  imageClassName,
  value,
  optionLabel,
  dropdownIcon,
  placeholder,
}) => {
  return icon ? (
    <span className="flex">
      <img className={imageClassName} src={icon} />
      <Dropdown
        dropdownIcon={dropdownIcon}
        value={value}
        onChange={onChange}
        options={options}
        optionLabel={optionLabel}
        placeholder={placeholder}
      />
    </span>
  ) : (
    <Dropdown
      dropdownIcon={dropdownIcon}
      value={value}
      onChange={onChange}
      options={options}
      optionLabel={optionLabel}
      placeholder={placeholder}
    />
  );
};

export default CustomDropdown;
