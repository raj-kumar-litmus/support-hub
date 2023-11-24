import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  VIEW_ALL,
  SUBMITTED,
  WMS,
} from "../../constants/appConstants";
import {
  CommerceItem,
  CommerceItemData,
  OmsOrderFlow,
  OmsOrderStatus,
  OrderData,
  IPromotion,
} from "../../@types/OrderDetails";

import { fetchData } from "../../utils/fetchUtil";
import CustomIcon from "../common/CustomIcon";
import Card from "../common/Card";
import PromotionsIcon from "../../assets/promotions_white.svg";
import OrderClockIcon from "../../assets/order_clock_white.svg";
import RightArrowIcon from "../../assets/right_arrow.svg";
import OmsInfoIcon from "../../assets/oms_info_white.svg";
import Loader from "../loader";
import OrderStatus from "../orderstatus";
import PromotionsPopup from "../promotionspopup";
import OrderStatusPopup from "../orderstatuspopup";
import CustomImage from "../common/customimage";
import { getTableHeaders } from "../utils/Utils";
import CustomTable from "../common/customtable";
import useScreenSize from "../../hooks/useScreenSize";
import { Column } from "primereact/column";
import ItemInformationsPopUp from "../itemInformationsPopUp";

const OrderDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | Record<string, never>>(
    {},
  );
  const [omsOrderStatus, setOmsOrderStatus] = useState<
    OmsOrderStatus | Record<string, never>
  >({});
  const [omsOrderFlow, setOmsOrderFlow] = useState<OmsOrderFlow | any>();
  const [isOrderStatusVisible, setIsOrderStatusVisible] =
    useState<boolean>(false);
  const [promotions, setPromotions] = useState<IPromotion[] | any>([]);
  const [itemTableData, setItemTableData] = useState<CommerceItemData[]>([]);
  const [itemTableDataSliced, setItemTableDataSliced] = useState<
    CommerceItemData[]
  >([]);
  const [openPromotionsPopup, setOpenPromotionsPopup] =
    useState<boolean>(false);
  const [openOrderStatusPopup, setOpenOrderStatusPopup] =
    useState<boolean>(false);
  const [openItemInformationPopup, setItemInformationPopup] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const { orderId } = useParams<{ orderId: string }>();
  const MOBILE_MIN_ORDER_LIST = 5;
  const IS_MOBILE_SCREEN = width < 640;

  useEffect(() => {
    setIsLoading(true);
    getOrderData();
    getOmsOrderStatus();
    getOmsOrderFlow();
    getPromotions();
  }, [orderId]);

  useEffect(() => {
    if (IS_MOBILE_SCREEN && itemTableData.length > MOBILE_MIN_ORDER_LIST) {
      setItemTableDataSliced(itemTableData.slice(0, MOBILE_MIN_ORDER_LIST));
    }
  }, [itemTableData]);

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
    setOmsOrderFlow(data || {});
  };

  const getPromotions = async () => {
    const promoUrl = URL_PROMOTIONS.replace(":orderId", orderId);
    const data: IPromotion = await fetchData(promoUrl, {});
    setPromotions(data || {});
  };

  const formatName = (fullName): string => {
    return fullName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  const showPromotions = (): void => {
    setOpenPromotionsPopup(true);
  };

  const showOmsStatusInfo = (): void => {
    setOpenOrderStatusPopup(true);
  };

  const showOrderTimeline = (): void => {
    setIsOrderStatusVisible(true);
  };

  return isLoading ? (
    <Loader className="h-full" />
  ) : Object.keys(orderData).length > 0 ? (
    <div id="orderDetailsComp">
      <div className="flex sm:hidden border-b border-solid border-black-300 h-[44px] items-center px-[14px] py-[24px]">
        <CustomImage
          className="h-[13px]"
          src={RightArrowIcon}
          alt="Search"
          onClick={() => navigate(-1)}
        />
        <span className="text-gray-300 text-center mx-auto text-[14px]">
          Order #{orderId}
        </span>
      </div>
      <div className="gridNoGapRounded grid-cols-1 mb-4 p-0 sm:py-4 sm:px-6 sm:bg-black-200">
        <div className="flex justify-between border-none !bg-black-100 sm:!bg-inherit">
          <span className="w-1/2 !text-lg !text-gray-200 font-bold !bg-black-100 sm:!bg-inherit">
            {ORDER_DETAILS}
          </span>
          <span
            className="justify-end flex items-center !text-[12px] font-normal cursor-pointer !bg-black-100 sm:!bg-inherit"
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
          <div className="flexWrapper justify-start bg-black-200 rounded-t-md">
            <span className="w-auto sm:w-1/5 flex items-center min-w-[4.5rem]">
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
            <span className="w-auto sm:w-4/5 font-medium self-center">
              {orderData?.orderId}
            </span>
          </div>
          <div className="flexWrapper bg-black-200 ">
            <span className="w-auto sm:w-1/5 font-light min-w-[4.5rem]">
              {ORDER_TOTAL}
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.orderTotal}
            </span>
          </div>
        </div>
        <div className="flexColWrapper sm:gap-y-0 sm:grid-cols-2 bg-black-200 ">
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light min-w-[4.5rem]">
              {SUBMITTED}
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.submittedDate}
            </span>
          </div>
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light min-w-[4.5rem]">
              {CHANNEL}
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.originOfOrder}
            </span>
          </div>
        </div>
        <div className="flexColWrapper sm:gap-y-0 sm:grid-cols-2 bg-black-200  rounded-b-md">
          <div className="flexWrapper">
            <span className="w-auto sm:w-1/5 font-light min-w-[4.5rem]">
              {LOCALE}
            </span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.locale}
            </span>
          </div>
          <div className="flexBlockWrapper py-1 px-4 sm:p-0 border-none">
            <span className="w-auto sm:w-1/5 min-w-[4.5rem]">{ORDER_TYPE}</span>
            <span className="w-auto sm:w-4/5 font-medium">&nbsp;&nbsp;-</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse p-0 sm:grid gap-4 sm:grid-cols-2 mb-4">
        <div className="p-0 sm:py-4 sm:px-6 gridNoGapRounded grid-cols-1 bg-black-100 sm:bg-black-200">
          <span className="!text-lg font-bold bg-black-100 sm:bg-inherit">
            {STATUS_ACROSS}
          </span>
          <div className="flexBlockWrapper rounded-t-md border-t-0 py-1 px-4 sm:p-0 sm:border-t border-solid border-black-300 bg-black-200">
            <span className="w-auto sm:w-1/6 min-w-[4.5rem]">{ATG}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {`${orderData?.status} - ${orderData?.sephOrderStatus}`}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper">
            <span className="w-auto sm:w-1/6 flex items-center min-w-[4.5rem]">
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
            <span className="w-auto sm:w-1/6 min-w-[4.5rem]">{WMS}</span>
            <span className="w-auto sm:w-5/6 font-medium"></span>
          </div>
        </div>
        <div className="p-0 sm:py-4 sm:px-6 gridNoGapRounded grid-cols-1 bg-black-100 sm:bg-black-200">
          <span className="!text-lg font-bold bg-black-100 sm:bg-inherit">
            {CUSTOMER_INFO}
          </span>
          <div className="flexBlockWrapper border-t-0 sm:border-t filterCardWrapper rounded-t-md">
            <span className="w-auto sm:w-1/6 min-w-[4.5rem]">{NAME}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {formatName(
                `${orderData?.customerInfo?.firstName} ${orderData?.customerInfo?.lastName}`,
              )}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper">
            <span className="w-auto sm:w-1/6 min-w-[4.5rem]">{EMAIL}</span>
            <span
              className="w-auto sm:w-5/6 font-medium whitespace-nowrap text-ellipsis overflow-hidden"
              title={orderData?.customerInfo?.email}
            >
              {orderData?.customerInfo?.email}
            </span>
          </div>
          <div className="flexBlockWrapper border-t filterCardWrapper rounded-b-md">
            <span className="w-auto sm:w-1/6 min-w-[4.5rem]">{BITIER}</span>
            <span className="w-auto sm:w-5/6 font-medium">
              {orderData?.customerInfo?.biTier}
            </span>
          </div>
        </div>
      </div>

      <div className="gridNoGapRounded grid-cols-1 mb-4 p-0 sm:py-4 sm:px-6 bg-black-100 sm:bg-black-200">
        <div
          className={`flex justify-between border-none !bg-black-100 sm:!bg-inherit ${
            IS_MOBILE_SCREEN ? "sticky top-0" : ""
          }`}
        >
          <span className="w-3/4 sm:w-full !text-lg !text-gray-200 font-bold !bg-black-100 sm:!bg-inherit">
            {ITEMS_INFO}
          </span>
          {itemTableDataSliced.length > 0 && (
            <span
              className="w-1/4 sm:hidden justify-end flex items-center !text-[12px] font-normal cursor-pointer !bg-black-100 sm:!bg-inherit"
              onClick={() => setItemInformationPopup(true)}
            >
              {VIEW_ALL}
            </span>
          )}
        </div>
        <div className="hidden sm:block rounded-md">
          {itemTableData?.length > 0 && (
            <CustomTable
              showGridlines
              stripedRows
              value={itemTableData}
              className={"custom-table order-details-table"}
            >
              {getTableHeaders(itemTableData).map((h) => (
                <Column key={h} field={h} header={h}></Column>
              ))}
            </CustomTable>
          )}
        </div>
        <div className="block sm:hidden">
          {itemTableDataSliced.length > 0 &&
            itemTableDataSliced?.map(
              (dataObj: CommerceItemData, index: number) => (
                <Card
                  key={index}
                  cardData={dataObj}
                  type="ORDER_DETAILS_ITEM"
                />
              ),
            )}
          {itemTableDataSliced.length === 0 &&
            itemTableData?.length > 0 &&
            itemTableData?.map((dataObj: CommerceItemData, index: number) => (
              <Card key={index} cardData={dataObj} type="ORDER_DETAILS_ITEM" />
            ))}
        </div>
      </div>

      <div className="gridNoGapRounded mb-4 p-0 sm:p-4 sm:py-4 sm:px-6 sm:bg-black-200">
        <div className="!bg-black-100 sm:!bg-inherit">
          <span className="block w-[100%] !text-lg font-bold !bg-black-100 sm:!bg-inherit">
            {PAYMENT_INFO}
          </span>
        </div>
        <div className="flexColWrapper gap-y-0 grid-cols-2">
          <div className="flexWrapper justify-start bg-black-200 rounded-t-md">
            <span className="w-auto mr-3.5 sm:mr-0 sm:w-[35%]">
              {PAYMENT_TYPE}
            </span>
            <span className="w-auto sm:w-[65%] font-medium text-right sm:text-left">
              {orderData?.paymentInfo?.[0].paymentType} -{" "}
              {orderData?.paymentInfo?.[0].paymentCardType.toUpperCase()}
            </span>
          </div>
          <div className="flexWrapper bg-black-200">
            <span className="w-auto sm:w-1/5 min-w-[4.5rem]">{AMOUNT}</span>
            <span className="w-auto sm:w-4/5 font-medium">
              {orderData?.paymentInfo?.[0].amount}
            </span>
          </div>
        </div>
        <div className="flexColWrapper gap-y-0 grid-cols-2">
          <div className="flexWrapper bg-black-200 rounded-b-md border-none">
            <span className="w-auto sm:w-[35%]">{STATUS}</span>
            <span className="w-auto sm:w-[65%] font-medium">
              {orderData?.paymentInfo?.[0].status}
            </span>
          </div>
        </div>
      </div>
      <ItemInformationsPopUp
        openItemInformationPopup={openItemInformationPopup}
        setItemInformationPopup={setItemInformationPopup}
        lineitems={itemTableData}
      />
      <PromotionsPopup
        openPromotionsPopup={openPromotionsPopup}
        setOpenPromotionsPopup={setOpenPromotionsPopup}
        promotions={promotions}
      />
      <OrderStatusPopup
        openDialog={openOrderStatusPopup}
        setOpenDialog={setOpenOrderStatusPopup}
      />
      <OrderStatus
        orderStatus={omsOrderFlow}
        isOrderStatusVisible={isOrderStatusVisible}
        setIsOrderStatusVisible={setIsOrderStatusVisible}
      />
    </div>
  ) : (
    <div className="text-md pt-48 text-center text-gray-400 font-semibold">
      {NO_MATCHING_ORDERS_FOUND}
    </div>
  );
};

export default OrderDetails;
