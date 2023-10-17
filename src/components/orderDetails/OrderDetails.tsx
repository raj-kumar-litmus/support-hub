import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import {
//   URL_OMS_ORDER_STATUS,
//   URL_ORDER_DETAILS,
// } from "../../constants/apiConstants";
import { omsOrderStatusJSON } from "../../sampleJSON/omsOrderStatus";
import { orderDataJSON } from "../../sampleJSON/orderData";

import {
  AMOUNT,
  ATG,
  BITIER,
  CHANNEL,
  CUSTOMER_INFO,
  EMAIL,
  ITEMS_INFO,
  LOCALE,
  NAME,
  NO_MATCHING_ORDERS_FOUND,
  OMS,
  ORDER,
  ORDER_DETAILS,
  ORDER_TOTAL,
  ORDER_TYPE,
  PAYMENT_INFO,
  PAYMENT_TYPE,
  PROMOTIONS,
  STATUS,
  STATUS_ACROSS,
  SUBMITTED,
  VIEW_ALL,
  WMS,
} from "../../constants/appConstants";
import {
  CommerceItem,
  CommerceItemData,
  OmsOrderStatus,
  OrderData,
} from "../../@types/OrderDetails";
// import { fetchData } from "../../utils/fetchUtil";
import Table from "../common/Table";
import CustomIcon from "../common/CustomIcon";
import Card from "../common/Card";
import PromotionsIcon from "../../assets/promotions_white.svg";
import OrderClockIcon from "../../assets/order_clock_white.svg";
import OmsInfoIcon from "../../assets/oms_info_white.svg";
import Loader from "../loader";

const OrderDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | Record<string, never>>(
    {},
  );
  const [omsOrderStatus, setOmsOrderStatus] = useState<
    OmsOrderStatus | Record<string, never>
  >({});
  const [itemTableData, setItemTableData] = useState<CommerceItemData[]>([]);

  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    setIsLoading(true);
    getOrderData();
    getOmsOrderStatus();
  }, [orderId]);

  const getOrderData = () => {
    // const data: OrderData = await fetchData(
    //   `${URL_ORDER_DETAILS}/${orderId}`,
    //   {},
    // );
    const data: OrderData = orderId === "60577546279" ? orderDataJSON : {};

    setOrderData(data || {});
    if (data?.commerceItem?.length) {
      const convertedArray: CommerceItemData[] = data.commerceItem.map(
        (item: CommerceItem) => {
          return {
            SKU: item.catalogRefId,
            Type: item.itemClassType,
            Quantity: item.quantity,
            "Unit Price": item.priceInfo.listPrice,
            "Total Price": item.priceInfo.rawTotalPrice,
          };
        },
      );
      setItemTableData(convertedArray);
    }
    setIsLoading(false);
  };

  const getOmsOrderStatus = async () => {
    // const data: OmsOrderStatus = await fetchData(
    //   `${URL_OMS_ORDER_STATUS}/${orderId}`,
    // );
    const data: OmsOrderStatus =
      orderId === "60577546279" ? omsOrderStatusJSON : {};
    setOmsOrderStatus(data || {});
  };

  const showPromotions = (): void => {
    //show promotion modal
  };

  const showOmsStatusInfo = (): void => {
    //show oms modal
  };

  const showOrderTimeline = (): void => {
    //show order timeline modal
  };

  const viewAllItems = (): void => {
    //viewAll functionality
  };

  return isLoading ? (
    <Loader />
  ) : Object.keys(orderData).length > 0 ? (
    <div id="orderDetailsComp">
      <div className="grid gap-y-0 grid-cols-1 m-4 p-0 sm:p-4 sm:bg-[#30343B] rounded-md">
        <div className="flex justify-between border-none !bg-[#1C1C20] sm:!bg-inherit">
          <span className="w-1/2 !text-lg !text-[#F2F2F2] font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {ORDER_DETAILS}
          </span>
          <span
            className="w-1/2 justify-end flex items-center !text-[12px] font-normal cursor-pointer !bg-[#1C1C20] sm:!bg-inherit"
            onClick={showPromotions}
          >
            <CustomIcon
              className="mr-1"
              alt="promotion-icon"
              src={PromotionsIcon}
              width="0.75rem"
              height="0.75rem"
            />
            {PROMOTIONS}
          </span>
        </div>
        <div className="flex flex-col border-t-0 sm:border-t border-solid border-[#383F47] sm:grid sm:gap-y-0 sm:grid-cols-2 ">
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none justify-start bg-[#30343B] rounded-t-md">
            <span className="w-auto sm:w-1/5 flex items-center">
              {ORDER}
              <CustomIcon
                className="ml-2 cursor-pointer"
                alt="order-clock-icon"
                src={OrderClockIcon}
                width="0.75rem"
                height="0.75rem"
                onClick={showOrderTimeline}
              />
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.orderId}
            </span>
          </div>
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none bg-[#30343B]">
            <span className="w-auto sm:w-1/5 font-light">{ORDER_TOTAL}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.orderTotal}
            </span>
          </div>
        </div>
        <div className="flex flex-col border-t-0 sm:border-t border-solid border-[#383F47] sm:grid sm:gap-y-0 sm:grid-cols-2 bg-[#30343B]">
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none">
            <span className="w-auto sm:w-1/5 font-light">{SUBMITTED}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.submittedDate}
            </span>
          </div>
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none">
            <span className="w-auto sm:w-1/5 font-light">{CHANNEL}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.originOfOrder}
            </span>
          </div>
        </div>
        <div className="flex flex-col border-t-0 sm:border-t border-solid border-[#383F47] sm:grid sm:gap-y-0 sm:grid-cols-2 bg-[#30343B] rounded-b-md">
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none">
            <span className="w-auto sm:w-1/5 font-light">{LOCALE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.locale}
            </span>
          </div>
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-none">
            <span className="w-auto sm:w-1/5">{ORDER_TYPE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.customerInfo?.biTier}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse p-0 sm:grid gap-4 sm:grid-cols-2 m-4">
        <div className="bg-[#1C1C20] sm:bg-[#30343B] p-0 sm:p-4 grid gap-y-0 grid-cols-1 rounded-md">
          <span className="!text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {STATUS_ACROSS}
          </span>
          <div className="flex justify-between w-full rounded-t-md border-t-0 py-1 px-3 sm:p-0 sm:border-t border-solid border-[#383F47] bg-[#30343B]">
            <span className="w-auto sm:w-1/6">{ATG}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {`${orderData?.status} - ${orderData?.sephOrderStatus}`}
            </span>
          </div>
          <div className="flex justify-between w-full border-t py-1 px-3 sm:p-0 border-solid border-[#383F47] bg-[#30343B]">
            <span className="w-auto sm:w-1/6 flex items-center">
              {OMS}
              <CustomIcon
                className="ml-2 cursor-pointer"
                alt="oms-info-icon"
                src={OmsInfoIcon}
                width="0.75rem"
                height="0.75rem"
                onClick={showOmsStatusInfo}
              />
            </span>
            <span className="w-auto sm:w-5/6 font-medium">
              {omsOrderStatus?.orderNumStatus}
            </span>
          </div>
          <div className="flex justify-between w-full rounded-b-md border-t py-1 px-3 sm:p-0 border-solid border-[#383F47] bg-[#30343B]">
            <span className="w-auto sm:w-1/6">{WMS}</span>
            <span className="w-auto sm:w-5/6 font-medium"></span>
          </div>
        </div>
        <div className="bg-[#1C1C20] sm:bg-[#30343B] p-0 sm:p-4 grid gap-y-0 grid-cols-1 rounded-md">
          <span className="!text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {CUSTOMER_INFO}
          </span>
          <div className="flex justify-between w-full border-t-0 sm:border-t py-1 px-3 sm:p-0 border-solid border-[#383F47] bg-[#30343B] rounded-t-md">
            <span className="w-auto sm:w-1/6">{NAME}</span>
            <span className="w-auto sm:w-5/6 font-medium">{`${orderData?.customerInfo?.firstName} ${orderData?.customerInfo?.lastName}`}</span>
          </div>
          <div className="flex justify-between w-full border-t py-1 px-3 sm:p-0 border-solid border-[#383F47] bg-[#30343B]">
            <span className="w-auto sm:w-1/6">{EMAIL}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {orderData?.customerInfo?.email}
            </span>
          </div>
          <div className="flex justify-between w-full border-t py-1 px-3 sm:p-0 border-solid border-[#383F47] bg-[#30343B] rounded-b-md">
            <span className="w-auto sm:w-1/6">{BITIER}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {orderData?.customerInfo?.biTier}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-y-0 grid-cols-1 m-4 bg-[#1C1C20] sm:bg-[#30343B] rounded-md p-0 sm:p-4">
        <div className="flex justify-between border-none !bg-[#1C1C20] sm:!bg-inherit">
          <span className="w-3/4 sm:w-full !text-lg !text-[#F2F2F2] font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {" "}
            {ITEMS_INFO}{" "}
          </span>
          <span
            className="w-1/4 sm:hidden justify-end flex items-center !text-[12px] font-normal cursor-pointer !bg-[#1C1C20] sm:!bg-inherit"
            onClick={viewAllItems}
          >
            {" "}
            {VIEW_ALL}{" "}
          </span>
        </div>
        <div className="hidden sm:block rounded-md">
          {itemTableData?.length > 0 && (
            <Table
              size="small"
              tabledata={itemTableData}
              className={"orderItemInfoTable"}
            />
          )}
        </div>
        <div className="block sm:hidden">
          {itemTableData?.length > 0 &&
            itemTableData?.map((dataObj: CommerceItemData, index: number) => (
              <Card key={index} cardData={dataObj} type="ORDER_DETAILS_ITEM" />
            ))}
        </div>
      </div>

      <div className="grid gap-y-0 m-4 p-0 sm:p-4 sm:bg-[#30343B] rounded-md">
        <div className="!bg-[#1C1C20] sm:!bg-inherit">
          <span className="block w-[100%] !text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {PAYMENT_INFO}
          </span>
        </div>
        <div className="flex flex-col border-t-0 sm:border-t border-solid border-[#383F47] sm:grid gap-y-0 grid-cols-2">
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none justify-start bg-[#30343B] rounded-t-md">
            <span className="w-auto sm:w-1/5">{PAYMENT_TYPE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].paymentType}
            </span>
          </div>
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none bg-[#30343B] ">
            <span className="w-auto sm:w-1/5">{AMOUNT}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].amount}
            </span>
          </div>
        </div>
        <div className="flex flex-col border-t-0 sm:border-t border-solid border-[#383F47] sm:grid gap-y-0 grid-cols-2">
          <div className="flex justify-between w-full py-1 px-3 sm:p-0 border-b border-solid border-[#383F47] sm:border-none bg-[#30343B] rounded-b-md border-none">
            <span className="w-auto sm:w-1/5">{STATUS}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].status}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-md pt-48 text-center text-gray-400 font-semibold">
      {NO_MATCHING_ORDERS_FOUND}
    </div>
  );
};

export default OrderDetails;
