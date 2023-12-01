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
    if (event.key === "Enter" && searchValue.length > 0) {
      event.preventDefault();
      navigate(`/orderDetails/${searchValue}`);
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
          showSidePaneGrid
            ? "w-[367px] bg-black-200 h-[56px] items-center border-black-400 border-solid border-b"
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
      <div>
        {!showSidePaneGrid && (
          <CustomImage
            src={QuickLinksIcon}
            onClick={() => setShowQuickLinks(!showQuickLinks)}
            className="cursor-pointer h-[24px] w-[24px] right-[4rem] top-[1.1rem] sm:right-[2.5rem] absolute"
          />
        )}
        <div className="sm:mr-[3rem]">
          {" "}
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
      </div>
      {!showSidePaneGrid && showQuickLinks && <QuickLinks showQuickLinks={showQuickLinks} setShowQuickLinks={setShowQuickLinks} />}
    </div>
  );
};

export default Navbar;
