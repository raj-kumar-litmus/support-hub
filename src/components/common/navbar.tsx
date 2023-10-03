import { FC, useState } from "react";
import SephoraLogo from "../../assets/logo.svg";
import MenuIcon from '../../assets/menu.svg';
import SearchBar from './searchbar';
import { Image } from 'primereact/image';

type Props = {
    showSidePaneGrid: boolean;
    setShowSidePaneGrid: (a: boolean) => void;
    openSearchField: boolean;
    setOpenSearchField: (a: boolean) => void;
};

const Navbar: FC<Props> = ({ showSidePaneGrid, setShowSidePaneGrid, openSearchField, setOpenSearchField }) => {

    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className='py-4 pl-4 pr-1 sm:px-10 flex items-center border-slate-200  border-solid	 border-b justify-between'>
            <div className='flex'>
                <Image className="h-[13px] sm:hidden pr-4 cursor-pointer" src={MenuIcon} alt="Menu" onClick={() => setShowSidePaneGrid(!showSidePaneGrid)} />
                <Image className="h-[13px] cursor-pointer" src={SephoraLogo} alt="SEPHORA" />
            </div>
            <div className='sm:m-auto'>
                <SearchBar showSearchButton={!showSidePaneGrid} setOpenSearchField={setOpenSearchField} openSearchField={openSearchField}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
        </div>
    );
};

export default Navbar;