import React from "react";
import { InputText } from "primereact/inputtext";

interface Props {
  onChange: any;
  id: string;
  placeholder?: string;
  className: string;
}

const CustomInputText: React.FC<Props> = ({
  onChange,
  className,
  id,
  placeholder,
}) => {
  return (
    <InputText
      placeholder={placeholder}
      onChange={onChange}
      className={className}
      id={id}
      type="text"
    />
  );
};

export default CustomInputText;
