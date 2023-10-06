import { FC } from 'react';
import MenuCard from './menucard';
import { IMenu } from '../../@types/menu';
import { useNavigate } from 'react-router-dom';

type Props = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
  showSidePaneGrid: boolean;
};

const SidePaneGrid: FC<Props> = ({ menuList, selectedMenu, setSelectedMenu, showSidePaneGrid }) => {
  const navigate = useNavigate();

  const navigateToMenu = (menu: IMenu) => {
    setSelectedMenu(menu.id);
    navigate(menu.path);
  }

  return (
    <div className={`transition-all ease-in-out duration-600 !shadow-[0_10px_10px_#606264] ${showSidePaneGrid ? '!w-11/12 visible min-w-[22rem] min-h-[calc(100vh-4rem)] ' : 'w-0 invisible'}  border-slate-200 border-solid border-r  z-10 bg-white`} >
      {showSidePaneGrid &&
      <div className='flex flex-wrap p-1'>
        {menuList.map(menu =>
          <MenuCard
            menu={menu}
            key={menu.id}
            selectedMenu={selectedMenu}
            onClick={() => navigateToMenu(menu)}
          />
        )
        }
      </div>
      }
    </div >
  );
};

export default SidePaneGrid;
