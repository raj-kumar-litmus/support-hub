import { FC, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SephoraLogo from "../../assets/logo.svg";
import MenuIcon from "../../assets/menu.svg";
import QuickLinksIcon from "../../assets/Quick Links.svg";
import SearchBar from "./searchbar";
import CustomImage from "./customimage";
import { MENU_LIST } from "../utils/Utils";
import QuickLinks from "../quicklinks";

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
  const [showQuickLinks, setShowQuickLinks] = useState<boolean>(false);

  const navigateToHome = () => {
    navigate(MENU_LIST[0].path);
  };

  const toggleShowSidePane = () => {
    setShowSidePaneGrid(!showSidePaneGrid);
    setOpenSearchField(false);
  };

  const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate(`/orderDetails/${searchValue}`);
    }
  };

  const toggleShowQuickLinks = () => {
    setShowQuickLinks(!showQuickLinks);
  }

  return (
    <div
      className={
        "py-0 pr-1 sm:px-10 flex items-center border-[#292E36] border-solid border-b justify-between h-[56px] absolute top-0 left-0 w-full z-50 bg-[#1C1C20] sm:bg-[#22262C]"
      }
    >
      <div
        className={`flex pl-4 ${
          showSidePaneGrid
          ? "w-[367px] bg-[#22262C] h-[56px] items-center border-[#30343B] border-solid border-b"
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
          className=" h-[10px] bottom-1 sm:h-auto relative sm:right-5 cursor-pointer"
          src={SephoraLogo}
          alt="SEPHORA"
          onClick={navigateToHome}
        />
      </div>
      <div className="sm:m-auto">
        <CustomImage
          src={QuickLinksIcon}
          onClick={toggleShowQuickLinks}
          className="cursor-pointer h-[24px] w-[24px] right-[4rem] top-[18px] sm:right-[2rem] absolute"
        />
        <SearchBar
          showSearchButton={!showSidePaneGrid}
          setOpenSearchField={setOpenSearchField}
          openSearchField={openSearchField}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={onSearch}
          placeholder="Search Order"
        />
      </div>
      {showQuickLinks &&
        <QuickLinks
        />
      }
    </div>
  );
};

export default Navbar;
