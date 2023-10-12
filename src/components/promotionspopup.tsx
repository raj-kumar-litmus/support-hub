import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import promotionsJSON from "../sampleJSON/promotions.json";
import { IPromotion } from "../@types/promotion";
import CustomDialog from "./common/customdialog";
import PromotionCard from "./common/promotioncard";
import CustomButton from "./Button";

const PromotionsPopup = () => {
  const [promotions, setPromotions] = useState<Array<IPromotion>>([]);
  const [orderId, setOrderId] = useState<string>("60577546279");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const getPromotions = async () => {
    // const params = {
    //   orderId: orderId,
    // };
    // const data = await fetchData(URL_PROMOTIONS, params);
    // setPromotions(data || []);
    setPromotions(promotionsJSON);
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
        className="custom-popup"
      >
        {promotions.map((p) => (
          <PromotionCard key={p.promotionId} promotion={p} />
        ))}
      </CustomDialog>
    </div>
  );
};

export default PromotionsPopup;
