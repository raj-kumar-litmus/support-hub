import React from "react";
import { InputText, InputTextProps } from "primereact/inputtext";
 
interface Props extends InputTextProps {
  onChange: any;
  value?: string;
  name?: string;
  id?: string;
  icon?: string;
  label?: string;
  placeholder?: string;
  imageclassname?: string | "";
  containerClassName?: string | "";
}
 
const CustomInputText: React.FC<Props> = (props) => {
  return (
    <div className={`flex flex-col w-full relative ${props.containerClassName} self-end `}>
      {props.label &&
        <label className="relative text-xs font-medium pb-1 text-gray-400">
          {props.label}
        </label >
      }
      {props.icon &&
        <img className={`absolute top-8 left-2 ${props.imageclassname}`} src={props.icon} />
      }
      <InputText
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        id={props.id}
        type="text"
        className={`${props.icon ? "p-2 pl-8" : ""} ${props.className}`}
 
      />
    </div>
  );
};
 
export default CustomInputText;