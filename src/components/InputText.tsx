import React from "react";
import { InputText } from "primereact/inputtext";

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
    <div className={`flex flex-col lg:w-8w ${containerclassname}`}>
      <label className="labelClass relative mb-5p mt-3.5 ml-1.2w sm:ml-5 sm:w-10w">
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
    <div className={`flex flex-col md:w-8w ${containerclassname}`}>
      <label className="labelClass relative mb-5p mt-3.5 ml-1.2w">
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
