import { Card } from "primereact/card";
import { FC } from "react";
import { HomeCardProps } from "../../@types/components/commonTypes";

const HomeCard: FC<HomeCardProps> = (props) => {
  return (
    <Card title={props.title} className="home-card bg-black-200 text-gray-400">
      <>{props.value}</>
    </Card>
  );
};

export default HomeCard;
