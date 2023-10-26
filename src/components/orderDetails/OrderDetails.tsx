import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  URL_OMS_ORDER_STATUS,
  URL_ORDER_DETAILS,
  URL_OMS_ORDER_FLOW,
  URL_PROMOTIONS,
} from "../../constants/apiConstants";
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
import { fetchData } from "../../utils/fetchUtil";
import Table from "../common/Table";
import CustomIcon from "../common/CustomIcon";
import Card from "../common/Card";
import PromotionsIcon from "../../assets/promotions_white.svg";
import OrderClockIcon from "../../assets/order_clock_white.svg";
import OmsInfoIcon from "../../assets/oms_info_white.svg";
import Loader from "../loader";
import OrderStatus from "../orderstatus";
import { orderStatus, orderTimeline } from "../../@types/ordertimeline";

const OrderDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | Record<string, never>>(
    {}
  );
  const [omsOrderStatus, setOmsOrderStatus] = useState<
    OmsOrderStatus | Record<string, never>
  >({});
  const [omsOrderFlow, setOmsOrderFlow] = useState<orderStatus>();
  const [isOrderStatusVisible, setIsOrderStatusVisible] =
    useState<boolean>(false);
  const [promotions, setPromotions] = useState<Record<string, never>>({});
  const [itemTableData, setItemTableData] = useState<CommerceItemData[]>([]);

  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    setIsLoading(true);
    getOrderData();
    getOmsOrderStatus();
    getOmsOrderFlow();
    getPromotions();
  }, [orderId]);

  const getOrderData = async () => {
    const data: OrderData = await fetchData(
      `${URL_ORDER_DETAILS}/${orderId}`,
      {},
    );
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
    const data: OmsOrderStatus = await fetchData(
      `${URL_OMS_ORDER_STATUS}/${orderId}`,
      {},
    );
    setOmsOrderStatus(data || {});
  };

  const getOmsOrderFlow = async () => {
    const data: OmsOrderFlow = await fetchData(
      `${URL_OMS_ORDER_FLOW}/${orderId}`,
      {},
    );
    console.log(omsOrderFlow);
    setOmsOrderFlow(data || {});
  };

  const getPromotions = async () => {
    const promoUrl = URL_PROMOTIONS.replace(":orderId", orderId);
    const data: OmsOrderFlow = await fetchData(promoUrl, {});
    console.log(promotions);
    setPromotions(data || {});
  };

  const formatName = (fullName): string => {
    return fullName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  const showPromotions = (): void => {
    //show promotion modal
  };

  const showOmsStatusInfo = (): void => {
    //show oms modal
  };

  const showOrderTimeline = (): void => {
    setIsOrderStatusVisible(true);
  };

  const viewAllItems = (): void => {
    //viewAll functionality
  };

  return isLoading ? (
    <Loader />
  ) : Object.keys(orderData).length > 0 ? (
    <>
    <div id="orderDetailsComp">
      <div className="gridNoGapRounded grid-cols-1 m-4 p-0 sm:py-4 sm:px-6 sm:bg-[#30343B] ">
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
        <div className="flexColWrapper sm:gap-y-0 sm:grid-cols-2 ">
          <div className="flexWrapper justify-start bg-[#30343B] rounded-t-md">
            <span className="w-auto sm:w-1/5 flex items-center">
              {ORDER}
              <CustomIcon
                className="ml-2 cursor-pointer"
                alt="order-clock-icon"
                src={OrderClockIcon}
                width="1rem"
                height="1rem"
                onClick={showOrderTimeline}
              />
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.orderId}
            </span>
          </div>
          <div className="flexWrapper bg-[#30343B]">
            <span className="w-auto sm:w-1/5 font-light">{ORDER_TOTAL}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.orderTotal}
            </span>
          </div>
        </div>
        <div className="flexColWrapper sm:gap-y-0 sm:grid-cols-2 bg-[#30343B]">
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light">{SUBMITTED}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.submittedDate}
            </span>
          </div>
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light">{CHANNEL}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.originOfOrder}
            </span>
          </div>
        </div>
        <div className="flexColWrapper sm:gap-y-0 sm:grid-cols-2 bg-[#30343B] rounded-b-md">
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light">{LOCALE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.locale}
            </span>
          </div>
          <div className="flexBlockWrapper py-1 px-4 sm:p-0 border-none">
            <span className="w-auto sm:w-1/5">{ORDER_TYPE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.customerInfo?.biTier}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse p-0 sm:grid gap-4 sm:grid-cols-2 m-4">
        <div className="bg-[#1C1C20] sm:bg-[#30343B] p-0 sm:py-4 sm:px-6 gridNoGapRounded grid-cols-1">
          <span className="!text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {STATUS_ACROSS}
          </span>
          <div className="flexBlockWrapper rounded-t-md border-t-0 py-1 px-4 sm:p-0 sm:border-t border-solid border-[#383F47] bg-[#30343B]">
            <span className="w-auto sm:w-1/6">{ATG}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {`${orderData?.status} - ${orderData?.sephOrderStatus}`}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper">
            <span className="w-auto sm:w-1/6 flex items-center">
              {OMS}
              <CustomIcon
                className="ml-2 cursor-pointer"
                alt="oms-info-icon"
                src={OmsInfoIcon}
                width="0.85rem"
                height="0.85rem"
                onClick={showOmsStatusInfo}
              />
            </span>
            <span className="w-auto sm:w-5/6 font-medium">
              {omsOrderStatus?.orderNumStatus}
            </span>
          </div>
          <div className="flexBlockWrapper rounded-b-md border-t filterCardWrapper">
            <span className="w-auto sm:w-1/6">{WMS}</span>
            <span className="w-auto sm:w-5/6 font-medium"></span>
          </div>
        </div>
        <div className="bg-[#1C1C20] sm:bg-[#30343B] p-0 sm:py-4 sm:px-6 gridNoGapRounded grid-cols-1">
          <span className="!text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {CUSTOMER_INFO}
          </span>
          <div className="flexBlockWrapper border-t-0 sm:border-t filterCardWrapper rounded-t-md">
            <span className="w-auto sm:w-1/6">{NAME}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {formatName(
                `${orderData?.customerInfo?.firstName} ${orderData?.customerInfo?.lastName}`,
              )}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper">
            <span className="w-auto sm:w-1/6">{EMAIL}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {orderData?.customerInfo?.email}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper rounded-b-md">
            <span className="w-auto sm:w-1/6">{BITIER}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {orderData?.customerInfo?.biTier}
            </span>
          </div>
        </div>
      </div>

      <div className="gridNoGapRounded grid-cols-1 m-4 bg-[#1C1C20] sm:bg-[#30343B] p-0 sm:py-4 sm:px-6">
        <div className="flex justify-between border-none !bg-[#1C1C20] sm:!bg-inherit">
          <span className="w-3/4 sm:w-full !text-lg !text-[#F2F2F2] font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {ITEMS_INFO}
          </span>
          <span
            className="w-1/4 sm:hidden justify-end flex items-center !text-[12px] font-normal cursor-pointer !bg-[#1C1C20] sm:!bg-inherit"
            onClick={viewAllItems}
          >
            {VIEW_ALL}
          </span>
        </div>
        <div className="hidden sm:block rounded-md">
          {itemTableData?.length > 0 && (
            <Table
              size="small"
              tableData={itemTableData}
              className={"orderItemInfoTable"}
              scrollable={true}
              scrollHeight={"20rem"}
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

      <div className="gridNoGapRounded m-4 p-0 sm:p-4 sm:bg-[#30343B] sm:py-4 sm:px-6">
        <div className="!bg-[#1C1C20] sm:!bg-inherit">
          <span className="block w-[100%] !text-lg font-bold !bg-[#1C1C20] sm:!bg-inherit">
            {PAYMENT_INFO}
          </span>
        </div>
        <div className="flexColWrapper gap-y-0 grid-cols-2">
          <div className="flexWrapper justify-start bg-[#30343B] rounded-t-md">
            <span className="w-auto sm:w-1/5">{PAYMENT_TYPE}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].paymentType}
            </span>
          </div>
          <div className="flexWrapper bg-[#30343B] ">
            <span className="w-auto sm:w-1/5">{AMOUNT}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].amount}
            </span>
          </div>
        </div>
        <div className="flexColWrapper gap-y-0 grid-cols-2">
          <div className="flexWrapper bg-[#30343B] rounded-b-md border-none">
            <span className="w-auto sm:w-1/5">{STATUS}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].status}
            </span>
          </div>
        </div>
      </div>
    </div>
      <OrderStatus
        orderStatus={omsOrderFlow}
        isOrderStatusVisible={isOrderStatusVisible}
        setIsOrderStatusVisible={setIsOrderStatusVisible}
      />
    </>
  ) : (
    <div className="text-md pt-48 text-center text-gray-400 font-semibold">
      {NO_MATCHING_ORDERS_FOUND}
    </div>
  );
};

export default OrderDetails;
