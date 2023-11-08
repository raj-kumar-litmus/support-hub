import React, { FC, useState } from "react";
import { orderStatus } from "../@types/ordertimeline";
import Timeline from "./common/orderTimeline";
import CustomDialog from "./common/customdialog";
interface OrderStatusProps {
  orderStatus: orderStatus;
  isOrderStatusVisible:boolean;
  setIsOrderStatusVisible: (a: boolean) => void;
}
const OrderStatus: React.FC<OrderStatusProps> = ({orderStatus,isOrderStatusVisible,setIsOrderStatusVisible}) => {
  const orderMap = orderStatus?.orderMap;
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <CustomDialog
        header="Order Timeline"
        visible={isOrderStatusVisible}
        className="orderStatus-dialog bg-[#22262C] flex "
        onHide={() =>{setIsOrderStatusVisible(false)}}
        draggable={false}
        resizable={false}
        dismissableMask={true}
      >
        <div className="flex justify-center ml-2">
          <Timeline orderMap={orderMap} />
        </div>
      </CustomDialog>
    </div>
  );
};

export default OrderStatus;
