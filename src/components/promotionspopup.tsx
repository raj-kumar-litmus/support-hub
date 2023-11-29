import { FC } from "react";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import { IPromotion } from "../@types/OrderDetails";
import { NO_DATA, PROMOTIONS } from "../constants/appConstants";

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
      header={PROMOTIONS}
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
        <div className="text-center">{NO_DATA}</div>
      )}
    </CustomDialog>
  );
};

export default PromotionsPopup;
