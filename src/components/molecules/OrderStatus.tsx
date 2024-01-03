import React from "react";
import CustomDialog from "../atoms/CustomDialog";
import Timeline from "./OrderTimeline";
import { OmsOrderFlow } from "../../@types/pages/orderDetails";
import { ORDER_DETAILS_LABELS } from "../../helpers/constants/appConstants";
interface OrderStatusProps {
  orderStatus: OmsOrderFlow;
  isOrderStatusVisible: boolean;
  setIsOrderStatusVisible: (a: boolean) => void;
}
const OrderStatus: React.FC<OrderStatusProps> = (props) => {
  const orderMap = props.orderStatus?.orderMap;
  return (
    <div className="block w-screen font-helvetica sm:rounded-lg">
      <CustomDialog
        header={ORDER_DETAILS_LABELS.ORDER_TIMELINE}
        visible={props.isOrderStatusVisible}
        className="custom-popup bg-black-200 flex "
        onHide={() => {
          props.setIsOrderStatusVisible(false);
        }}
      >
        <div className="flex justify-center ml-2">
          <Timeline orderMap={orderMap} />
        </div>
      </CustomDialog>
    </div>
  );
};

export default OrderStatus;
