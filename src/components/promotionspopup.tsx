import { FC } from "react";
import CustomDialog from "./atoms/customdialog";
import PromotionCard from "./common/promotioncard";
import { PromotionsPopupProps } from "../@types/pages/OrderDetails";
import { ORDER_DETAILS_LABELS } from "../constants/appConstants";

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
