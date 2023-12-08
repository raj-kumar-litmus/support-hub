import { InputText} from "primereact/inputtext";
import React from "react";
import { CustomInputTextProps } from "../@types/components/commonTypes";

const CustomInputText: React.FC<CustomInputTextProps> = (props) => {
  return (
    <div className={`flex flex-col w-full relative ${props.containerclassname} self-end `}>
      {props.label &&
        <label className="relative text-xs font-medium pb-1 text-gray-400">
          {props.label}
        </label >
      }
      {props.icon &&
        <img className={`absolute top-8 left-2 ${props.imageclassname}`} src={props.icon} />
      }
      <InputText
        {...props}
        className={`${props.icon ? "p-2 pl-8" : ""} ${props.className}`}    
 
      />
    </div>
  );
};
 
export default CustomInputText;