import { FC } from "react";
import { IMenu } from "../../@types/menu";
import { Card } from "primereact/card";
import CustomImage from "./customimage";

type Props = {
  menu: IMenu,
  selectedMenu: number;
  onClick: (a: IMenu) => void;
}

const MenuCard: FC<Props> = ({ menu, selectedMenu, onClick }) => {

  return (
    <Card className={`block bg-gray-100 rounded-xl h-28 w-36 m-2 cursor-pointer text-center ${(selectedMenu === menu.id) ? 'font-semibold border-2' : 'font-normal'}`} onClick={() => onClick(menu)}>
      <CustomImage className="menu-icon" src={menu.icon} alt="menu.name" />
      <span className="text-neutral-500 text-sm ">
        {menu.name}
      </span>
    </Card>
  );
};

export default MenuCard;
