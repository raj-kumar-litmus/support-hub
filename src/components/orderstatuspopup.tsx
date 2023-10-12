import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import CustomDialog from "./common/customdialog";
import CustomTable from "./common/customtable";
import { ORDER_STATUS_LIST } from "../constants/appConstants";
interface OrderStatus {
  code: number;
  description: string;
}

const OrderStatusPopup = () => {
  const HEADERS = [
    { field: "code", header: "Code" },
    { field: "description", header: "Description" },
  ];

  const [orderStatusList, setOrderStatusList] = useState<Array<OrderStatus>>(
    []
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    setOrderStatusList(ORDER_STATUS_LIST);
  }, []);

  return (
    <div>
      <Button
        label="open order status"
        onClick={() => setOpenDialog(true)}
        link
        severity="secondary"
      />
      <CustomDialog
        header="Order Status"
        visible={openDialog}
        onHide={() => setOpenDialog(false)}
        className="custom-popup"
      >
        <CustomTable
          resizableColumns
          showGridlines
          stripedRows
          value={orderStatusList}
          className="ordersTable w-[310px] sm:w-[390px]"
          children={HEADERS.map((h) => (
            <Column key={h.field} field={h.field} header={h.header}></Column>
          ))}
        />
      </CustomDialog>
    </div>
  );
};

export default OrderStatusPopup;