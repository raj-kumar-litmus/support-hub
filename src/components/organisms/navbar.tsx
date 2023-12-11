import { FC, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickLinks from "../molecules/quicklinks";
import CustomImage from "../atoms/customimage";
import SearchBar from "../molecules/searchbar";
import QuickLinksIcon from "../../assets/Quick Links.svg";
import SephoraLogo from "../../assets/logo.svg";
import MenuIcon from "../../assets/menu.svg";
import { NavbarProps } from "../../@types/components/commonTypes";
import { MENU_LIST, ROUTES } from "../../utils/Utils";

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
      navigate(`${ROUTES.orderDetails}/${props.searchValue}`);
    }
  };

  return (
    <div
      className={
        "py-0 pr-1 sm:px-10 flex items-center border-black-300 border-solid border-b justify-between h-14 absolute top-0 left-0 w-full z-50 bg-black-200"
      }
    >
      <div
        className={`flex pl-4 ${
          props.showSidePaneGrid
            ? "w-[367px] bg-black-200 h-14 items-center border-black-400 border-solid border-b"
            : "w-auto"
        }`}
      >
        {props.showSidePane && (
          <CustomImage
            className="h-13 sm:hidden pr-4 cursor-pointer"
            src={MenuIcon}
            alt="Menu"
            onClick={toggleShowSidePane}
          />
        )}
        <CustomImage
          className=" h-2.5 sm:h-auto bottom-2.5 sm:bottom-0 relative sm:right-5 cursor-pointer"
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
            className="cursor-pointer h-6 w-6 right-16 top-[1.1rem] sm:right-10 absolute"
          />
        )}
        <div className="sm:mr-12">
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
