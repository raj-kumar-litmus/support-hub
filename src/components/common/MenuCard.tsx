import { Card } from "primereact/card";
import { FC } from "react";
import CustomImage from "./CustomImage";
import { MenuCardProps } from "../../@types/components/CommonTypes";

const MenuCard: FC<MenuCardProps> = (props) => {
  return (
    <Card
      className={`menu-card grid items-center rounded-xl h-[90px] w-[158px] m-2 cursor-pointer text-center bg-black-300 !shadow-none ${
        props.selectedMenu === props.menu.id ? "selected-menu" : ""
      }`}
      onClick={() => props.onClick(props.menu)}
    >
      <CustomImage
        className="menu-icon"
        src={props.menu.icon}
        alt="menu.name"
      />
      <span className="text-gray-300 text-sm ">{props.menu.name}</span>
    </Card>
  );
};

export default MenuCard;
