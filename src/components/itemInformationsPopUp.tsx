import { FC } from "react";
import Card from "./common/Card";
import CustomDialog from "./common/customdialog";
import {
  CommerceItemData,
  ItemInformationsPopUpProps,
} from "../@types/pages/OrderDetails";
import { ORDER_DETAILS_LABELS } from "../constants/appConstants";

const ItemInformationsPopUp: FC<ItemInformationsPopUpProps> = (props) => {
  return (
    <CustomDialog
      header={ORDER_DETAILS_LABELS.ITEMS_INFO}
      visible={props.openItemInformationPopup}
      onHide={() => props.setItemInformationPopup(false)}
      className="custom-popup lineitem-popup"
    >
      {props.lineitems.length > 0 &&
        props.lineitems?.map((dataObj: CommerceItemData, index: number) => (
          <Card key={index} cardData={dataObj} type="ORDER_DETAILS_ITEM" />
        ))}
    </CustomDialog>
  );
};

export default ItemInformationsPopUp;
