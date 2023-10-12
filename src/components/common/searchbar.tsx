import { FC } from "react";
import SearchIcon from "../../assets/search.svg";
import { Button } from "primereact/button";
import CustomImage from "./customimage";
import CustomInputText from "./custominputtext";
import CustomButton from "../Button";

type Props = {
  showSearchButton: boolean;
  openSearchField: boolean;
  setOpenSearchField: (a: boolean) => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
};

const SearchBar: FC<Props> = ({
  showSearchButton,
  setOpenSearchField,
  openSearchField,
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="block">
      <CustomInputText
        type="text"
        className="w-full min-w-[400px] h-10 !bg-gray-100  p-4 !rounded-full hidden sm:block focus:outline-none placeholder:text-stone-500 placeholder:font-helvetica placeholder:font-medium !shadow-none !border-none"
        placeholder="Search Order #"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {showSearchButton && (
        <CustomButton
          isTextButton
          className="search-button"
          onClick={() => setOpenSearchField(!openSearchField)}
        >
          <CustomImage className="h-[13px]" src={SearchIcon} alt="Search" />
        </CustomButton>
      )}
    </div>
  );
};

export default SearchBar;
