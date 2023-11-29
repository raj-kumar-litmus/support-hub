import { FC } from "react";
import CustomImage from "./customimage";
import { IPromotion } from "../../@types/promotion";
import CheckCircle from "../../assets/check_circle.svg";
import CustomCard from "./customcard";

type Props = {
  promotion: IPromotion;
};

const PromotionCard: FC<Props> = ({ promotion }) => {
  return (
    <CustomCard
      className="my-2 promotion-card text-gray-300 bg-black-300 shadow-[0px_2px_6px_#00000033] rounded-lg"
      header={
        <div className="flex items-center px-4 pt-4 pb-2 border-solid border-b border-b-black-400">
          <CustomImage src={CheckCircle} alt="promotion" />
          <span
            className="text-gray-300 text-sm leading-17 pl-4 uppercase font-medium whitespace-nowrap text-ellipsis overflow-hidden w-60 sm:w-80"
            title={promotion.claimableId}
          >
            {promotion.claimableId}
          </span>
        </div>
      }
    >
      <div className="flex p-0 justify-between">
        <InfoField title="Promotion" data={promotion.promotionId} />
        <InfoField
          title="Discount Amount"
          data={Number(promotion.discAmt).toFixed(2)}
          className="text-right"
        />
      </div>
    </CustomCard>
  );
};

const InfoField = ({
  title,
  data,
  className,
}: {
  title: string;
  data: string | number;
  className?: string;
}) => {
  return (
    <div className="block text-xs font-normal max-w-[10rem] min-w-[7rem]">
      <div className={`text-gray-400 ${className}`}>{title}</div>
      <div
        className={`text-gray-300 whitespace-nowrap text-ellipsis overflow-hidden ${className}`}
        title={data.toString()}
      >
        {data}
      </div>
    </div>
  );
};

export default PromotionCard;
