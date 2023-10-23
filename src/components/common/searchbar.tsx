import { FC } from "react";
import HeaderSearch from "../../assets/headersearch.svg";
import CustomButton from "../Button";
import CustomImage from "./customimage";
import CustomInputText from "./custominputtext";

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
          className="w-full min-w-[400px] h-[40px] !rounded-full focus:outline-none  !bg-[#30343B] text-[#FAF9F6] placeholder:text-[#FAF9F6] placeholder:font-helvetica placeholder:font-normal !shadow-none !border-none"
          placeholder="Search Order"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </span>
      {showSearchButton && (
        <CustomButton
          isTextButton
          className="search-button"
          onClick={() => setOpenSearchField(true)}
        >
          <CustomImage className="h-[13px]" src={HeaderSearch} alt="Search" />
        </CustomButton>
      )}
    </div>
  );
};

export default SearchBar;
