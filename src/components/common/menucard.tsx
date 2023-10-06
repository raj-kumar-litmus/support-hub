import { FC } from "react";
import { IMenu } from "../../@types/menu";
import { Card } from "primereact/card";
import CustomImage from "./customimage";
import { useNavigate } from "react-router-dom";

type Props = {
  menu: IMenu;
  selectedMenu: number;
  setSelectedMenu: (a: number) => void;
};

const MenuCard: FC<Props> = ({ menu, selectedMenu, setSelectedMenu }) => {
  const navigate = useNavigate();

  const onClickMenu = () => {
    setSelectedMenu(menu.id);
    navigate(menu.path);
  };

  return (
    <Card
      className={`block bg-gray-100  p-4 rounded-xl h-24 w-36 m-3 cursor-pointer ${
        selectedMenu === menu.id ? "font-semibold border-2" : "font-normal"
      }`}
      onClick={() => onClickMenu()}
    >
      <CustomImage className="menu-icon" src={menu.icon} alt="menu.name" />
      <span className="block pt-3 text-neutral-500 text-sm text-center">
        {menu.name}
      </span>
    </Card>
  );
};

export default MenuCard;
