import { FC } from "react";
import { Card } from "primereact/card";

type Props = {
  title: string;
  icon: string;
};

interface HomeCardProps {
  title: FC<Props>;
  value: FC;
}

const HomeCard: FC<HomeCardProps> = ({ title, value }) => {
  return (
    <Card title={title} className="home-card bg-[#22262C] text-[#898A8D]">
      <>{value}</>
    </Card>
  );
};

export default HomeCard;
