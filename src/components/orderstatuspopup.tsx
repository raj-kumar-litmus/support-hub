import { Column } from "primereact/column";
import { FC } from "react";
import { ORDER_STATUS, ORDER_STATUS_LIST } from "../constants/appConstants";
import CustomDialog from "./common/customdialog";
import CustomTable from "./common/customtable";
import { getTableHeaders } from "./utils/Utils";

type Props = {
  openDialog: boolean;
  setOpenDialog: (a: boolean) => void;
};

const OrderStatusPopup: FC<Props> = ({ openDialog, setOpenDialog }) => {

  return (
    <CustomDialog
      header={ORDER_STATUS}
      visible={openDialog}
      onHide={() => setOpenDialog(false)}
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
