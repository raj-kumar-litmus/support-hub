import { FC } from "react";
import CustomCard from "../atoms/customcard";
import { OrderSummaryCardProps } from "../../@types/components/commonTypes";

const OrderSummaryCard: FC<OrderSummaryCardProps> = (props) => {
  return (
    <CustomCard className="summary-card my-1 text-gray-200 bg-black-200 w-full rounded-lg">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(91px,1fr))] gap-2">
        {Object.entries(props.cardData)?.map(
          (
            [key, value]: [string, Array<string | number> | string | number],
            i
          ) => (
            <div key={i}>
              <div className="text-gray-400 text-10 min-h-[1.8rem]">{key}</div>
              <div
                className="text-gray-300 text-base font-medium"
                title={value?.toString()}
              >
                {value.length > 1 ? value[0] + " " + value[1] : value}
              </div>
            </div>
          )
        )}
      </div>
    </CustomCard>
  );
};

export default OrderSummaryCard;
