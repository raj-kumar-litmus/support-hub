import { ChartData } from "chart.js";
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { FC, useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import LineChart from "../components/LineChart";
import HorizontalTable from "../components/HorizontalTable";
import CustomTab from "../components/common/customtab";
import CustomTable from "../components/common/customtable";
import Loader from "../components/loader";
import OrderSummaryCard from "../components/OrderSummaryCard";
import PieChart from "../components/PieChart";
import {
  HOURLY_ORDER_TREND_LINE_CHART_OPTION,
  ORDER_REPORT_PIE_CHART_OPTIONS
} from "../config/chartConfig";
import { URL_HOURLYREPORT } from "../constants/apiConstants";
import {
  CHANNELWISE_DATA_LABELS,
  HOURLY_TREND_DATA_LABELS,
  LOCALEWISE_DATA_LABELS,
  ORDER_PIE_CHART_LABELS,
  ORDER_REPORT_CHART_LABELS,
  ORDER_REPORT_LABELS, ORDER_REPORT_THRESHOLDS,
  ORDER_SUMMARY_LABELS, PAYMENTWISE_DATA_LABELS,
  REPORT_TABS,
  SCREEN_WIDTH,
  TIMESTAMPS
} from "../constants/appConstants";
import {
  OrderReportData,
  OrderTableData,
  SummaryTableData
} from "../@types/pages/orderReport";
import { CURRENT_PST_DATE } from "../utils/dateTimeUtil";
import { fetchData } from "../utils/fetchUtil";
import { getTableHeaders } from "../utils/Utils";
import SectionTitle from "../components/SectionTitle";

const OrderReport = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hourlyReport, setHourlyReport] = useState<OrderReportData>(null);
  const [orderSummary, setOrderSummary] = useState<SummaryTableData[]>([]);
  const [channelWiseOrderData, setChannelWiseOrderData] = useState<ChartData>(null);
  const [paymentWiseOrderData, setPaymentWiseOrderData] = useState<ChartData>(null);
  const [hourlyOrderTrendData, setHourlyOrderTrendData] = useState<ChartData>(null);
  const [localeWiseHourlyOrderData, setLocaleWiseHourlyOrderData] = useState<OrderTableData[]>(null);
  const [channelWiseHourlyOrderData, setChannelWiseHourlyOrderData] = useState<OrderTableData[]>(null);
  const [paymentWiseHourlyOrderData, setPaymentWiseHourlyOrderData] = useState<OrderTableData[]>(null);
  const [localeWiseTotalData, setLocaleWiseTotalData] = useState<number[]>(null);
  const [channelWiseTotalData, setChannelWiseTotalData] = useState<number[]>(null);
  const [paymentWiseTotalData, setPaymentWiseTotalData] = useState<number[]>(null);
  const [tabValue, setTabValue] = useState<number>(0);
  const { width } = useScreenSize();

  const getTotalData = (data: number[]) => {
    return data.reduce((sum, num) => sum + num, 0);
  }

  const getHourlyReport = async () => {
    try {
      const data = await fetchData(URL_HOURLYREPORT, {});
      setHourlyReport(data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderSummary = () => {
    const data = hourlyReport.summary;
    const summary = [
      {
        [ORDER_SUMMARY_LABELS.TOTAL_ORDER_COUNT]: data.totalOrdersPlaced,
        [ORDER_SUMMARY_LABELS.US_ORDER_COUNT]: data.usOrdersPlaced,
        [ORDER_SUMMARY_LABELS.CA_ORDER_COUNT]: data.caOrdersPlaced
      },
      {
        [ORDER_SUMMARY_LABELS.TOTAL_SALES]: [data.totalSales, ORDER_REPORT_LABELS.USD],
        [ORDER_SUMMARY_LABELS.US_SALES]: [data.usSales, ORDER_REPORT_LABELS.USD],
        [ORDER_SUMMARY_LABELS.CA_SALES]: [data.caSales, ORDER_REPORT_LABELS.CAD]
      },
      {
        [ORDER_SUMMARY_LABELS.TOTAL_SDD_ORDERS_PLACED]: data.sddOrdersPlaced,
        [ORDER_SUMMARY_LABELS.TOTAL_SDD_ORDERS_COMPLETED]: data.sddOrdersCompleted,
        [ORDER_SUMMARY_LABELS.TOTAL_BOPIS_ORDERS_PLACED]: data.bopisOrdersPlaced
      },
      {
        [ORDER_SUMMARY_LABELS.AVERAGE_ORDER_VALUE]: [data.averageOrderValue, ORDER_REPORT_LABELS.USD],
        [ORDER_SUMMARY_LABELS.US_AVERAGE_ORDER_VALUE]: [data.usAverageOrderValue, ORDER_REPORT_LABELS.USD],
        [ORDER_SUMMARY_LABELS.CA_AVERAGE_ORDER_VALUE]: [data.caAverageOrderValue, ORDER_REPORT_LABELS.CAD]
      },
    ]
    setOrderSummary(summary);
  }

  const getChannelWiseOrder = () => {
    const data = hourlyReport.channelWiseOrderReport;
    const datasets = [
      {
        label: ORDER_PIE_CHART_LABELS.CHANNELWISE_ORDER,
        data: [data.webOrderCount, data.mWebCount, data.iOSCount, data.androidCount, data.mPlusCount, data.jcpCount, data.instaCount, data.cscCount],
        backgroundColor: [
          "rgb(0, 143, 251)",
          "rgb(0, 227, 150)",
          "rgb(254, 176, 25)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208)",
          "rgb(0, 143, 251)",
          "rgb(0, 227, 150)",
          "rgb(254, 176, 25)"
        ],
        hoverBackgroundColor: [
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 227, 150, 0.6)",
          "rgb(254, 176, 25, 0.6)",
          "rgb(255, 69, 96, 0.6)",
          "rgb(119, 93, 208, 0.6)",
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 227, 150, 0.6)",
          "rgb(254, 176, 25, 0.6)"
        ],
        borderColor: "#161A1D",
        borderWidth: 1,
      },
    ]
    const chartData = { labels: ORDER_REPORT_CHART_LABELS.CHANNELWISE_ORDER_LABELS, datasets: datasets };
    setChannelWiseOrderData(chartData);
  }

  const getPaymentWiseOrder = () => {
    const data = hourlyReport.paymentWiseOrderReport;
    const datasets = [
      {
        label: ORDER_PIE_CHART_LABELS.PAYMENTWISE_ORDER,
        data: [data.pgOtherCC, data.pgPayPal, data.pgKlarna, data.pgGiftCard, data.pgOtherPlcc, data.pgApplePay, data.pgJCPDummy, data.pgCBVI, data.pgPLCC, data.pgPLCCT, data.pgInstaDummy, data.pgGoogleDummy, data.pgSephPay, data.pgStoreCredit],
        backgroundColor: [
          "rgb(0, 143, 251)",
          "rgb(0, 227, 150)",
          "rgb(254, 176, 25)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208)",
          "rgb(0, 143, 251)",
          "rgb(0, 227, 150)",
          "rgb(254, 176, 25)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208)",
          "rgb(0, 143, 251)",
          "rgb(0, 143, 251)",
          "rgb(0, 227, 150)",
          "rgb(254, 176, 25)",
          "rgb(255, 69, 96)",
          "rgb(119, 93, 208)"
        ],
        hoverBackgroundColor: [
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 227, 150, 0.6)",
          "rgb(254, 176, 25, 0.6)",
          "rgb(255, 69, 96, 0.6)",
          "rgb(119, 93, 208, 0.6)",
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 227, 150, 0.6)",
          "rgb(254, 176, 25, 0.6)",
          "rgb(255, 69, 96, 0.6)",
          "rgb(119, 93, 208, 0.6)",
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 143, 251, 0.6)",
          "rgb(0, 227, 150, 0.6)",
          "rgb(254, 176, 25, 0.6)",
          "rgb(255, 69, 96, 0.6)",
          "rgb(119, 93, 208, 0.6)"
        ],
        borderColor: "#161A1D",
        borderWidth: 1,
      },
    ]
    const chartData = { labels: ORDER_REPORT_CHART_LABELS.PAYMENTWISE_ORDER_LABELS, datasets: datasets };
    setPaymentWiseOrderData(chartData);
  }

  const getHourlyTrendData = () => {
    const data = hourlyReport.hourlyHistoricalOrderData;
    const todayData = [
      HOURLY_TREND_DATA_LABELS.TODAY,
      data.today,
      'rgb(0, 143, 251)'
    ];
    const yesterdayData = [
      HOURLY_TREND_DATA_LABELS.YESTERDAY,
      data.yesterday,
      'rgb(0, 227, 150)'
    ];
    const lastWeekData = [
      HOURLY_TREND_DATA_LABELS.LAST_WEEK,
      data.lastWeek,
      'rgb(254, 176, 25)'
    ];
    const lastMonthData = [
      HOURLY_TREND_DATA_LABELS.LAST_MONTH,
      data.lastMonth,
      'rgb(255, 69, 96)'
    ];
    const lastYearData = [
      HOURLY_TREND_DATA_LABELS.LAST_YEAR,
      data.lastYear,
      'rgb(119, 93, 208)'
    ];

    const chartData = {
      labels: TIMESTAMPS,
      datasets: [todayData, yesterdayData, lastWeekData, lastMonthData, lastYearData].map(([label, data, borderColor]) => ({
        label,
        data,
        borderColor,
      }))
    };
    setHourlyOrderTrendData(chartData);
  }

  const getLocaleWiseHourlyOrderData = () => {
    const slicedOrderData = hourlyReport.hourlySlicedOrderData;
    const historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    const summary = hourlyReport.summary;
    const time = TIMESTAMPS.slice(1);
    const totalData = [getTotalData(historicalOrderData.lastYear),
    getTotalData(historicalOrderData.lastMonth), getTotalData(historicalOrderData.lastWeek),
    getTotalData(historicalOrderData.yesterday), summary.totalOrdersPlaced,
    summary.usOrdersPlaced, summary.caOrdersPlaced,
    summary.usSales, summary.caSales, summary.totalSales]
    setLocaleWiseTotalData(totalData);
    const orderData = time.map((t, i) => (
      {
        Time: time[i],
        [LOCALEWISE_DATA_LABELS.LAST_YEAR]: historicalOrderData.lastYear[i],
        [LOCALEWISE_DATA_LABELS.LAST_MONTH]: historicalOrderData.lastMonth[i],
        [LOCALEWISE_DATA_LABELS.LAST_WEEK]: historicalOrderData.lastWeek[i],
        [LOCALEWISE_DATA_LABELS.LAST_DAY]: historicalOrderData.yesterday[i],
        [LOCALEWISE_DATA_LABELS.TODAY]: checkTableData(historicalOrderData.today[i], time[i]),
        [LOCALEWISE_DATA_LABELS.US_ORDERS]: checkTableData(slicedOrderData.usOrderCount[i], time[i]),
        [LOCALEWISE_DATA_LABELS.CA_ORDERS]: checkTableData(slicedOrderData.caOrderCount[i], time[i]),
        [LOCALEWISE_DATA_LABELS.US_SALES]: checkTableData(slicedOrderData.usTotal[i], time[i]),
        [LOCALEWISE_DATA_LABELS.CA_SALES]: checkTableData(slicedOrderData.caTotal[i], time[i]),
        [LOCALEWISE_DATA_LABELS.TOTAL_SALES]: checkTableData(slicedOrderData.totalSales[i], time[i]),
      })
    );
    setLocaleWiseHourlyOrderData(orderData);
  }

  const getChannelWiseHourlyOrderData = () => {
    const slicedOrderData = hourlyReport.hourlySlicedOrderData;
    const historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    const channelWiseOrderData = hourlyReport.channelWiseOrderReport;
    const summary = hourlyReport.summary;
    const time = TIMESTAMPS.slice(1);
    const totalData = [summary.totalOrdersPlaced,
    channelWiseOrderData.webOrderCount, channelWiseOrderData.mWebCount,
    channelWiseOrderData.iOSCount, channelWiseOrderData.androidCount,
    channelWiseOrderData.cscCount, channelWiseOrderData.mPlusCount, channelWiseOrderData.jcpCount, channelWiseOrderData.instaCount,
    ]
    setChannelWiseTotalData(totalData);
    const orderData = time.map((t, i) => ({
        Time: time[i],
        [CHANNELWISE_DATA_LABELS.TODAY]: checkTableData(historicalOrderData.today[i], time[i]),
        [CHANNELWISE_DATA_LABELS.WEB]: checkTableData(slicedOrderData.webOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.MOBILE_WEB]: checkTableData(slicedOrderData.mWebOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.IPHONE_APP]: checkTableData(slicedOrderData.iOSOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.ANDROID_APP]: checkTableData(slicedOrderData.androidOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.CSC]: checkTableData(slicedOrderData.cscOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.MPLUS]: checkTableData(slicedOrderData.mPlusOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.JCPENNY]: checkTableData(slicedOrderData.jcpOrderCount[i], time[i]),
        [CHANNELWISE_DATA_LABELS.INSTAGRAM]: checkTableData(slicedOrderData.instagramOrderCount[i], time[i]),
      })
    );
    setChannelWiseHourlyOrderData(orderData);
  }

  const getPaymentWiseHourlyOrderData = () => {
    const slicedOrderData = hourlyReport.hourlySlicedOrderData;
    const historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    const paymentWiseOrderData = hourlyReport.paymentWiseOrderReport;
    const summary = hourlyReport.summary;
    const time = TIMESTAMPS.slice(1);
    const totalData = [summary.totalOrdersPlaced,
    paymentWiseOrderData.pgApplePay, paymentWiseOrderData.pgPayPal,
    paymentWiseOrderData.pgKlarna, paymentWiseOrderData.pgGiftCard,
    paymentWiseOrderData.pgStoreCredit, paymentWiseOrderData.pgSephPay, paymentWiseOrderData.pgJCPDummy, paymentWiseOrderData.pgInstaDummy,
    paymentWiseOrderData.pgGoogleDummy, paymentWiseOrderData.pgCBVI, paymentWiseOrderData.pgCBVIT, paymentWiseOrderData.pgPLCC,
    paymentWiseOrderData.pgPLCCT, paymentWiseOrderData.pgOtherPlcc, paymentWiseOrderData.pgOtherCC
    ];
    setPaymentWiseTotalData(totalData);
    const orderData = time.map((t, i) => ({
        Time: time[i],
        [PAYMENTWISE_DATA_LABELS.TODAY]: checkTableData(historicalOrderData.today[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.APPLE_PAY]: checkTableData(slicedOrderData.pgApplePayCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.PAYPAL]: checkTableData(slicedOrderData.pgPaypalCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.KLARNA]: checkTableData(slicedOrderData.pgKlarnaCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.GIFTCARD]: checkTableData(slicedOrderData.pgGiftCardCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.STORE_CARD]: checkTableData(slicedOrderData.pgStoreCreditCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.SEPH_PAY]: checkTableData(slicedOrderData.pgSephPayCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.JCP_DUMMY]: checkTableData(slicedOrderData.pgJcpCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.INSTAGRAM_DUMMY]: checkTableData(slicedOrderData.pgInstaDummyCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.GOOGLE_DUMMY]: checkTableData(slicedOrderData.pgGoogleDummyCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.CBVI]: checkTableData(slicedOrderData.pgCbviCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.CBVIT]: checkTableData(slicedOrderData.pgCbvitCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.PLCC]: checkTableData(slicedOrderData.pgPlccCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.PLCCT]: checkTableData(slicedOrderData.pgPlcctCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.PRIVATE_LABEL]: checkTableData(slicedOrderData.pgPrivateLabelCount[i], time[i]),
        [PAYMENTWISE_DATA_LABELS.OTHER_CC]: checkTableData(slicedOrderData.pgOtherCreditCardCount[i], time[i]),
      })
    );
    setPaymentWiseHourlyOrderData(orderData);
  }

  const checkTableData = (data, time) => {
    return ((!data && (Number(CURRENT_PST_DATE.getHours()) < Number(time.split(":")[0])))) ? "" : data;
  }

  const localeWiseDataStyle = (rowData, column) => {
    if (!(typeof rowData[column?.field] === 'string') && (rowData[column?.field] < ORDER_REPORT_THRESHOLDS.LOCALEWISE_MIN)) {
      return 'bg-red-800';
    } else if (rowData[column?.field] > ORDER_REPORT_THRESHOLDS.LOCALEWISE_MAX) {
      return 'bg-green-800'
    }
    return '';
  };

  const channelWiseDataStyle = (rowData, column) => {
    if (!(typeof rowData[column?.field] === 'string') && (rowData[column?.field] < ORDER_REPORT_THRESHOLDS.CHANNELWISE_MIN)) {
      return 'bg-red-800';
    } else if (rowData[column?.field] > ORDER_REPORT_THRESHOLDS.CHANNELWISE_MAX) {
      return 'bg-green-800'
    }
    return '';
  };

  const paymentWiseDataStyle = (rowData, column) => {
    if (!(typeof rowData[column?.field] === 'string') && (rowData[column?.field] < ORDER_REPORT_THRESHOLDS.PAYMENTWISE_MIN)) {
      return 'bg-red-800';
    } else if (rowData[column?.field] > ORDER_REPORT_THRESHOLDS.PAYMENTWISE_MAX) {
      return 'bg-green-800'
    }
    return '';
  };

  useEffect(() => {
    if (hourlyReport) {
      getOrderSummary();
      getChannelWiseOrder();
      getPaymentWiseOrder();
      getHourlyTrendData();
      getLocaleWiseHourlyOrderData();
      getChannelWiseHourlyOrderData();
      getPaymentWiseHourlyOrderData();
    }
  }, [hourlyReport])

  useEffect(() => {
    setIsLoading(true)
    getHourlyReport();
  }, []);

  const getTotalRow = (totalData: number[]) => {
    return <ColumnGroup >
      <Row>
        <Column footer="Total" align="center" />
        {totalData && totalData.length > 0 && totalData.map((t: number, i: number) =>
          <Column footer={t} key={i} align="center" />
        )}
      </Row>
    </ColumnGroup>
  }

  return (
    isLoading ?
      <Loader className="m-auto p-0" /> :
      <div>
        <SectionTitle title={ORDER_REPORT_LABELS.SUMMARY} />
        {orderSummary?.length > 0 &&
          <>
            {width > SCREEN_WIDTH.SM ?
              <HorizontalTable
                tableData={orderSummary}
                rowHeadClassName="p-1 sm:p-4 text-left sm:text-right font-medium"
                dataClassName="text-left p-1 sm:p-4 border-r border-black-400"
              /> :
              orderSummary.map(summary =>
                <OrderSummaryCard
                  cardData={summary}
                />
              )}
          </>
        }
        <SectionTitle title={ORDER_REPORT_LABELS.ORDER_PIE_CHART} />
        <div className="order-report-comp block sm:flex overflow-x-auto">
          {channelWiseOrderData &&
            <PieChart
              data={channelWiseOrderData}
              options={ORDER_REPORT_PIE_CHART_OPTIONS}
              height="400"
              width="420"
              xsHeight="320"
              xsWidth="320"
            />
          }
          {paymentWiseOrderData &&
            <PieChart
              data={paymentWiseOrderData}
              options={ORDER_REPORT_PIE_CHART_OPTIONS}
              height="400"
              width="440"
              xsHeight="340"
              xsWidth="340"
            />}
        </div>
        <SectionTitle title={ORDER_REPORT_LABELS.HOURLY_ORDER_TREND} />
        {hourlyOrderTrendData &&
          <LineChart
            title={ORDER_REPORT_LABELS.HOURLY_ORDER_TREND.toUpperCase()}
            options={HOURLY_ORDER_TREND_LINE_CHART_OPTION}
            data={hourlyOrderTrendData}
            defaultClasses
          />}
        <SectionTitle title={ORDER_REPORT_LABELS.HOURLY_ORDER_DATA} />
        <CustomTab
          className="report-tab custom-tab"
          tabData={REPORT_TABS}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
        <div className="order-report-comp flex overflow-x-auto">
          {tabValue === 0 && localeWiseHourlyOrderData &&
            <CustomTable
              showGridlines
              stripedRows
              value={localeWiseHourlyOrderData}
              className="report-table custom-table"
              children={getTableHeaders(localeWiseHourlyOrderData).map((h) => (
                <Column key={h} field={h} header={h} bodyClassName={localeWiseDataStyle}></Column>
              ))}
              footerColumnGroup={getTotalRow(localeWiseTotalData)}
            />
          }
          {tabValue === 1 && channelWiseHourlyOrderData &&
            <CustomTable
              showGridlines
              stripedRows
              columnResizeMode="expand"
              value={channelWiseHourlyOrderData}
              className="report-table channel-table custom-table"
              children={getTableHeaders(channelWiseHourlyOrderData).map((h) => (
                <Column key={h} field={h} header={h} bodyClassName={channelWiseDataStyle}></Column>
              ))}
              footerColumnGroup={getTotalRow(channelWiseTotalData)}
            />
          }
          {tabValue === 2 && paymentWiseHourlyOrderData &&
            <CustomTable
              showGridlines
              stripedRows
              value={paymentWiseHourlyOrderData}
              className="report-table payment-table custom-table"
              children={getTableHeaders(paymentWiseHourlyOrderData).map((h) => (
                <Column key={h} field={h} header={h} bodyClassName={paymentWiseDataStyle}
                ></Column>
              ))
              }
              footerColumnGroup={getTotalRow(paymentWiseTotalData)}
            />
          }
        </div>
      </div>
  );
}

export default OrderReport