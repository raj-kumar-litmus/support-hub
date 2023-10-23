import { FC } from "react";
import RightArrowIcon from "../../assets/right_arrow.svg";
import { Button } from "primereact/button";
import CustomImage from "./customimage";
import CustomInputText from "./custominputtext";

type Props = {
  searchValue: string;
  setSearchValue: (a: string) => void;
};

const SearchField: FC<Props> = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex sm:hidden h-[56px] bg-[#1C1C20] border-solid border-b border-[#30343B] border-1 px-5 py-[9px] absolute top-[56px] w-full z-50">
      <CustomInputText
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full focus:outline-none text-[#898A8D]  placeholder:text-[#898A8D] bg-[#30343B] placeholder:font-helvetica placeholder:font-normal placeholder:border placeholder:border-solid placeholder:border-[#30343B] !shadow-none !border-none"
        placeholder="Search Orders"
      />
    </div>
  );
};

export default SearchField;
