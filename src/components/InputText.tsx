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
}

const CustomInputText: React.FC<Props> = ({
  onChange,
  className,
  imageClassName,
  label,
  icon,
  id,
  placeholder,
}) => {
  return icon ? (
    <div className="flex flex-col promoCodeInput w-[9vw]">
      <label className="labelClass mb-[5px] mt-[14px]">{label}</label>
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
    </div>
  ) : (
    <div className="flex flex-col promoCodeInput w-[9vw]">
      <label className="labelClass mb-[5px] mt-[14px]">{label}</label>
      <InputText
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
