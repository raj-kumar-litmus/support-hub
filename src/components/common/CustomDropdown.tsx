import { FC } from "react";
import { Dropdown } from "primereact/dropdown";
import { CustomDropdownProps } from "../../@types/BarChart";
import CustomIcon from "./CustomIcon";
import FilterIcon from "../../assets/arrow_filter.svg";
import ArrowDownIcon from "../../assets/arrowdown.svg";

const CustomDropdown: FC<CustomDropdownProps> = (props) => (
  <>
    <div className="text-xs font-medium pb-1 text-gray-400">{props.title}</div>
    <div className="flex relative">
      {props.showIcon && props.showLeftIcon && (
        <CustomIcon
          alt={props.iconAlt}
          src={props.iconSrc}
          width="1rem"
          height="1rem"
          className="absolute top-[0.65rem] left-2 mr-1 z-10"
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
            src={props.showIcon ? ArrowDownIcon : FilterIcon}
            width="1rem"
            height="1rem"
          />
        }
        className={`w-full md:w-36 min-w-full ${
          props.showIcon ? `pl-8` : `pl-4`
        } `}
      />
    </div>
  </>
);

export default CustomDropdown;
