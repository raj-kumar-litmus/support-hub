import { FC } from "react";
import { Card } from "primereact/card";

type Props = {
  title: string;
  icon: string;
};

interface HomeCardProps {
  title: FC<Props>;
  value: FC;
  bgColor: string;
  textColor: string;
}

const HomeCard: FC<HomeCardProps> = ({
  title,
  value,
  bgColor,
  textColor,
}) => {
  return (
    <Card title={title} className="bg-[#30343B] text-[#898A8D]">
      <div className="flex justify-between">
        <>{value}</>
      </div>
    </Card>
  );
};

export default HomeCard;
