import { FC } from "react";
import { Card } from "primereact/card";
// import CustomImage from "./customimage";

type Props = {
  title: string;
  icon: string;
};

interface HomeCardProps {
  title: FC<Props>;
  value: FC;
  // icon: string;
  bgColor: string;
  textColor: string;
}

const HomeCard: FC<HomeCardProps> = ({
  title,
  value,
  // icon,
  bgColor,
  textColor,
}) => {
  return (
    <Card title={title} className={`bg-[${bgColor}] text-[${textColor}] `}>
      <div className="flex justify-between">
        <>{value}</>
        {/* <CustomImage src={icon} /> */}
      </div>
    </Card>
  );
};

export default HomeCard;
