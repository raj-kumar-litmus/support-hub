import { InputText } from "primereact/inputtext";
import React from "react";

interface Props {
  onChange: any;
  value?: string;
  name?: string;
  id?: string;
  icon?: string;
  imageclassname?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  containerclassname?: string;
}

const CustomInputText: React.FC<Props> = ({
  onChange,
  value,
  className,
  imageclassname,
  containerclassname,
  name,
  label,
  icon,
  id,
  placeholder,
}) => {
  return icon ? (
    <div className={`flex flex-col lg:w-[8vw] ${containerclassname}`}>
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[1.2vw] sm:ml-[1.25rem] sm:w-[10vw]">
        {label}
      </label>
      <span className="p-input-icon-left flex">
        <img className={imageclassname} src={icon} />
        <InputText
          value={value}
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
    <div className={`flex flex-col md:w-[8vw] ${containerclassname}`}>
      <label className="labelClass relative mb-[5px] mt-[14px] ml-[1.2vw]">
        {label}
      </label>
      <InputText
        value={value}
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
