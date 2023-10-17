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
};

const Navbar: FC<Props> = ({
  showSidePane,
  showSidePaneGrid,
  setShowSidePaneGrid,
  openSearchField,
  setOpenSearchField,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(MENU_LIST[0].path);
  };

  return (
    <div className="py-0 pl-4 pr-1 sm:px-10 flex items-center border-slate-200  border-solid	 border-b justify-between h-[56px] fixed top-0 left-0 w-full z-50 bg-white">
      <div className="flex">
        {showSidePane && (
          <CustomImage
            className="h-[13px] sm:hidden pr-4 cursor-pointer"
            src={MenuIcon}
            alt="Menu"
            onClick={() => setShowSidePaneGrid(!showSidePaneGrid)}
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
