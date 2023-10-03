import { FC } from "react";
import RightArrowIcon from "../../assets/right_arrow.svg";
import { InputText } from "primereact/inputtext";


type Props = {
    searchValue: string;
    setSearchValue: (a: string) => void;
};

const SearchField: FC<Props> = ({ searchValue, setSearchValue }) => {

    return (
        <div className="flex sm:hidden px-6 py-3 border-slate-200  border-solid	 border-b justify-between">
            <InputText type="text" name="q" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full focus:outline-none placeholder:text-stone-500 bg-transparent placeholder:font-helvetica placeholder:font-medium" placeholder="Search Order" />
            <button type="submit" className='-ml-8'>
                <img className="h-[13px] rotate-180" src={RightArrowIcon} alt="Search" />
            </button>
        </div>
    );
};

export default SearchField;