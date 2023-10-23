import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import CustomDialog from "./common/customdialog";
import CustomTable from "./common/customtable";
import { ORDER_STATUS_LIST } from "../constants/appConstants";
import CustomButton from "./Button";

interface OrderStatus {
  code: number;
  description: string;
}

const OrderStatusPopup = () => {
  const HEADERS = [
    { field: "code", header: "Status Code" },
    { field: "description", header: "Description" },
  ];

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <CustomButton
        label="open order status"
        onClick={() => setOpenDialog(true)}
        isTextButton
        severity="secondary"
        className="popup-button"
      />
      <CustomDialog
        header="Order Status"
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
    </>
  );
};

export default OrderStatusPopup;
