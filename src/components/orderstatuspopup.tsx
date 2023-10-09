import { useState, useEffect } from 'react';
import CustomDialog from "./common/customdialog";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

const OrderStatusPopup = () => {
  const statusList = [
    {
      code: 1111,
      description: "Created"
    },
    {
      code: 1500,
      description: "Scheduled"
    },
    {
      code: 3200,
      description: "Released"
    },
    {
      code: 3350,
      description: "Included in shipments"
    },
    {
      code: 9000,
      description: "Shipped"
    },
    {
      code: 3700,
      description: "Cancelled"
    },
    {
      code: 3700.500,
      description: "Shipped and invoiced"
    }
  ]
  const [orderStatusList, setOrderStatusList] = useState<Array<any>>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    setOrderStatusList(statusList);
  }, []);

  return (
    <div>
      <Button label="open" onClick={() => setOpenDialog(true)} />
      <CustomDialog header="Order Status" visible={openDialog} onHide={() => setOpenDialog(false)}>
        <DataTable value={orderStatusList}>
          <Column field="code" header="Code"></Column>
          <Column field="description" header="Description"></Column>
          {orderStatusList.map((col) => (
            <Column key={col.code} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </CustomDialog>
    </div>
  );
};

export default OrderStatusPopup;