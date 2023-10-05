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
    <div className="flex sm:hidden px-6 border-slate-200  border-solid	 border-b justify-between">
      <CustomInputText type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full focus:outline-none placeholder:text-stone-500 bg-transparent placeholder:font-helvetica placeholder:font-medium !shadow-none !border-none" placeholder="Search Order" />
      <Button text className='-ml-8 button-focus !shadow-none'>
        <CustomImage className="arrow-icon" src={RightArrowIcon} alt="Search" />
      </Button>
    </div>
  );
};

export default SearchField;
