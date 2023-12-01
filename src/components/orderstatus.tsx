import CustomDialog from "./common/customdialog";
import React from "react";
import { OmsOrderFlow } from "../@types/OrderDetails";
import Timeline from "./common/orderTimeline";
import { ORDER_DETAILS_LABELS } from "../constants/appConstants";
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
        header={ORDER_DETAILS_LABELS.ORDER_TIMELINE}
        visible={isOrderStatusVisible}
        className="orderStatus-dialog bg-black-200 flex "
        onHide={() => {
          setIsOrderStatusVisible(false);
        }}
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
