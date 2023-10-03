import { FC } from 'react';
import SearchIcon from "../../assets/search.svg";
import { Image } from 'primereact/image';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

type Props = {
    showSearchButton: boolean;
    openSearchField: boolean;
    setOpenSearchField: (a: boolean) => void;
    searchValue: string;
    setSearchValue: (a: string) => void;
};

const SearchBar: FC<Props> = ({ showSearchButton, setOpenSearchField, openSearchField, searchValue, setSearchValue }) => {

    return (
        <div className="block">
            <InputText type="text" name="q" className="w-full min-w-[400px] h-10 bg-gray-100  p-4 rounded-full hidden sm:block focus:outline-none placeholder:text-stone-500 placeholder:font-helvetica placeholder:font-medium" placeholder="Search Order #" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            {showSearchButton &&
                <Button type="submit" className='-ml-8 sm:hidden' onClick={() => setOpenSearchField(!openSearchField)}>
                    <Image className="h-[13px]" src={SearchIcon} alt="Search" />
                </Button>
            }
        </div>
    );
};

export default SearchBar;