import { FC } from "react";
import CustomInputText from "../InputText";
import { SearchFieldProps } from "../../@types/components/commonTypes";

const SearchField: FC<SearchFieldProps> = (props) => {
  return (
    <div className="flex sm:hidden h-14 bg-black-200 border-solid border-b border-gray-900 border-1 px-5 py-9p absolute top-14 w-full z-50">
      <CustomInputText
        type="text"
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
        onKeyDown={(e) => props.onSearch(e)}
        className="w-full focus:outline-none text-gray-300 placeholder:text-gray-400 bg-gray-900 placeholder:font-helvetica placeholder:font-thin placeholder:border placeholder:border-solid placeholder:border-gray-900 !shadow-none !border-none rounded-20"
        placeholder="Search Orders"
      />
    </div>
  );
};
 
export default SearchField;
 