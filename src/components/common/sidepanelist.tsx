import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IMenu } from "../../@types/menu";
import CustomImage from "./customimage";

type Props = {
  menuList: Array<IMenu>;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
};

const SidePaneList: FC<Props> = ({
  menuList,
  selectedMenu,
  setSelectedMenu,
}) => {
  const navigate = useNavigate();

  const navigateToMenu = (menu: IMenu) => {
    setSelectedMenu(menu.id);
    navigate(menu.path);
  };

  return (
    <div className="fixed left-0 top-[56px] z-10 overflow-x-hidden hidden sm:block w-[308px] border-slate-200 shadow-slate-200 border-solid border-r min-h-[calc(100vh-56px)] pt-2 pt-8">
      {menuList.map((menu) => (
        <div
          key={menu.id}
          className={`flex pl-4 pr-2 py-4 items-center  cursor-pointer w-[259px] h-[44px] mx-auto ${
            selectedMenu === menu.id
              ? "bg-gray-200 rounded-lg"
              : "bg-transparent"
          }`}
          onClick={() => navigateToMenu(menu)}
        >
          <CustomImage
            src={menu.icon}
            className="menu-sm-icon"
            alt="menu.name"
          />
          <span
            className={`block pl-6 text-neutral-500 text-sm ${
              selectedMenu === menu.id ? "font-semibold" : "font-normal"
            }`}
          >
            {menu.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SidePaneList;
