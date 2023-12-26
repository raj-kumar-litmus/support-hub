import { Column } from "primereact/column";
import { FC } from "react";
import CustomDialog from "./common/customdialog";
import CustomTable from "./common/customtable";
import {
  ORDER_DETAILS_LABELS,
  ORDER_STATUS_LIST,
} from "../constants/appConstants";
import { getTableHeaders } from "../utils/Utils";

type OrderStatusPopupProps = {
  openDialog: boolean;
  setOpenDialog: (a: boolean) => void;
};

const OrderStatusPopup: FC<OrderStatusPopupProps> = (props) => {
  return (
    <CustomDialog
      header={ORDER_DETAILS_LABELS.ORDER_STATUS}
      visible={props.openDialog}
      onHide={() => props.setOpenDialog(false)}
      className="custom-popup"
    >
      <CustomTable
        resizableColumns
        showGridlines
        stripedRows
        value={ORDER_STATUS_LIST}
        className="custom-table"
        children={getTableHeaders(ORDER_STATUS_LIST).map((h) => (
          <Column key={h} field={h} header={h}></Column>
        ))}
      />
    </CustomDialog>
  );
};

export default OrderStatusPopup;
