import { ChartData } from "chart.js";
import { Column } from "primereact/column";
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { useEffect, useState } from "react";
import { ChannelWiseHourlyOrderTableData, LocaleWiseHourlyOrderTableData, OrderReportData, OrderSummaryTableData, PaymentWiseHourlyOrderTableData } from "../@types/orderreport";
import { HOURLY_ORDER_TREND_LINE_CHART_OPTION, ORDER_REPORT_PIE_CHART_OPTIONS } from "../config/chartConfig";
import { URL_HOURLYREPORT } from "../constants/apiConstants";
import { CAD, CHANNELWISE_ORDER_LABELS, HOURLY_ORDER_DATA, HOURLY_ORDER_TREND, ORDER_PIE_CHART, PAYMENTWISE_ORDER_LABELS, REPORT_TABS, SUMMARY, TIMESTAMPS, USD } from "../constants/appConstants";
import { fetchData } from "../utils/fetchUtil";
import LineChart from "./LineChart";
import PieChart from "./charts/PieChart";
import CustomTab from "./common/customtab";
import CustomTable from "./common/customtable";
import Loader from "./loader";
import { getTableHeaders } from "./utils/Utils";
import { Line } from "react-chartjs-2";

const OrderReport = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hourlyReport, setHourlyReport] = useState<OrderReportData>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummaryTableData[]>([]);
  const [channelWiseOrderData, setChannelWiseOrderData] = useState<ChartData>(null);
  const [paymentWiseOrderData, setPaymentWiseOrderData] = useState<ChartData>(null);
  const [hourlyOrderTrendData, setHourlyOrderTrendData] = useState<ChartData>(null);
  const [localeWiseHourlyOrderData, setLocaleWiseHourlyOrderData] = useState<LocaleWiseHourlyOrderTableData[]>(null);
  const [channelWiseHourlyOrderData, setChannelWiseHourlyOrderData] = useState<ChannelWiseHourlyOrderTableData[]>(null);
  const [paymentWiseHourlyOrderData, setPaymentWiseHourlyOrderData] = useState<PaymentWiseHourlyOrderTableData[]>(null);
  const [localeWiseTotalData, setLocaleWiseTotalData] = useState<number[]>(null);
  const [channelWiseTotalData, setChannelWiseTotalData] = useState<number[]>(null);
  const [paymentWiseTotalData, setPaymentWiseTotalData] = useState<number[]>(null);
  const [tabValue, setTabValue] = useState<number>(0);

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
    let data = hourlyReport.summary;
    let summary = [
      { name: "Total Order Count", data: data.totalOrdersPlaced },
      { name: "US Order Count", data: data.usOrdersPlaced },
      { name: "CA Order Count", data: data.caOrdersPlaced },
      { name: "Total Sales", data: data.totalSales, suffix: USD },
      { name: "US Sales", data: data.usSales, suffix: USD },
      { name: "CA Sales", data: data.caSales, suffix: CAD },
      { name: "Total SDD Orders Placed", data: data.sddOrdersPlaced },
      { name: "Total SDD Orders Completed", data: data.sddOrdersCompleted },
      { name: "Total BOPIS Orders Placed", data: data.bopisOrdersPlaced },
      { name: "Average Order Value", data: data.averageOrderValue, suffix: USD },
      { name: "US Average Order Value", data: data.usAverageOrderValue, suffix: USD },
      { name: "CA Average Order Value", data: data.caAverageOrderValue, suffix: CAD },
    ]
    setOrderSummary(summary);
  }

  const getChannelWiseOrder = () => {
    let data = hourlyReport.channelWiseOrderReport;
    let datasets = [
      {
        label: "Channel wise order",
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
    let chartData = { labels: CHANNELWISE_ORDER_LABELS, datasets: datasets };
    setChannelWiseOrderData(chartData);
  }

  const getPaymentWiseOrder = () => {
    let data = hourlyReport.paymentWiseOrderReport;
    let datasets = [
      {
        label: "Payment wise order",
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
    let chartData = { labels: PAYMENTWISE_ORDER_LABELS, datasets: datasets };
    setPaymentWiseOrderData(chartData);
  }

  const getHourlyTrendData = () => {
    let data = hourlyReport.hourlyHistoricalOrderData;
    let todayData = {
      label: "Today",
      data: data.today,
      borderColor: 'rgb(0, 143, 251)'
    };

    let yesterdayData = {
      label: "Yesterday",
      data: data.yesterday,
      borderColor: 'rgb(0, 227, 150)'
    };
    let lastWeekData = {
      label: "Last Week",
      data: data.lastWeek,
      borderColor: 'rgb(254, 176, 25)'
    };
    let lastMonthData = {
      label: "Last Month",
      data: data.lastMonth,
      borderColor: 'rgb(255, 69, 96)'
    };
    let lastYearData = {
      label: "Last Year",
      data: data.lastYear,
      borderColor: 'rgb(119, 93, 208)'
    };

    const chartData = {
      labels: TIMESTAMPS,
      datasets: [todayData, yesterdayData, lastWeekData, lastMonthData, lastYearData]
    };
    setHourlyOrderTrendData(chartData);
  }

  const getLocaleWiseHourlyOrderData = () => {
    let slicedOrderData = hourlyReport.hourlySlicedOrderData;
    let historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    let summary = hourlyReport.summary;
    let time = TIMESTAMPS.slice(1);
    let totalData = [getTotalData(historicalOrderData.lastYear),
    getTotalData(historicalOrderData.lastMonth), getTotalData(historicalOrderData.lastWeek),
    getTotalData(historicalOrderData.yesterday), summary.totalOrdersPlaced,
    summary.usOrdersPlaced, summary.caOrdersPlaced,
    summary.usSales, summary.caSales, summary.totalSales]
    setLocaleWiseTotalData(totalData);
    let orderData = time.map((t, i) => {
      return {
        Time: time[i],
        "Last Year": checkTableData(historicalOrderData.lastYear[i]),
        "Last Month": checkTableData(historicalOrderData.lastMonth[i]),
        "Last Week": checkTableData(historicalOrderData.lastWeek[i]),
        "Last Day": checkTableData(historicalOrderData.yesterday[i]),
        "Today": checkTableData(historicalOrderData.today[i]),
        "US Orders": checkTableData(slicedOrderData.usOrderCount[i]),
        "CA Orders": checkTableData(slicedOrderData.caOrderCount[i]),
        "US Sales": checkTableData(slicedOrderData.usTotal[i]),
        "CA Sales": checkTableData(slicedOrderData.caTotal[i]),
        "Total Sales": checkTableData(slicedOrderData.totalSales[i]),
      }
    });
    setLocaleWiseHourlyOrderData(orderData);
  }

  const getChannelWiseHourlyOrderData = () => {
    let slicedOrderData = hourlyReport.hourlySlicedOrderData;
    let historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    let channelWiseOrderData = hourlyReport.channelWiseOrderReport;
    let summary = hourlyReport.summary;
    let time = TIMESTAMPS.slice(1);
    let totalData = [summary.totalOrdersPlaced,
    channelWiseOrderData.webOrderCount, channelWiseOrderData.mWebCount,
    channelWiseOrderData.iOSCount, channelWiseOrderData.androidCount,
    channelWiseOrderData.cscCount, channelWiseOrderData.mPlusCount, channelWiseOrderData.jcpCount, channelWiseOrderData.instaCount,
    ]
    setChannelWiseTotalData(totalData);
    let orderData = time.map((t, i) => {
      return {
        Time: time[i],
        "Today": checkTableData(historicalOrderData.today[i]),
        "Web": checkTableData(slicedOrderData.webOrderCount[i]),
        "Mobile Web": checkTableData(slicedOrderData.mWebOrderCount[i]),
        "IPhone App": checkTableData(slicedOrderData.iOSOrderCount[i]),
        "Android App": checkTableData(slicedOrderData.androidOrderCount[i]),
        "CSC": checkTableData(slicedOrderData.cscOrderCount[i]),
        "mPlus": checkTableData(slicedOrderData.mPlusOrderCount[i]),
        "JCPenny": checkTableData(slicedOrderData.jcpOrderCount[i]),
        "Instagram": checkTableData(slicedOrderData.instagramOrderCount[i]),
      }
    });
    setChannelWiseHourlyOrderData(orderData);
  }

  const getPaymentWiseHourlyOrderData = () => {
    let slicedOrderData = hourlyReport.hourlySlicedOrderData;
    let historicalOrderData = hourlyReport.hourlyHistoricalOrderData;
    let paymentWiseOrderData = hourlyReport.paymentWiseOrderReport;
    let summary = hourlyReport.summary;
    let time = TIMESTAMPS.slice(1);
    let totalData = [summary.totalOrdersPlaced,
    paymentWiseOrderData.pgApplePay, paymentWiseOrderData.pgPayPal,
    paymentWiseOrderData.pgKlarna, paymentWiseOrderData.pgGiftCard,
    paymentWiseOrderData.pgStoreCredit, paymentWiseOrderData.pgSephPay, paymentWiseOrderData.pgJCPDummy, paymentWiseOrderData.pgInstaDummy,
    paymentWiseOrderData.pgGoogleDummy, paymentWiseOrderData.pgCBVI, paymentWiseOrderData.pgCBVIT, paymentWiseOrderData.pgPLCC,
    paymentWiseOrderData.pgPLCCT, paymentWiseOrderData.pgOtherPlcc, paymentWiseOrderData.pgOtherCC
    ];
    setPaymentWiseTotalData(totalData);
    let orderData = time.map((t, i) => {
      return {
        Time: time[i],
        "Today": checkTableData(historicalOrderData.today[i]),
        "Apple Pay": checkTableData(slicedOrderData.pgApplePayCount[i]),
        "Paypal": checkTableData(slicedOrderData.pgPaypalCount[i]),
        "Klarna": checkTableData(slicedOrderData.pgKlarnaCount[i]),
        "Giftcard": checkTableData(slicedOrderData.pgGiftCardCount[i]),
        "Store Card": checkTableData(slicedOrderData.pgStoreCreditCount[i]),
        "Seph Pay": checkTableData(slicedOrderData.pgSephPayCount[i]),
        "JCP (D)": checkTableData(slicedOrderData.pgJcpCount[i]),
        "Instagram (D)": checkTableData(slicedOrderData.pgInstaDummyCount[i]),
        "Google (D)": checkTableData(slicedOrderData.pgGoogleDummyCount[i]),
        "CBVI": checkTableData(slicedOrderData.pgCbviCount[i]),
        "CBVIT": checkTableData(slicedOrderData.pgCbvitCount[i]),
        "PLCC": checkTableData(slicedOrderData.pgPlccCount[i]),
        "PLCCT": checkTableData(slicedOrderData.pgPlcctCount[i]),
        "Private Label": checkTableData(slicedOrderData.pgPrivateLabelCount[i]),
        "Other CC": checkTableData(slicedOrderData.pgOtherCreditCardCount[i]),
      }
    });
    setPaymentWiseHourlyOrderData(orderData);
  }

  const checkTableData = (data) => {
    return (data || data === 0) ? data : "";
  }

  const getTotalData = (data: number[]) => {
    let sum = 0;
    data.forEach(num => {
      sum += num;
    });
    return sum;
  }

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
      <div className="p-5 sm:p-10">
        <Header title={SUMMARY} />
        {orderSummary?.length > 0 &&
          <div className="order-report-comp flex flex-col rounded-[8px] border border-[#383f47] overflow-x-auto mb-2" >
            <HorizontalTable
              data={orderSummary.slice(0, 3)}
            />
            <HorizontalTable
              data={orderSummary.slice(3, 6)}
              className="bg-[#292E36]"
            />
            <HorizontalTable
              data={orderSummary.slice(6, 9)}
            />
            <HorizontalTable
              data={orderSummary.slice(9, 12)}
              className=" bg-[#292E36]"
            />
          </div>}
        <Header title={ORDER_PIE_CHART} />
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
        <Header title={HOURLY_ORDER_TREND} />
        {hourlyOrderTrendData &&
          <LineChart
            title="HOURLY ORDER TREND"
            options={HOURLY_ORDER_TREND_LINE_CHART_OPTION}
            data={hourlyOrderTrendData}
            defaultClasses
          />}
        <Header title={HOURLY_ORDER_DATA} />
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
                <Column key={h} field={h} header={h}></Column>
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
                <Column key={h} field={h} header={h}></Column>
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
                <Column key={h} field={h} header={h}></Column>
              ))
              }
              footerColumnGroup={getTotalRow(paymentWiseTotalData)}
            />
          }
        </div>
      </div>
  );
}

const Header = ({
  title
}: {
  title: string;
}) => {
  return (
    <div className="text-[#8B8C8F] rounded-lg border border-[#383f47] p-2 my-2 w-full text-center bg-[#292E36]">{title}</div>
  );
};

const HorizontalTable = ({
  data, className
}: {
  data: Array<OrderSummaryTableData>
  className?: string
}) => {
  return (
    <table>
      <tr className={`text-[14px] ${className}`}>
        {data.length > 0 && data.map((d, i) =>
          <>
            <th key={i} className={`text-right p-4 min-w-[8rem] max-w-[8rem] text-[#F2F2F2] font-medium`}>{`${d.name}:`}</th >
            <td className="text-left p-4 border-r border-[#383f47] min-w-[8rem] max-w-[8rem] text-[#FAF9F6]">{`${d.data} ${d.suffix ? d.suffix : ""}`}</td>
          </>
        )}
      </tr>
    </table >
  );
};

export default OrderReport
