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
    <div
      className={
        "fixed left-0 top-[56px] z-10 overflow-x-hidden hidden sm:block sm:w-[25vw] md:w-[27vw] lg:w-[21vw] shadow-slate-200 min-h-[calc(100vh-56px)] bg-black-200 px-2 md:px-6 pt-8 border-black-300 border-solid border-r border-t-2"
      }
    >
      {menuList.map((menu) => (
        <a
          key={menu.id}
          className={`flex pl-4 pr-2 py-4 items-center  cursor-pointer h-[44px] mx-auto ${
            selectedMenu === menu.id
              ? "bg-black-300 rounded-lg"
              : "bg-transparent"
          }`}
          onClick={() => navigateToMenu(menu)}
        >
          <CustomImage
            src={menu.icon}
            className={`menu-sm-icon ${
              selectedMenu === menu.id ? "selected-menu" : ""
            }`}
            alt="menu.name"
          />
          <span
            className={`block pl-6  text-sm font-normal  ${
              selectedMenu === menu.id ? "text-gray-200" : "text-gray-300"
            }`}
          >
            {menu.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SidePaneList;
