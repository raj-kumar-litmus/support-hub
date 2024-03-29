import { FC, KeyboardEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import Navbar from "./Navbar";
import SearchField from "../atoms/SearchField";
import SidePaneGrid from "./SidepaneGrid";
import SidePaneList from "../molecules/SidepaneList";
import { MENU_LIST, ROUTES } from "../../helpers/utils/utils";
import { SCREEN_WIDTH } from "../../helpers/constants/appConstants";
import { AppContentProps } from "../../@types/components/commonTypes";

const AppContent: FC<AppContentProps> = (props) => {
  const [showSidePaneGrid, setShowSidePaneGrid] = useState<boolean>(false);
  const [openSearchField, setOpenSearchField] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const location = useLocation();
  const IS_FULLSCREEN = location?.pathname.includes(ROUTES.fullScreen);
  const IS_ORDER_DETAILS = location?.pathname.includes(ROUTES.orderDetails);
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
      navigate(`${ROUTES.orderDetails}/${searchValue}`);
    }
  };

  return (
    <div>
      <div className="h-screen overflow-y-hidden">
        {props.showNavbar && (
          <Navbar
            showSidePane={props.showSidePane}
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
            IS_FULLSCREEN || !props.showNavbar ? "" : "mt-14"
          } ml-0 bg-black-200`}
        >
          {props.showSidePane && (
            <SidePaneList
              menuList={MENU_LIST}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          )}
          {props.showSidePane && (
            <div
              className={`${
                showSidePaneGrid ? "bg-black-200  min-h-100vh-56" : ""
              } flex w-full sm:hidden`}
            >
              <SidePaneGrid
                menuList={MENU_LIST}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                showSidePaneGrid={showSidePaneGrid}
                setShowSidePaneGrid={setShowSidePaneGrid}
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
              ${IS_FULLSCREEN || !props.showNavbar ? "h-screen" : "h-100vh-56"} 
              w-full ${
                props.showSidePane ? "sm:ml-25w md:ml-[27vw] lg:ml-21w" : ""
              } overflow-y-auto ${
                props.padding ? props.padding : "p-5 sm:px-10"
              } ${props.bg ? props.bg : "bg-black-100"}
              ${width < SCREEN_WIDTH.SM && IS_ORDER_DETAILS ? "pt-0" : ""}
              `}
          >
            {props.appContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
