import { useContext, useEffect, useState } from "react";
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
  DASHBOARD,
  AVG_ORDERS_PER_MIN,
  TOTAL_NO_OF_ORDERS,
  LAST_MIN_OPM,
  AVG_OPM_COMPARISON,
  TOTAL_ORDER_COMPARISON,
} from "../constants/appConstants";
import useScreenSize from "../hooks/useScreenSize";
import TimeTracker from "./timeTracker";
import avgOrdersPerMinIcon from "../assets/avg_orders_per_min.svg";
import totalNoOfOrdersIcon from "../assets/total_no_of_orders.svg";
import totalOrderCompIcon from "../assets/total_order_comp.svg";
import avgOpmcompIcon from "../assets/avg_opm_comp.svg";
import lastMinOpmIcon from "../assets/last_min_opm.svg";
import trendingDownIcon from "../assets/trending_down.svg";
import trendingUpIcon from "../assets/trend_up.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import infoIcon from "../assets/info_icon.svg";
import BarChart from "./charts/BarChart";
import Loader from "./loader";
import CustomButton from "./Button";
import { LoaderContext, LoaderContextType } from "../context/loaderContext";
import GlobalLoader from "./globalLoader";
import LoaderPortal from "./loaderPortal";
import { getFormattedPSTDate } from "../utils/dateTimeUtil";

const CardTitle = ({
  title,
  icon,
  classname,
}: {
  title: string;
  icon: any;
  classname?: string;
}) => {
  return (
    <div className={`${classname} flex justify-between`}>
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
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(0) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <div className="flex">
      <div className="flex flex-col pr-1 sm:pr-2 justify-between">
        <span className="text-[10px]">{TODAY}</span>
        <span className="text-[#F2F2F2] text-xl">{kFormatter(today) || 0}</span>
      </div>
      <div className="border border-r border-[#383F47] h-[2.5rem] m-auto"></div>
      <div className="flex flex-col px-1 sm:px-2 justify-between">
        <span className="text-[10px]">{LASTDAY}</span>
        <span className="text-[#F2F2F2] text-xl">
          {kFormatter(lastDay) || 0}
        </span>
      </div>
      <div className="border border-r border-[#383F47] h-[2.5rem] m-auto"></div>
      <div className="flex flex-col justify-between pl-1 sm:pl-2">
        <span
          className={`${
            difference > 0
              ? "text-[#F16476]"
              : difference < 0
              ? "text-[#3A9F2D]"
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
                ? "text-[#3A9F2D]"
                : "text-[#F2F2F2]"
            } text-xl`}
          >
            {Math.abs(difference)}
          </span>
          {difference !== 0 && (
            <CustomImage
              className="flex ml-2"
              src={difference > 0 ? trendingDownIcon : trendingUpIcon}
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
  const { showGlobalLoader, hideLoader } = useContext(
    LoaderContext
  ) as LoaderContextType;

  const { width } = useScreenSize();

  const fetchOPMData = async (url, date) => {
    try {
      const opmData = await fetchData(
        `${url}?period=${HOME_PAGE_REFERSH_DURATION}&starttime=${getFormattedPSTDate(
          date
        )}`,
        {}
      );
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0
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
      const opmData = await fetchData(
        `${url}?period=${HOME_PAGE_REFERSH_DURATION}&starttime=${getFormattedPSTDate(
          date
        )}`,
        {}
      );
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0
      );
      setLastDayTotalOPM(totalOrders);
      setLastDayAvgOPM(Math.round(totalOrders / HOME_PAGE_REFERSH_DURATION));
    } catch (err) {
      console.log("Error occured while fetching data", err);
    }
  };

  const getCardsData = async () => {
    setIsLoading(true);
    const date = new Date();
    await fetchOPMData(URL_OPM, date);
    date.setDate(date.getDate() - 1);
    await fetchCompData(URL_OPM, date);
    await setIsLoading(false);
    await hideLoader();
    await setRefreshTime(new Date().getTime());
  };

  useEffect(() => {
    (async () => {
      await getCardsData();
    })();
  }, []);

  const handleRefreshBtnClick = () => {
    getCardsData();
  };

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(!canShow), REFRESHTIME);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {showGlobalLoader ? (
        <LoaderPortal>
          <GlobalLoader />
        </LoaderPortal>
      ) : (
        <div className="home-page p-6 box-border">
          <div className="flex sm:flex-row justify-between mb-4">
            <div className="flex items-center font-helvetica">
              <span className="text-lg text-[#F2F2F2] font-bold mr-4">
                {DASHBOARD}
              </span>
              <CustomImage src={infoIcon} />
              <span className="text-xs text-[#8B8C8F] ml-2">
                Last {HOME_PAGE_REFERSH_DURATION} min data
              </span>
            </div>
            <div className="flex items-center font-helvetica">
              {width > 700 && !isLoading && (
                <TimeTracker
                  timeStamp={refreshTime}
                />
              )}
              <CustomButton
                className="home-refresh-btn home-card-refresh-btn"
                onClick={handleRefreshBtnClick}
              >
                <CustomImage src={refreshIcon} />
              </CustomButton>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="flex flex-wrap gap-[10px] pb-4 border-b  border-b-[#22262C]"
            >
              <HomeCard
                title={
                  <CardTitle
                    title={AVG_ORDERS_PER_MIN}
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
                    title={TOTAL_NO_OF_ORDERS}
                    icon={totalNoOfOrdersIcon}
                  />
                }
                value={<OPMCards value={totalOPM} />}
                bgColor="#BCBBBB"
                textColor="#FFFFFF"
              />
              <HomeCard
                title={<CardTitle title={LAST_MIN_OPM} icon={lastMinOpmIcon} />}
                value={<OPMCards value={lastMinOPM} />}
                bgColor="#E9E8E8"
                textColor="#FFFFFF"
              />
              <HomeCard
                title={
                  <CardTitle title={AVG_OPM_COMPARISON} icon={avgOpmcompIcon} />
                }
                value={
                  <ComparisonCards today={avgOPM} lastDay={lastDayAvgOPM} />
                }
                bgColor="#CCCBCB"
                textColor="#FFFFFF"
              />
              <HomeCard
                title={
                  <CardTitle
                    title={TOTAL_ORDER_COMPARISON}
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

          <div className="home-opm-charts flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:gap-[2%]">
            <OPM />
            <OpmComparison />
          </div>
          <BarChart />
        </div>
      )}
    </>
  );
};

export default HomePage;
