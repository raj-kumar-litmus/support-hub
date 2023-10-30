import React from "react";
import { InputText } from "primereact/inputtext";

interface Props {
  onChange: any;
  value?: string;
  name?: string;
  id?: string;
  icon?: string;
  imageClassName?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
}

const CustomInputText: React.FC<Props> = ({
  onChange,
  className,
  imageClassName,
  containerClassName,
  name,
  label,
  icon,
  id,
  placeholder,
}) => {
  return icon ? (
    <div className={`flex flex-col promoCodeInput ${containerClassName}`}>
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[18px]">
        {label}
      </label>
      <span className="p-input-icon-left flex">
        <img className={imageClassName} src={icon} />
        <InputText
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
          id={id}
          type="text"
        />
      </span>
    </div>
  ) : (
    <div
      className={`flex flex-col promoCodeInput md:w-[8vw] ${containerClassName}`}
    >
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[18px]">
        {label}
      </label>
      <InputText
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        id={id}
        type="text"
      />
    </div>
  );
};

export default CustomInputText;
