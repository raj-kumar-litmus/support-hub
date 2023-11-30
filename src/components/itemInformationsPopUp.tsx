import { FC } from "react";
import Card from "./common/Card";
import CustomDialog from "./common/customdialog";
import {
  CommerceItemData,
  ItemInformationsPopUpProps,
} from "../@types/pages/OrderDetails";
import { ITEMS_INFO } from "../constants/appConstants";

const ItemInformationsPopUp: FC<ItemInformationsPopUpProps> = (props) => {
  return (
    <CustomDialog
      header={ITEMS_INFO}
      visible={props.openItemInformationPopup}
      onHide={() => props.setItemInformationPopup(false)}
      draggable={false}
      resizable={false}
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
