import { FC } from "react";
import { CommerceItemData } from "../@types/OrderDetails";
import Card from "./common/Card";
import CustomDialog from "./common/customdialog";
import { ITEMS_INFO } from "../constants/appConstants";

type Props = {
  lineitems: CommerceItemData[];
  openItemInformationPopup: boolean;
  setItemInformationPopup: (a: boolean) => void;
};

const ItemInformationsPopUp: FC<Props> = ({
  lineitems,
  openItemInformationPopup,
  setItemInformationPopup,
}) => {
  return (
    <CustomDialog
      header={ITEMS_INFO}
      visible={openItemInformationPopup}
      onHide={() => setItemInformationPopup(false)}
      draggable={false}
      resizable={false}
      className="custom-popup lineitem-popup"
    >
      {lineitems.length > 0 &&
        lineitems?.map((dataObj: CommerceItemData, index: number) => (
          <Card key={index} cardData={dataObj} type="ORDER_DETAILS_ITEM" />
        ))}
    </CustomDialog>
  );
};

export default ItemInformationsPopUp;
