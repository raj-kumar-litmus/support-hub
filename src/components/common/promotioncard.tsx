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
      className="my-2 promotion-card w-[310px] sm:w-[390px] shadow-[0px_2px_6px_#00000033]"
      header={
        <div className="flex items-center px-4 pt-4 pb-2 border-solid border-b border-b-[#e7e7e7]">
          <CustomImage src={CheckCircle} alt="promotion" />
          <span className="text-neutral-500 text-sm pl-4 uppercase font-bold text-base">
            {promotion.claimableId}
          </span>
        </div>
      }
      children={
        <div className="flex p-0 justify-between">
          <InfoField title="Promotion" data={promotion.promotionId} />
          <InfoField
            title="Discount Amount"
            data={Number(promotion.discAmt).toFixed(2)}
          />
        </div>
      }
    />
  );
};

const InfoField = ({
  title,
  data,
}: {
  title: string;
  data: string | number;
}) => {
  return (
    <div className="block">
      <div className="text-sm font-bold text-[#757575]">{title}</div>
      <div className="text-sm text-right">{data}</div>
    </div>
  );
};

export default PromotionCard;
