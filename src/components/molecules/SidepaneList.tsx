import { FC } from "react";
import { useNavigate } from "react-router-dom";
import CustomImage from "../atoms/CustomImage";
import { IMenu, SidePaneListProps } from "../../@types/components/commonTypes";

const SidePaneList: FC<SidePaneListProps> = (props) => {
  const navigate = useNavigate();

  const navigateToMenu = (menu: IMenu) => {
    props.setSelectedMenu(menu.id);
    navigate(menu.path);
  };

  return (
    <div
      className={
        "fixed left-0 top-14 z-10 overflow-x-hidden hidden sm:block sm:w-25w md:w-[27vw] lg:w-21w shadow-slate-200 min-h-100vh-56 bg-black-200 px-2 md:px-6 pt-8 border-black-300 border-solid border-r border-t-2"
      }
    >
      {props.menuList.map((menu) => (
        <a
          key={menu.id}
          className={`flex pl-4 pr-2 py-4 items-center cursor-pointer h-11 mx-auto ${
            props.selectedMenu === menu.id
              ? "bg-black-300 rounded-lg"
              : "bg-transparent"
          }`}
          onClick={() => navigateToMenu(menu)}
        >
          <CustomImage
            src={menu.icon}
            className={`menu-sm-icon ${
              props.selectedMenu === menu.id ? "selected-menu" : ""
            }`}
            alt="menu.name"
          />
          <span
            className={`block pl-6  text-sm font-semibold ${
              props.selectedMenu === menu.id ? "text-gray-200" : "text-gray-300"
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
