import { FC, KeyboardEvent } from "react";
import CustomInputText from "./custominputtext";

type Props = {
  searchValue: string;
  setSearchValue: (a: string) => void;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const SearchField: FC<Props> = ({ searchValue, setSearchValue, onSearch }) => {

  return (
    <div className="flex sm:hidden h-[56px] bg-[#1C1C20] border-solid border-b border-[#30343B] border-1 px-5 py-[9px] absolute top-[56px] w-full z-50">
      <CustomInputText
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onSearch(e)}
        className="w-full focus:outline-none text-[#FAF9F6]  placeholder:text-[#898A8D] bg-[#30343B] placeholder:font-helvetica placeholder:font-normal placeholder:border placeholder:border-solid placeholder:border-[#30343B] !shadow-none !border-none"
        placeholder="Search Orders"
      />
    </div>
  );
};

export default SearchField;
