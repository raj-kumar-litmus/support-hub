import { FC, useState } from "react";
import SephoraLogo from "../../assets/logo.svg";
import MenuIcon from "../../assets/menu.svg";
import SearchBar from "./searchbar";
import CustomImage from "./customimage";
import { useNavigate } from "react-router-dom";
import { MENU_LIST } from "../utils/Utils";

type Props = {
  showSidePane: boolean;
  showSidePaneGrid: boolean;
  setShowSidePaneGrid: (a: boolean) => void;
  openSearchField: boolean;
  setOpenSearchField: (a: boolean) => void;
  searchValue: string;
  setSearchValue: (a: string) => void;
};

const Navbar: FC<Props> = ({
  showSidePane,
  showSidePaneGrid,
  setShowSidePaneGrid,
  openSearchField,
  setOpenSearchField,
  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(MENU_LIST[0].path);
  };

  const toggleShowSidePane = () => {
    setShowSidePaneGrid(!showSidePaneGrid);
    setOpenSearchField(false);
  };

  return (
    <div
      className={`py-0 pr-1 sm:px-10 flex items-center border-[#30343B] border-solid border-b justify-between h-[56px] absolute top-0 left-0 w-full z-50 bg-[#1C1C20] sm:bg-[#26262B]`}
    >
      <div
        className={`flex pl-4 ${
          showSidePaneGrid
            ? "w-[367px] bg-[#26262B] h-[56px] items-center border-[#30343B] border-solid border-b"
            : "w-auto"
        }`}
      >
        {showSidePane && (
          <CustomImage
            className="h-[13px] sm:hidden pr-4 cursor-pointer"
            src={MenuIcon}
            alt="Menu"
            onClick={toggleShowSidePane}
          />
        )}
        <CustomImage
          className="h-[13px] cursor-pointer"
          src={SephoraLogo}
          alt="SEPHORA"
          onClick={navigateToHome}
        />
      </div>
      <div className="sm:m-auto">
        <SearchBar
          showSearchButton={!showSidePaneGrid}
          setOpenSearchField={setOpenSearchField}
          openSearchField={openSearchField}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
    </div>
  );
};

export default Navbar;
