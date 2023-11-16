import React, { FC, useState } from "react";
import { OmsOrderFlow } from "../@types/OrderDetails";
import { Dialog } from "primereact/dialog";
import Timeline from "./common/orderTimeline";
interface OrderStatusProps {
  orderStatus: OmsOrderFlow;
  isOrderStatusVisible:boolean;
  setIsOrderStatusVisible: (a: boolean) => void;
}
const OrderStatus: React.FC<OrderStatusProps> = ({orderStatus,isOrderStatusVisible,setIsOrderStatusVisible}) => {
  const orderMap = orderStatus?.orderMap;
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <Dialog
        header="Order Timeline"
        visible={isOrderStatusVisible}
        className="orderStatus-dialog bg-[#22262C] flex "
        onHide={() =>{setIsOrderStatusVisible(false)}}
        draggable={false}
        resizable={false}
      >
        <div className="flex justify-center ml-2">
          <Timeline orderMap={orderMap} />
        </div>
      </Dialog>
    </div>
  );
};

export default OrderStatus;
