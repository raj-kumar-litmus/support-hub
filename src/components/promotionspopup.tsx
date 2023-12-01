import { FC } from "react";
import { IPromotion } from "../@types/OrderDetails";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import { ORDER_DETAILS_LABELS } from "../constants/appConstants";

type Props = {
  promotions: IPromotion[];
  openPromotionsPopup: boolean;
  setOpenPromotionsPopup: (a: boolean) => void;
};

const PromotionsPopup: FC<Props> = ({
  promotions,
  openPromotionsPopup,
  setOpenPromotionsPopup,
}) => {
  return (
    <CustomDialog
      header={ORDER_DETAILS_LABELS.PROMOTIONS}
      visible={openPromotionsPopup}
      onHide={() => setOpenPromotionsPopup(false)}
      draggable={false}
      resizable={false}
      className="custom-popup"
    >
      {promotions.length > 0 ? (
        promotions.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))
      ) : (
          <div className="text-center">{ORDER_DETAILS_LABELS.NO_DATA}</div>
      )}
    </CustomDialog>
  );
};

export default PromotionsPopup;
