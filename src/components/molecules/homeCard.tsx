import { FC } from "react";
import CustomCard from "../atoms/customcard";
import { HomeCardProps } from "../../@types/components/commonTypes";

const HomeCard: FC<HomeCardProps> = (props) => {
  return (
    <CustomCard
      title={props.title}
      className="home-card bg-black-200 text-gray-400"
    >
      <>{props.value}</>
    </CustomCard>
  );
};

export default HomeCard;
