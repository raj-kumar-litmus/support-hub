import { FC } from "react";
import SearchIcon from "../../assets/search.svg";
import HeaderSearch from "../../assets/headersearch.svg";
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
      <span className="search-input p-input-icon-left hidden sm:block">
        <CustomImage
          src={HeaderSearch}
          alt="Search"
          className="absolute left-5 bottom-3"
        />
        <CustomInputText
          type="text"
          className="w-full min-w-[400px] h-[40px] !rounded-full focus:outline-none  !bg-[#30343B] placeholder:text-[#FAF9F6]placeholder:font-helvetica placeholder:font-normal !shadow-none !border-none"
          placeholder="Search Order"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </span>
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
