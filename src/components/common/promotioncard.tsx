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
      className="my-2 promotion-card w-[310px] sm:w-[390px] text-white bg-[#30343B] shadow-[0px_2px_6px_#00000033] rounded-lg"
      header={
        <div className="flex items-center px-4 pt-4 pb-2 border-solid border-b border-b-[#383F47]">
          <CustomImage src={CheckCircle} alt="promotion" />
          <span
            className="text-[#faf9f6] text-sm pl-4 uppercase font-bold text-base whitespace-nowrap text-ellipsis overflow-hidden w-[15rem] sm:w-[20rem]"
            title={promotion.claimableId}
          >
            {promotion.claimableId}
          </span>
        </div>
      }
    >
      <div className="flex p-0 justify-between">
        <InfoField
          title="Promotion"
          data={promotion.promotionId}
          className=""
        />
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
  className: string;
}) => {
  return (
    <div className="block text-sm font-normal min-w-[7rem]">
      <div className={`text-[#898A8D] ${className}`}>{title}</div>
      <div
        className={`text-[#faf9f6] whitespace-nowrap text-ellipsis overflow-hidden ${className}`}
        title={data.toString()}
      >
        {data}
      </div>
    </div>
  );
};

export default PromotionCard;
