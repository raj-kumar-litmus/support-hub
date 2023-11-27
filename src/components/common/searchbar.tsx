import { FC, KeyboardEvent } from "react";
import HeaderSearch from "../../assets/headersearch.svg";
import CustomButton from "../Button";
import CustomImage from "./customimage";
import CustomInputText from "./custominputtext";

type Props = {
  showSearchButton?: boolean;
  openSearchField?: boolean;
  setOpenSearchField?: (a: boolean) => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
  hideIcon?: boolean;
  onSearch: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
};

const SearchBar: FC<Props> = ({
  showSearchButton,
  openSearchField,
  setOpenSearchField,
  searchValue,
  setSearchValue,
  hideIcon,
  onSearch,
  placeholder,
  className,
}) => {
  return (
    <div className="block">
      <span className="search-input p-input-icon-left hidden sm:block">
        {!hideIcon && (
          <CustomImage
            src={HeaderSearch}
            alt="Search"
            className="absolute left-5 bottom-3"
          />
        )}
        <CustomInputText
          type="text"
          className={`w-[15.6rem] h-[2.5rem] !rounded-full focus:outline-none  bg-gray-900 text-gray-300 placeholder:text-gray-300 placeholder:font-helvetica placeholder:font-normal !shadow-none !border-none ${className}`}
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => onSearch(e)}
        />
      </span>
      {showSearchButton && (
        <CustomButton
          isTextButton
          className="search-button"
          onClick={() => setOpenSearchField(!openSearchField)}
        >
          <CustomImage className="h-[13px]" src={HeaderSearch} alt="Search" />
        </CustomButton>
      )}
    </div>
  );
};

export default SearchBar;
