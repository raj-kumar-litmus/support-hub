import { FC } from "react";
import CustomButton from "../Button";
import CustomImage from "./customimage";
import CustomInputText from "../InputText";
import HeaderSearch from "../../assets/headersearch.svg";
import { SearchBarProps } from "../../@types/components/commonTypes";

const SearchBar: FC<SearchBarProps> = (props) => {
  return (
    <div className="block">
      <span className="search-input p-input-icon-left hidden sm:block">
        <CustomInputText
          type="text"
          className={`w-[15.6rem] h-[2.5rem] !rounded-full focus:outline-none  bg-gray-900 text-gray-300 placeholder:text-gray-300 placeholder:font-helvetica placeholder:font-normal !shadow-none !border-none ${props.className}`}
          placeholder={props.placeholder}
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
          onKeyDown={(e) => props.onSearch(e)}
          icon={HeaderSearch}
          imageclassname="!top-3 left-4"
        />
      </span>
      {props.showSearchButton && (
        <CustomButton
          isTextButton
          className="search-button"
          onClick={() => props.setOpenSearchField(!props.openSearchField)}
        >
          <CustomImage className="h-13" src={HeaderSearch} alt="Search" />
        </CustomButton>
      )}
    </div>
  );
};
 
export default SearchBar;