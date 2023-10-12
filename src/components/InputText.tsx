import React from "react";
import { InputText } from "primereact/inputtext";

interface Props {
  onChange: any;
  id?: string;
  icon?: string;
  imageClassName?: string;
  placeholder?: string;
  className?: string;
}

const CustomInputText: React.FC<Props> = ({
  onChange,
  className,
  imageClassName,
  icon,
  id,
  placeholder,
}) => {
  return icon ? (
    <span className="p-input-icon-left flex">
      <img className={imageClassName} src={icon} />
      <InputText
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        id={id}
        type="text"
      />
    </span>
  ) : (
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
