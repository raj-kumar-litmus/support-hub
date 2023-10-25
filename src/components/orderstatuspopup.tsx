import { Column } from "primereact/column";
import { FC } from "react";
import { ORDER_STATUS, ORDER_STATUS_LIST } from "../constants/appConstants";
import CustomDialog from "./common/customdialog";
import CustomTable from "./common/customtable";

type Props = {
  openDialog: boolean;
  setOpenDialog: (a: boolean) => void;
};

const OrderStatusPopup: FC<Props> = ({ openDialog, setOpenDialog }) => {
  const HEADERS = [
    { field: "code", header: "Status Code" },
    { field: "description", header: "Description" },
  ];

  return (
    <CustomDialog
      header={ORDER_STATUS}
      visible={openDialog}
      onHide={() => setOpenDialog(false)}
      className="custom-popup absolute max-h-[calc(100vh-204px)] sm:max-h-[calc(100vh-141px)] max-[400px]:w-full top-[200px] sm:top-[137px]"
      draggable={false}
    >
      <CustomTable
        resizableColumns
        showGridlines
        stripedRows
        value={ORDER_STATUS_LIST}
        className="custom-table w-[310px] sm:w-[390px]"
        children={HEADERS.map((h) => (
          <Column key={h.field} field={h.field} header={h.header}></Column>
        ))}
      />
    </CustomDialog>
  );
};

export default OrderStatusPopup;
