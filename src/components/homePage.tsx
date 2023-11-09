import { useEffect, useState } from "react";
import HomeCard from "./common/homeCard";
import CustomImage from "./common/customimage";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import { URL_OPM } from "../constants/apiConstants";
import { fetchData } from "../utils/fetchUtil";
import {
  HOME_PAGE_REFERSH_DURATION,
  LASTDAY,
  TODAY,
  DIFFERENCE,
  REFRESHTIME,
} from "../constants/appConstants";
import useScreenSize from "../hooks/useScreenSize";
import TimeTracker from "./timeTracker";
import avgOrdersPerMinIcon from "../assets/avg_orders_per_min.svg";
import totalNoOfOrdersIcon from "../assets/total_no_of_orders.svg";
import totalOrderCompIcon from "../assets/total_order_comp.svg";
import avgOpmcompIcon from "../assets/avg_opm_comp.svg";
import lastMinOpmIcon from "../assets/last_min_opm.svg";
import trendingDownIcon from "../assets/trending_down.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import infoIcon from "../assets/info_icon.svg";
import BarChart from "./charts/BarChart";
import Loader from "./loader";
import CustomButton from "./Button";

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
  const difference = lastDay - today || 0;
  return (
    <div className="flex">
      <div className="flex flex-col pr-1 sm:pr-2 justify-between">
        <span className="text-[10px]">{TODAY}</span>
        <span className="text-[#F2F2F2] text-xl">{today}</span>
      </div>
      <div className="border border-r border-[#383F47] h-[2.5rem] m-auto"></div>
      <div className="flex flex-col px-1 sm:px-2 justify-between">
        <span className="text-[10px]">{LASTDAY}</span>
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
          {DIFFERENCE}
        </span>
        <div className="flex">
          <span
            className={`${
              difference > 0
                ? "text-[#F16476]"
                : difference < 0
                ? "text-[#5CB7ED]"
                : "text-[#F2F2F2]"
            } text-xl`}
          >
            {difference}
          </span>
          {difference !== 0 && (
            <CustomImage
              className="flex ml-2"
              src={difference > 0 ? trendingDownIcon : trendingDownIcon} // need to change to up icon
            />
          )}
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { width } = useScreenSize();

  const fetchOPMData = async (url) => {
    try {
      setIsLoading(true);
      const opmData = await fetchData(
        `${url}?period=${HOME_PAGE_REFERSH_DURATION}`,
        {},
      );
      setIsLoading(false);
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0,
      );
      setTotalOPM(totalOrders);
      setAvgOPM(Math.round(totalOrders / HOME_PAGE_REFERSH_DURATION));
      setLastMinOPM(opmData[opmData.length - 1]["orderCount"]);
    } catch (err) {
      console.log("Error occured while fetching data", err);
    }
  };

  const fetchCompData = async (url, date) => {
    try {
      setIsLoading(true);
      const opmData = await fetchData(
        `${url}?period=${HOME_PAGE_REFERSH_DURATION}&date=${date}`,
        {},
      );
      setIsLoading(false);
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0,
      );
      setLastDayTotalOPM(totalOrders);
      setLastDayAvgOPM(Math.round(totalOrders / HOME_PAGE_REFERSH_DURATION));
    } catch (err) {
      console.log("Error occured while fetching data", err);
    }
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
    const timer = setTimeout(() => setCanShow(!canShow), REFRESHTIME);
    return () => clearTimeout(timer);
  });

  return (
    <div className="home-page p-6 box-border">
      <div className="flex sm:flex-row justify-between mb-4">
        <div className="flex items-center font-helvetica">
          <span className="text-lg text-[#F2F2F2] font-bold mr-4">
            Dashboard
          </span>
          <CustomImage src={infoIcon} />
          <span className="text-xs text-[#8B8C8F] ml-2">
            Last {HOME_PAGE_REFERSH_DURATION} min data
          </span>
        </div>
        <div className="flex items-center font-helvetica">
          {width > 700 && <TimeTracker timeStamp={refreshTime} />}
          <CustomButton
            className="home-refresh-btn"
            onClick={handleRefreshBtnClick}
          >
            <CustomImage src={refreshIcon} />
          </CustomButton>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-[10px]">
          <HomeCard
            title={
              <CardTitle
                title={"Avg Orders Per Min"}
                icon={avgOrdersPerMinIcon}
              />
            }
            value={<OPMCards value={avgOPM} />}
            bgColor="#8F8E8E"
            textColor="#FFFFFF"
          />
          <HomeCard
            title={
              <CardTitle
                title={"Total Number of Orders"}
                icon={totalNoOfOrdersIcon}
              />
            }
            value={<OPMCards value={totalOPM} />}
            bgColor="#BCBBBB"
            textColor="#FFFFFF"
          />
          <HomeCard
            title={<CardTitle title={"Last min OPM"} icon={lastMinOpmIcon} />}
            value={<OPMCards value={lastMinOPM} />}
            bgColor="#E9E8E8"
            textColor="#FFFFFF"
          />
          <HomeCard
            title={
              <CardTitle title={"Avg OPM Comparison"} icon={avgOpmcompIcon} />
            }
            value={<ComparisonCards today={avgOPM} lastDay={lastDayAvgOPM} />}
            bgColor="#CCCBCB"
            textColor="#FFFFFF"
          />
          <HomeCard
            title={
              <CardTitle
                title={"Total Order Comparison"}
                icon={totalOrderCompIcon}
              />
            }
            value={
              <ComparisonCards today={totalOPM} lastDay={lastDaytotalOPM} />
            }
            bgColor="#E9E8E8"
            textColor="#FFFFFF"
          />
        </div>
      )}

      <div className="home-opm-charts flex flex-col mt-6 sm:mt-0 sm:flex-row sm:space-y-0 sm:space-x-4">
        <OPM />
        <OpmComparison />
      </div>
      <BarChart />
    </div>
  );
};

export default HomePage;
