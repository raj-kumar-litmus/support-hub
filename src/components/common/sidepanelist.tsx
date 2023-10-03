import { FC } from 'react';
import { IMenu } from '../../@types/menu';

type Props = {
    menuList: Array<IMenu>;
    selectedMenu: number;
    setSelectedMenu: (a: number) => void;
};

const SidePaneList: FC<Props> = ({ menuList, selectedMenu, setSelectedMenu }) => {

    return (
        <div className='hidden sm:block w-80 border-slate-200 shadow-slate-200 border-solid border-r min-h-[calc(100vh-4.6rem)]'>
            <div>
                {menuList.map(menu =>
                    <span key={menu.id} className={`block py-4 pl-10 pr-2 text-neutral-500 text-sm  cursor-pointer ${(selectedMenu === menu.id) ? 'font-semibold' : 'font-normal'}`} onClick={() => setSelectedMenu(menu.id)}>
                        {menu.name}
                    </span>
                )
                }
            </div>
        </div >
    );
};

export default SidePaneList;