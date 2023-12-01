import { Dialog } from "primereact/dialog";
import React from "react";
import Timeline from "./common/orderTimeline";
import { OmsOrderFlow } from "../@types/pages/OrderDetails";
import { ORDER_DETAILS_LABELS } from "../constants/appConstants";
interface OrderStatusProps {
  orderStatus: OmsOrderFlow;
  isOrderStatusVisible: boolean;
  setIsOrderStatusVisible: (a: boolean) => void;
}
const OrderStatus: React.FC<OrderStatusProps> = (props) => {
  const orderMap = props.orderStatus?.orderMap;
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <Dialog
        header={ORDER_DETAILS_LABELS.ORDER_TIMELINE}
        visible={props.isOrderStatusVisible}
        className="orderStatus-dialog bg-black-200 flex "
        onHide={() => {
          props.setIsOrderStatusVisible(false);
        }}
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
