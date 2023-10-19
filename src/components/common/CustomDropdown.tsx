import { FC } from "react";
import { Dropdown } from "primereact/dropdown";
import { CustomDropdownProps } from "../../@types/BarChart";
import CustomIcon from "./CustomIcon";

const CustomDropdown: FC<CustomDropdownProps> = (props) => (
  <>
    <div className="text-sm font-bold text-gray-500">{props.title}</div>
    <div className="flex relative">
      {props.showIcon && (
        <CustomIcon
          alt={props.iconAlt}
          src={props.iconSrc}
          width="16px"
          height="16px"
          className="absolute top-4 left-2 z-10"
        />
      )}
      <Dropdown
        value={props.value}
        name={props.name}
        onChange={(e: any) => props.onChange(e)}
        options={props.options}
        optionLabel={props.optionLabel}
        placeholder={props.placeHolder}
        dropdownIcon={
          <CustomIcon
            alt={"drop-down-arrow"}
            src={`src/assets/${!props.showIcon ? `filter` : `arrowdown`}.svg`}
            width="16px"
            height="16px"
          />
        }
        className={`w-full md:w-14rem mt-1 min-w-full ${
          props.showIcon ? `pl-6` : ``
        } `}
      />
    </div>
  </>
);

export default CustomDropdown;
