import { FC } from "react";
import MenuCard from "./menucard";
import { IMenu } from "../../@types/menu";
import { useNavigate } from "react-router-dom";

type Props = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
  showSidePaneGrid: boolean;
};

const SidePaneGrid: FC<Props> = ({
  menuList,
  selectedMenu,
  setSelectedMenu,
  showSidePaneGrid,
}) => {
  const navigate = useNavigate();

  const navigateToMenu = (menu: IMenu) => {
    setSelectedMenu(menu.id);
    navigate(menu.path);
  };

  return (
    <div
      className={`transition-all ease-in-out !duration-300 min-h-100vh-56 !w-[367px] ${
        showSidePaneGrid ? "left-0  right-full" : "-left-[367px] right-0"
      } drop-shadow absolute z-10 bg-black-200`}
    >
      <div className="flex flex-wrap p-1">
        {menuList.map((menu) => (
          <MenuCard
            menu={menu}
            key={menu.id}
            selectedMenu={selectedMenu}
            onClick={() => navigateToMenu(menu)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidePaneGrid;
