import { FC } from "react";
import CustomCard from "./CustomCard";
import CustomImage from "./CustomImage";
import CheckCircle from "../../assets/check_circle.svg";
import {
  PromotionCardProps,
  InfoFieldProps,
} from "../../@types/pages/OrderDetails";
import { ORDER_DETAILS_LABELS } from "../../constants/AppConstants";

const PromotionCard: FC<PromotionCardProps> = (props) => {
  return (
    <CustomCard
      className="my-2 promotion-card text-gray-300 bg-black-300 shadow-[0px_2px_6px_#00000033] rounded-lg"
      header={
        <div className="flex items-center px-4 pt-4 pb-2 border-solid border-b border-b-black-400">
          <CustomImage src={CheckCircle} alt="promotion" />
          <span
            className="text-gray-300 text-sm leading-17 pl-4 uppercase font-medium whitespace-nowrap text-ellipsis overflow-hidden w-60 sm:w-80"
            title={props.promotion.claimableId}
          >
            {props.promotion.claimableId}
          </span>
        </div>
      }
    >
      <div className="flex p-0 justify-between">
        <InfoField
          title={ORDER_DETAILS_LABELS.PROMOTION}
          data={props.promotion.promotionId}
        />
        <InfoField
          title={ORDER_DETAILS_LABELS.DISCOUNT_AMOUNT}
          data={Number(props.promotion.discAmt).toFixed(2)}
          className="text-right"
        />
      </div>
    </CustomCard>
  );
};

const InfoField = (props: InfoFieldProps) => {
  return (
    <div className="block text-xs font-normal max-w-[10rem] min-w-[7rem]">
      <div className={`text-gray-400 ${props.className}`}>{props.title}</div>
      <div
        className={`text-gray-300 whitespace-nowrap text-ellipsis overflow-hidden ${props.className}`}
        title={props.data.toString()}
      >
        {props.data}
      </div>
    </div>
  );
};

export default PromotionCard;
