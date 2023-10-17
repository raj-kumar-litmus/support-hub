import { useEffect, useState } from "react";
import promotionsJSON from "../sampleJSON/promotions.json";
import { IPromotion } from "../@types/promotion";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import CustomButton from "./Button";
import { fetchData } from "../utils/fetchUtil";
import { URL_PROMOTIONS } from "../constants/apiConstants";

const PromotionsPopup = () => {
  const [promotions, setPromotions] = useState<Array<IPromotion>>([]);
  const [orderId, setOrderId] = useState<string>("60577546279");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getPromotions = async () => {
    const params = {
      orderId: orderId,
    };
    try {
      const data = await fetchData(URL_PROMOTIONS, params);
      // setPromotions(data || []);
      setPromotions(promotionsJSON);
    } catch (err) {
      console.error("Error while fetching data:", err);
    }
  };

  useEffect(() => {
    getPromotions();
  }, []);

  return (
    <div>
      <CustomButton
        label="Promotions"
        onClick={() => setOpenDialog(true)}
        isTextButton
        severity="secondary"
        className="popup-button"
      />
      <CustomDialog
        header="Promotions"
        visible={openDialog}
        onHide={() => setOpenDialog(false)}
        draggable={false}
        className="custom-popup  max-[400px]:w-full top-[200px] sm:top-[137px]"
      >
        {promotions.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))}
      </CustomDialog>
    </div>
  );
};

export default PromotionsPopup;
