import { FC, useState } from 'react';
import DashboardIcon from '../assets/dashboard.svg';
import DataUsageIcon from '../assets/data_usage.svg';
import DCOpenOrdersIcon from '../assets/dc_open_orders.svg';
import LeaderboardIcon from '../assets/leaderboard.svg';
import LegendToggleIcon from '../assets/legend_toggle.svg';
import Navbar from './common/navbar';
import SearchField from './common/searchfield';
import SidePaneGrid from './common/sidepanegrid';
import SidePaneList from './common/sidepanelist';

const MENU_LIST = [
    { id: 1, name: "Home", icon: DashboardIcon },
    { id: 2, name: "OPM", icon: LeaderboardIcon },
    { id: 3, name: "OPM Comparison", icon: DataUsageIcon },
    { id: 4, name: "Session", icon: LegendToggleIcon },
    { id: 5, name: "DC Open Orders", icon: DCOpenOrdersIcon }
]

type Props = {
    showSidePane: boolean;
    showNavbar: boolean;
    appContent: any;
};

const AppContent: FC<Props> = ({ showSidePane, showNavbar, appContent }) => {
    const [showSidePaneGrid, setShowSidePaneGrid] = useState<boolean>(false);
    const [openSearchField, setOpenSearchField] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedMenu, setSelectedMenu] = useState<number>(0);

    return (
        <div>
            <div className='h-screen'>
                {showNavbar &&
                    <Navbar
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
                        <div className={`${showSidePaneGrid ? `bg-zinc-400` : ''} flex w-full block sm:hidden`} onClick={() => setShowSidePaneGrid(false)}>
                            {showSidePaneGrid &&
                                <div>
                                    <SidePaneGrid
                                        menuList={MENU_LIST}
                                        selectedMenu={selectedMenu}
                                        setSelectedMenu={setSelectedMenu}
                                    />
                                </div>}
                            <div className='block w-full'>
                                {openSearchField &&
                                    <SearchField searchValue={searchValue} setSearchValue={setSearchValue}
                                    />
                                }
                                {appContent}
                            </div>
                        </div>
                    }

                    <div className='hidden sm:block'>
                        {appContent}
                    </div>
                </div>

            </div >
        </div>
    );
};

export default AppContent;