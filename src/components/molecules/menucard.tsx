import { FC } from "react";
import CustomImage from "../atoms/customimage";
import CustomCard from "../atoms/customcard";
import { MenuCardProps } from "../../@types/components/commonTypes";

const MenuCard: FC<MenuCardProps> = (props) => {
  return (
    <CustomCard
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
    </CustomCard>
  );
};

export default MenuCard;
