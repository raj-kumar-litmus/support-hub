import React from "react";
import { Dropdown } from "primereact/dropdown";

interface value {
  name: string;
  code: string;
}

interface Props {
  onChange: any;
  options: any;
  dropdownIcon?: any;
  value?: value | undefined;
  optionLabel: string;
  placeholder: string;
}

const CustomDropdown: React.FC<Props> = ({
  onChange,
  options,
  value,
  optionLabel,
  dropdownIcon,
  placeholder,
}) => {
  return (
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
