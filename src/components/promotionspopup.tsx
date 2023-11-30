import { FC } from "react";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import { IPromotion } from "../@types/pages/OrderDetails";
import { NO_DATA, PROMOTIONS } from "../constants/appConstants";

type PromotionsPopupProps = {
  promotions: IPromotion[];
  openPromotionsPopup: boolean;
  setOpenPromotionsPopup: (a: boolean) => void;
};

const PromotionsPopup: FC<PromotionsPopupProps> = (props) => {
  return (
    <CustomDialog
      header={PROMOTIONS}
      visible={props.openPromotionsPopup}
      onHide={() => props.setOpenPromotionsPopup(false)}
      draggable={false}
      resizable={false}
      className="custom-popup"
    >
      {props.promotions?.length > 0 ? (
        props.promotions?.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))
      ) : (
        <div className="text-center">{NO_DATA}</div>
      )}
    </CustomDialog>
  );
};

export default PromotionsPopup;
