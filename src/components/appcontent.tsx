import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import Navbar from "./common/navbar";
import SearchField from "./common/searchfield";
import SidePaneGrid from "./common/sidepanegrid";
import SidePaneList from "./common/sidepanelist";
import { MENU_LIST } from "./utils/Utils";
import { SCREEN_WIDTH } from "../constants/appConstants";

type Props = {
  showSidePane: boolean;
  showNavbar: boolean;
  appContent: any;
};

const AppContent: FC<Props> = ({ showSidePane, showNavbar, appContent }) => {
  const [showSidePaneGrid, setShowSidePaneGrid] = useState<boolean>(false);
  const [openSearchField, setOpenSearchField] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const location = useLocation();
  const IS_FULLSCREEN = location?.pathname.includes("fullscreen");
  const IS_ORDER_DETAILS = location?.pathname.includes("orderDetails");
  const navigate = useNavigate();
  const { width } = useScreenSize();

  useEffect(() => {
    setOpenSearchField(false);
    setSearchValue("");
  }, [location?.pathname]);

  useEffect(() => {
    const _selectedMenu = MENU_LIST.find(
      (menu) => location?.pathname.split("/")[1] == menu.path.split("/")[1],
    )?.id;
    setSelectedMenu(_selectedMenu);
  }, [location?.pathname]);

  const searchOrder = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.length > 0) {
      e.preventDefault();
      navigate(`/orderDetails/${searchValue}`);
    }
  };

  return (
    <div>
      <div className="h-screen overflow-y-hidden">
        {showNavbar && (
          <Navbar
            showSidePane={showSidePane}
            showSidePaneGrid={showSidePaneGrid}
            setShowSidePaneGrid={setShowSidePaneGrid}
            openSearchField={openSearchField}
            setOpenSearchField={setOpenSearchField}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
        <div
          className={`flex flex-col sm:flex-row ${
            IS_FULLSCREEN ? "" : "mt-[3.5rem]"
          } ml-[0] bg-black-200`}
        >
          {showSidePane && (
            <SidePaneList
              menuList={MENU_LIST}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          )}
          {showSidePane && (
            <div
              className={`${
                showSidePaneGrid ? "bg-black-200  min-h-[calc(100vh-56px)]" : ""
              } flex w-full sm:hidden`}
              onClick={() => setShowSidePaneGrid(false)}
            >
              <SidePaneGrid
                menuList={MENU_LIST}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                showSidePaneGrid={showSidePaneGrid}
              />
              {openSearchField && (
                <div
                  className={`w-full ${showSidePaneGrid ? "hidden" : "block"}`}
                >
                  <SearchField
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onSearch={searchOrder}
                  />
                </div>
              )}
            </div>
          )}
          <div
            className={`${showSidePaneGrid ? "hidden" : "block"} 
              ${IS_FULLSCREEN ? "h-[100vh]" : "h-[calc(100vh-56px)]"} 
              w-full sm:ml-[25vw] md:ml-[27vw] lg:ml-[21vw] overflow-y-auto p-[20px] sm:px-[2.5rem] bg-black-100
              ${width < SCREEN_WIDTH.SM && IS_ORDER_DETAILS ? "pt-0" : ""}
              `}
          >
            {appContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
