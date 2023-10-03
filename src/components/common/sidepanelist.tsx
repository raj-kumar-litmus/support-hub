import { FC } from 'react';
import { IMenu } from '../../@types/menu';

type Props = {
    menuList: Array<IMenu>;
    selectedMenu: number;
    setSelectedMenu: (a: number) => void;
};

const SidePaneList: FC<Props> = ({ menuList, selectedMenu, setSelectedMenu }) => {

    return (
        <div className='hidden sm:block w-80 border-slate-200 shadow-slate-200 border-solid border-r min-h-[calc(100vh-4.6rem)]  pt-2'>
                {menuList.map(menu =>
                    <div key={menu.id} className={`flex pl-10 pr-2 py-4 mx-4 ${(selectedMenu === menu.id) ? 'bg-gray-200 rounded-lg' : 'bg-transparent'}`} onClick={() => setSelectedMenu(menu.id)}>
                        <img src={menu.icon} alt="menu.name" />
                        <span className={`block pl-6 text-neutral-500 text-sm  cursor-pointer ${(selectedMenu === menu.id) ? 'font-semibold' : 'font-normal'}`}>
                        {menu.name}
                    </span>
                    </div>
                )
            }
        </div >
    );
};

export default SidePaneList;