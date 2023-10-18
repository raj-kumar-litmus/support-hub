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

  const [DialogvisibleDesktop, setVisibleDesktop] = useState(false);
  const [DialogVisibleMobile, setVisibleMobile] = useState(false);

  return (
    <>
      <div className="block w-screen sm:hidden font-helvetica ">
        <>
          <Button
            label="Show"
            icon="pi pi-external-link"
            onClick={() => setVisibleMobile(true)}
          />
          <Dialog
            header="Order Timeline"
            visible={DialogVisibleMobile}
            className="orderStatus-dialog w-full top-[14%] h-[73%] "
            onHide={() => setVisibleMobile(false)}
            draggable={false}
          >
            <div className="flex justify-center ml-2">
              <Timeline orderMap={orderMap} />
            </div>
          </Dialog>
        </>
      </div>

      <div className="hidden sm:block   font-helvetica">
        <Button
          label="Show"
          icon="pi pi-external-link"
          onClick={() => setVisibleDesktop(true)}
        />
        <Dialog
          header="Order Timeline"
          visible={DialogvisibleDesktop}
          className="orderStatus-dialog w-96 h-[522px] border rounded-lg"
          onHide={() => setVisibleDesktop(false)}
          draggable={false}
        >
          <Timeline orderMap={orderMap} />
        </Dialog>
      </div>
    </>
  );
};

export default OrderStatus;
