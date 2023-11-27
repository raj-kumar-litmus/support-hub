import { Card } from "primereact/card";
import { FC } from "react";
import CustomImage from "./customimage";
import { IMenu } from "../../@types/menu";

type Props = {
  menu: IMenu;
  selectedMenu: number;
  onClick: (a: IMenu) => void;
};

const MenuCard: FC<Props> = ({ menu, selectedMenu, onClick }) => {
  return (
    <Card
      className={`menu-card grid items-center rounded-xl h-[90px] w-[158px] m-2 cursor-pointer text-center bg-black-300 !shadow-none ${
        selectedMenu === menu.id ? "selected-menu" : ""
      }`}
      onClick={() => onClick(menu)}
    >
      <CustomImage className="menu-icon" src={menu.icon} alt="menu.name" />
      <span className="text-gray-300 text-sm ">{menu.name}</span>
    </Card>
  );
};

export default MenuCard;
