import { FC } from "react";
import { IPromotion } from "../@types/promotion";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import { PROMOTIONS } from "../constants/appConstants";

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
      className="absolute custom-popup max-h-[calc(100vh-204px)] sm:max-h-[calc(100vh-141px)]  max-[400px]:w-full top-[200px] sm:top-[137px]"
    >
      {promotions.length > 0 ? (
        promotions.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))
      ) : (
        <div className="text-center">No Data</div>
      )}
    </CustomDialog>
  );
};

export default PromotionsPopup;
