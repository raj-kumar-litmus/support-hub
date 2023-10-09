import { FC } from "react";
import MenuCard from "./menucard";
import { IMenu } from "../../@types/menu";

type Props = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
};

const SidePaneGrid: FC<Props> = ({
  menuList,
  selectedMenu,
  setSelectedMenu,
}) => {
  return (
    <div className="transition-all ease-in-out duration-100 max-w-[350px]  border-slate-200 shadow-slate-200 border-solid border-r min-h-[calc(100vh-2.6rem)] z-10 bg-white">
      <div className="flex flex-wrap p-1">
        {menuList.map((menu) => (
          <MenuCard
            menu={menu}
            key={menu.id}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default SidePaneGrid;
