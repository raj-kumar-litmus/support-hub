import { FC } from "react";
import CustomDialog from "../atoms/CustomDialog";
import PromotionCard from "../molecules/PromotionCard";
import { PromotionsPopupProps } from "../../@types/pages/orderDetails";
import { ORDER_DETAILS_LABELS } from "../../helpers/constants/appConstants";

const PromotionsPopup: FC<PromotionsPopupProps> = (props) => {
  return (
    <CustomDialog
      header={ORDER_DETAILS_LABELS.PROMOTIONS}
      visible={props.openPromotionsPopup}
      onHide={() => props.setOpenPromotionsPopup(false)}
      className="custom-popup"
    >
      {props.promotions?.length > 0 ? (
        props.promotions?.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))
      ) : (
        <div className="text-center">{ORDER_DETAILS_LABELS.NO_DATA}</div>
      )}
    </CustomDialog>
  );
};

export default PromotionsPopup;
