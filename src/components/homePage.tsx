import { useEffect, useState } from "react";
import HomeCard from "./common/homeCard";
import CustomImage from "./common/customimage";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import { URL_OPM } from "../constants/apiConstants";
import { fetchData } from "../utils/fetchUtil";
import { ORDERS_DURATION } from "../constants/appConstants";
import avg_orders_per_min from "../assets/avg_orders_per_min.svg";
import total_no_of_orders from "../assets/total_no_of_orders.svg";
import total_order_comp from "../assets/total_order_comp.svg";
import avg_opm_comp from "../assets/avg_opm_comp.svg";
import last_min_opm from "../assets/last_min_opm.svg";
import trending_down from "../assets/trending_down.svg";
import TimeTracker from "./timeTracker";

const CardTitle = ({ title, icon }: { title: string; icon: any }) => {
  return (
    <div className="flex justify-between">
      <h6>{title}</h6>
      <CustomImage src={icon} />
    </div>
  );
};

const OPMCards = ({ value }: { value: number }) => {
  return (
    <div className="flex items-end">
      <span className="text-2xl text-[#F2F2F2]">{value}</span>
    </div>
  );
};

const ComparisonCards = ({
  today,
  lastDay,
}: {
  today: number;
  lastDay: number;
}) => {
  const difference = lastDay - today;
  return (
    <div className="flex">
      <div className="flex flex-col pr-1 sm:pr-2 justify-between">
        <span className="text-[10px]">Today</span>
        <span className="text-[#F2F2F2] text-xl">{today}</span>
      </div>
      <div className="border border-r border-[#383F47] h-[2.5rem] m-auto"></div>
      <div className="flex flex-col px-1 sm:px-2 justify-between">
        <span className="text-[10px]">Last Day</span>
        <span className="text-[#F2F2F2] text-xl">{lastDay}</span>
      </div>
      <div className="border border-r border-[#383F47] h-[2.5rem] m-auto"></div>
      <div className="flex flex-col justify-between pl-1 sm:pl-2">
        <span
          className={`${
            difference > 0
              ? "text-[#F16476]"
              : difference < 0
              ? "text-[#5CB7ED]"
              : "text-[#8B8C8F]"
          } text-[10px]`}
        >
          Difference
        </span>
        <div className="flex">
          <span
            className={`${
              difference > 0
                ? "text-[#F16476]"
                : difference < 0
                ? "text-[#5CB7ED]"
                : "text-[#F2F2F2]"
            } text-[#F16476] text-2xl`}
          >
            {!isNaN(difference) && difference}
          </span>
          {difference > 0 ? (
            <CustomImage className="flex ml-2" src={trending_down} />
          ) : difference < 0 ? (
            <CustomImage className="flex ml-2" src={trending_down} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [canShow, setCanShow] = useState(true);
  const [avgOPM, setAvgOPM] = useState<number>(0);
  const [totalOPM, setTotalOPM] = useState<number>(0);
  const [lastMinOPM, setLastMinOPM] = useState<number>(0);
  const [lastDayAvgOPM, setLastDayAvgOPM] = useState<number>(0);
  const [lastDaytotalOPM, setLastDayTotalOPM] = useState<number>(0);
  const [refreshTime, setRefreshTime] = useState<number>(0);

  const fetchOPMData = async (url) => {
    const opmData = await fetchData(
      `${url}?period=${ORDERS_DURATION}&starttime=&channel=&promocode=&paymentType=&country=`,
      {}
    );
    const totalOrders = opmData.reduce(
      (acc, obj) => acc + parseInt(obj.orderCount),
      0
    );
    setTotalOPM(totalOrders);
    setAvgOPM(Math.round(totalOrders / ORDERS_DURATION));
    setLastMinOPM(opmData[opmData.length - 1]["orderCount"]);
  };

  const fetchCompData = async (url, date) => {
    const opmData = await fetchData(
      `${url}?period=${ORDERS_DURATION}&date=${date}&channel=&promocode=&paymentType=&country=`,
      {}
    );
    const totalOrders = opmData.reduce(
      (acc, obj) => acc + parseInt(obj.orderCount),
      0
    );
    setLastDayTotalOPM(totalOrders);
    setLastDayAvgOPM(Math.round(totalOrders / ORDERS_DURATION));
  };

  const getCardsData = () => {
    fetchOPMData(URL_OPM);
    const date = new Date();
    date.setDate(date.getDate() - 1);
    fetchCompData(URL_OPM, date);
    setRefreshTime(new Date().getTime());
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const handleRefreshBtnClick = () => {
    getCardsData();
  };

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(!canShow), 30000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="home-page p-6 box-border">
      <div className="flex sm:flex-row justify-between mb-4">
        <div className="flex items-center font-helvetica">
          <span className="text-lg text-[#F2F2F2] font-bold mr-4">
            Dashboard
          </span>
          {/* integrate icon */}
          <span className="text-xs text-[#8B8C8F]">
            Showing Last 60 min data
          </span>
        </div>
        <div className="flex items-center font-helvetica">
          {/* <span className="text-xs text-[#8B8C8F] mr-3">
            Last Refreshed 2 min ago
          </span> */}
          {<TimeTracker timeStamp={refreshTime} />}
          <button className="home-refresh-btn" onClick={handleRefreshBtnClick}>
            Refresh
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-[10px]">
        <HomeCard
          title={
            <CardTitle title={"Avg Orders Per Min"} icon={avg_orders_per_min} />
          }
          value={<OPMCards value={avgOPM} />}
          bgColor="#8F8E8E"
          textColor="#FFFFFF"
        />
        <HomeCard
          title={
            <CardTitle
              title={"Total Number of Orders"}
              icon={total_no_of_orders}
            />
          }
          value={<OPMCards value={totalOPM} />}
          bgColor="#BCBBBB"
          textColor="#FFFFFF"
        />
        <HomeCard
          title={<CardTitle title={"Last min OPM"} icon={last_min_opm} />}
          value={<OPMCards value={lastMinOPM} />}
          bgColor="#E9E8E8"
          textColor="#FFFFFF"
        />
        <HomeCard
          title={<CardTitle title={"Avg OPM Comparison"} icon={avg_opm_comp} />}
          value={<ComparisonCards today={avgOPM} lastDay={lastDayAvgOPM} />}
          bgColor="#CCCBCB"
          textColor="#FFFFFF"
        />
        <HomeCard
          title={
            <CardTitle
              title={"Total Order Comparison"}
              icon={total_order_comp}
            />
          }
          value={<ComparisonCards today={totalOPM} lastDay={lastDaytotalOPM} />}
          bgColor="#E9E8E8"
          textColor="#FFFFFF"
        />
      </div>
      <div className="home-opm-charts flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 mb-6">
        <OPM />
        <OpmComparison />
      </div>
    </div>
  );
};

export default HomePage;
