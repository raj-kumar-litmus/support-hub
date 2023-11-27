import { FC } from "react";
import CustomIcon from "./CustomIcon";
import { FilterItemProps } from "../../@types/BarChart";

const FilterItem: FC<FilterItemProps> = (props) => (
  <div className="flex items-baseline text-gray-500 font-normal text-sm ml-0 mr-2 mb-2 px-4 py-1 border border-slate-200 rounded-2xl">
    <CustomIcon
      alt={props.alt}
      src={props.src}
      width="12px"
      height="12px"
      className="mr-2"
    />
    {props.value}
  </div>
);

export default FilterItem;
