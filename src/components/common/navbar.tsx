import { FC, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickLinks from "../quicklinks";
import CustomImage from "./customimage";
import SearchBar from "./searchbar";
import QuickLinksIcon from "../../assets/Quick Links.svg";
import SephoraLogo from "../../assets/logo.svg";
import MenuIcon from "../../assets/menu.svg";
import { MENU_LIST } from "../utils/Utils";
import { NavbarProps } from "../../@types/components/commonTypes";

const Navbar: FC<NavbarProps> = (props) => {
  const navigate = useNavigate();
  const [showQuickLinks, setShowQuickLinks] = useState<boolean>(false);

  const navigateToHome = () => {
    navigate(MENU_LIST[0].path);
  };

  const toggleShowSidePane = () => {
    props.setShowSidePaneGrid(!props.showSidePaneGrid);
    props.setOpenSearchField(false);
  };

  const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && props.searchValue.length > 0) {
      event.preventDefault();
      navigate(`/orderDetails/${props.searchValue}`);
    }
  };

  return (
    <div
      className={
        "py-0 pr-1 sm:px-10 flex items-center border-black-300 border-solid border-b justify-between h-[56px] absolute top-0 left-0 w-full z-50 bg-black-200"
      }
    >
      <div
        className={`flex pl-4 ${
          props.showSidePaneGrid
            ? "w-[367px] bg-black-200 h-[56px] items-center border-black-400 border-solid border-b"
            : "w-auto"
        }`}
      >
        {props.showSidePane && (
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
      <div>
        {!props.showSidePaneGrid && (
          <CustomImage
            src={QuickLinksIcon}
            onClick={() => setShowQuickLinks(!showQuickLinks)}
            className="cursor-pointer h-[24px] w-[24px] right-[4rem] top-[1.1rem] sm:right-[2.5rem] absolute"
          />
        )}
        <div className="sm:mr-[3rem]">
          {" "}
          <SearchBar
            showSearchButton={!props.showSidePaneGrid}
            setOpenSearchField={props.setOpenSearchField}
            openSearchField={props.openSearchField}
            searchValue={props.searchValue}
            setSearchValue={props.setSearchValue}
            onSearch={onSearch}
            placeholder="Search Order"
          />
        </div>
      </div>
      {!props.showSidePaneGrid && showQuickLinks && (
        <QuickLinks
          showQuickLinks={showQuickLinks}
          setShowQuickLinks={setShowQuickLinks}
        />
      )}
    </div>
  );
};

export default Navbar;
