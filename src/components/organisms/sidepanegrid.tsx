import { FC } from "react";
import { useNavigate } from "react-router-dom";
import MenuCard from "../molecules/menucard";
import { SidePaneGridProps, IMenu } from "../../@types/components/commonTypes";

const SidePaneGrid: FC<SidePaneGridProps> = (props) => {
  const navigate = useNavigate();

  const navigateToMenu = (menu: IMenu) => {
    props.setShowSidePaneGrid(false);
    props.setSelectedMenu(menu.id);
    navigate(menu.path);
  };

  return (
    <div
      className={`transition-all ease-in-out !duration-300 min-h-100vh-56 !w-[367px] ${
        props.showSidePaneGrid ? "left-0  right-full" : "-left-[367px] right-0"
      } drop-shadow absolute z-10 bg-black-200`}
    >
      <div className="flex flex-wrap p-1">
        {props.menuList.map((menu) => (
          <MenuCard
            menu={menu}
            key={menu.id}
            selectedMenu={props.selectedMenu}
            onClick={() => navigateToMenu(menu)}
          />
        ))}
      </div>
    </div>
  );
};

export default SidePaneGrid;
