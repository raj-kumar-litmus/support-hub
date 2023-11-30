import React from "react";
import { OmsOrderFlow } from "../@types/OrderDetails";
import CustomDialog from "./common/customdialog";
import Timeline from "./common/orderTimeline";
interface OrderStatusProps {
  orderStatus: OmsOrderFlow;
  isOrderStatusVisible: boolean;
  setIsOrderStatusVisible: (a: boolean) => void;
}
const OrderStatus: React.FC<OrderStatusProps> = ({
  orderStatus,
  isOrderStatusVisible,
  setIsOrderStatusVisible,
}) => {
  const orderMap = orderStatus?.orderMap;
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <CustomDialog
        header="Order Timeline"
        visible={isOrderStatusVisible}
        className="custom-popup  bg-black-200 flex "
        onHide={() =>{setIsOrderStatusVisible(false)}}
      >
        <div className="flex justify-center ml-2">
          <Timeline orderMap={orderMap} />
        </div>
      </CustomDialog>
    </div>
  );
};

export default OrderStatus;
