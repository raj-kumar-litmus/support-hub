import { FC, useEffect, useState } from "react";
import Navbar from "./common/navbar";
import SearchField from "./common/searchfield";
import SidePaneGrid from "./common/sidepanegrid";
import SidePaneList from "./common/sidepanelist";
import { MENU_LIST } from "./utils/Utils";
import { useLocation } from "react-router";

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

  useEffect(() => {
    setOpenSearchField(false);
    setSearchValue("");
  }, [location?.pathname]);

  useEffect(() => {
    if (location?.pathname.split("/")[1] !== "orderDetails") {
      const _selectedMenu = MENU_LIST.find(
        (menu) => location?.pathname.split("/")[1] == menu.path.split("/")[1]
      ).id;
      setSelectedMenu(_selectedMenu);
    }
  }, [location?.pathname]);

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
          />
        )}
        <div className={`flex flex-col sm:flex-row mt-[56px]`}>
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
                showSidePaneGrid ? `bg-[#1C1C20]  min-h-[calc(100vh-56px)]` : ""
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
                  />
                </div>
              )}
            </div>
          )}
          <div
            className={`w-full ${
              showSidePaneGrid ? "hidden" : "block"
            } sm:ml-[240px] md:ml-[308px]  h-[calc(100vh-56px)] overflow-y-auto`}
          >
            {appContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
