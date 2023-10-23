import React, { useState } from "react";
import { orderStatus } from "../@types/ordertimeline";
import { Dialog } from "primereact/dialog";
import Timeline from "./Common/orderTimeline";
interface OrderStatusProps {
  orderStatus: orderStatus;
}
const OrderStatus: React.FC<OrderStatusProps> = (orderstatus) => {
  const orderMap = orderstatus?.orderStatus?.orderMap;
  const [dialogVisible, setVisible] = useState(true);
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <Dialog
        header="Order Timeline"
        visible={dialogVisible}
        className="orderStatus-dialog bg-[#1C1C20] w-full top-[17%] h-[68%] sm:w-96 sm:h-[490px] sm:border sm:flex sm:top-0"
        onHide={() => setVisible(false)}
        draggable={false}
      >
        <div className="flex justify-center ml-2">
          <Timeline orderMap={orderMap} />
        </div>
      </Dialog>
    </div>
  );
};

export default OrderStatus;
