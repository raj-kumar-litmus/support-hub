import { FC, KeyboardEvent } from "react";
import CustomInputText from "../InputText";
 
type Props = {
  searchValue: string;
  setSearchValue: (a: string) => void;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
};
 
const SearchField: FC<Props> = ({ searchValue, setSearchValue, onSearch }) => {
  return (
    <div className="flex sm:hidden h-[56px] bg-black-200 border-solid border-b border-gray-900 border-1 px-5 py-[9px] absolute top-[56px] w-full z-50">
      <CustomInputText
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onSearch(e)}
        className="w-full focus:outline-none text-gray-300 placeholder:text-gray-400 bg-gray-900 placeholder:font-helvetica placeholder:font-thin placeholder:border placeholder:border-solid placeholder:border-gray-900 !shadow-none !border-none rounded-[20px]"
        placeholder="Search Orders"
      />
    </div>
  );
};
 
export default SearchField;
 