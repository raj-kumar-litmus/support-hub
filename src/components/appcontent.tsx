import { FC, useState } from "react";
import Navbar from "./common/navbar";
import SearchField from "./common/searchfield";
import SidePaneGrid from "./common/sidepanegrid";
import SidePaneList from "./common/sidepanelist";
import { MENU_LIST } from "./utils/Utils";

type Props = {
  showSidePane: boolean;
  showNavbar: boolean;
  appContent: FC;
};

const AppContent: FC<Props> = ({ showSidePane, showNavbar, appContent }) => {
  const [showSidePaneGrid, setShowSidePaneGrid] = useState<boolean>(false);
  const [openSearchField, setOpenSearchField] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  return (
    <div>
      <div className='h-screen'>
        {showNavbar &&
          <Navbar
          showSidePane={showSidePane}
            showSidePaneGrid={showSidePaneGrid}
            setShowSidePaneGrid={setShowSidePaneGrid}
            openSearchField={openSearchField}
            setOpenSearchField={setOpenSearchField}
          />
        }
        <div className='flex'>
          {showSidePane &&
            <SidePaneList
              menuList={MENU_LIST}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          }
          {showSidePane &&
            <div className={`transition-all ease-in-out duration-600 ${showSidePaneGrid ? `bg-zinc-400` : ''} flex w-full sm:hidden`} onClick={() => setShowSidePaneGrid(false)}>
              <SidePaneGrid
                menuList={MENU_LIST}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                showSidePaneGrid={showSidePaneGrid}
              />
              <div className='block w-full'>
                {!showSidePaneGrid && openSearchField &&
                  <SearchField searchValue={searchValue} setSearchValue={setSearchValue}
                  />
                }
              </div>
            </div>
          }
          <div className={`w-full ${showSidePaneGrid ? 'hidden' : 'block'}`}>
            {appContent}
          </div>
        </div>

      </div >
    </div>
  );
};

export default AppContent;
