import React, { useState } from "react";
import { orderStatus } from "../@types/ordertimeline";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Timeline from "./Common/orderTimeline";

interface OrderStatusProps {
  orderStatus: orderStatus;
}

const OrderStatus: React.FC<OrderStatusProps> = (orderstatus) => {
  const orderMap = orderstatus?.orderStatus?.orderMap;

  const [DialogVisible, setVisible] = useState(false);

  return (
    <>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <div className="block w-screen font-helvetica sm:rounded-lg">
        <>
          <Dialog
            header="Order Timeline"
            visible={DialogVisible}
            className="orderStatus-dialog bg-[#1C1C20] w-full top-[14%] h-[73%] sm:w-96 sm:h-[522px] sm:border sm:flex sm:top-0"
            onHide={() => setVisible(false)}
            draggable={false}
          >
            <div className="flex justify-center ml-2">
              <Timeline orderMap={orderMap} />
            </div>
          </Dialog>
        </>
      </div>
    </>
  );
};

export default OrderStatus;
