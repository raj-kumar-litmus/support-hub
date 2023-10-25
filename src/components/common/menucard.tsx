import { FC } from "react";
import { IMenu } from "../../@types/menu";
import { Card } from "primereact/card";
import CustomImage from "./customimage";

type Props = {
  menu: IMenu;
  selectedMenu: number;
  onClick: (a: IMenu) => void;
};

const MenuCard: FC<Props> = ({ menu, selectedMenu, onClick }) => {
  return (
    <Card
      className={`menu-card grid items-center rounded-xl h-[90px] w-[158px] m-2 cursor-pointer text-center border-solid border-[#30343B] border-2	${
        selectedMenu === menu.id ? "selected-menu bg-[#30343B]" : "bg-[#26262B]"
      }`}
      onClick={() => onClick(menu)}
    >
      <CustomImage className="menu-icon" src={menu.icon} alt="menu.name" />
      <span className="text-[#FAF9F6] text-sm ">{menu.name}</span>
    </Card>
  );
};

export default MenuCard;
