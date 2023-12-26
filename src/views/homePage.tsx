import { useContext, useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import OPM from "./opm";
import OpmComparison from "./opmComparison";
import Sessions from "./sessions";
import CustomButton from "../components/Button";
import CustomImage from "../components/common/customimage";
import HomeCard from "../components/common/homeCard";
import GlobalLoader from "../components/globalLoader";
import Loader from "../components/loader";
import TimeTracker from "../components/timeTracker";
import LoaderPortal from "../components/loaderPortal";
import avgOpmcompIcon from "../assets/avg_opm_comp.svg";
import avgOrdersPerMinIcon from "../assets/avg_orders_per_min.svg";
import infoIcon from "../assets/info_icon.svg";
import lastMinOpmIcon from "../assets/last_min_opm.svg";
import refreshIcon from "../assets/refresh_icon.svg";
import totalNoOfOrdersIcon from "../assets/total_no_of_orders.svg";
import totalOrderCompIcon from "../assets/total_order_comp.svg";
import trendingUpIcon from "../assets/trend_up.svg";
import trendingDownIcon from "../assets/trending_down.svg";
import { URL_OPM } from "../constants/apiConstants";
import {
  DASHBOARD_LABELS,
  PAGE_TITLES,
  SCREEN_WIDTH,
} from "../constants/appConstants";
import { LoaderContext } from "../context/loaderContext";
import { LoaderContextType } from "../@types/components/commonTypes";
import { getFormattedPSTDate } from "../utils/dateTimeUtil";
import { fetchData } from "../utils/fetchUtil";
import { FETCH_TYPES } from "../utils/Utils";

const CardTitle = (props: { title: string; icon: any; classname?: string }) => {
  const { classname = "" } = props;
  return (
    <div className={`${classname} flex justify-between`}>
      <h6>{props.title}</h6>
      <CustomImage src={props.icon} />
    </div>
  );
};

const OPMCards = (props: { value: number }) => {
  return (
    <div className="flex items-end">
      <span className="text-2xl text-gray-200">{props.value}</span>
    </div>
  );
};

const ComparisonCards = (props: { today: number; lastDay: number }) => {
  const difference = props.lastDay - props.today || 0;
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(0) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  return (
    <div className="flex">
      <div className="flex flex-col pr-1 sm:pr-2 justify-between">
        <span className="text-10">{DASHBOARD_LABELS.TODAY}</span>
        <span className="text-gray-200 text-xl">
          {kFormatter(props.today) || 0}
        </span>
      </div>
      <div className="border border-r border-black-400 h-10 m-auto"></div>
      <div className="flex flex-col px-1 sm:px-2 justify-between">
        <span className="text-10">{DASHBOARD_LABELS.LASTDAY}</span>
        <span className="text-gray-200 text-xl">
          {kFormatter(props.lastDay) || 0}
        </span>
      </div>
      <div className="border border-r border-black-400 h-10 m-auto"></div>
      <div className="flex flex-col justify-between pl-1 sm:pl-2">
        <span
          className={`${
            difference > 0
              ? "text-pink-100"
              : difference < 0
              ? "text-green-300"
              : "text-gray-400"
          } text-10`}
        >
          {DASHBOARD_LABELS.DIFFERENCE}
        </span>
        <div className="flex">
          <span
            className={`${
              difference > 0
                ? "text-pink-100"
                : difference < 0
                ? "text-green-300"
                : "text-gray-200"
            } text-xl`}
          >
            {Math.abs(difference)}
          </span>
          {difference !== 0 && (
            <CustomImage
              className="flex ml-2 w-5"
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
    LoaderContext,
  ) as LoaderContextType;

  const { width } = useScreenSize();

  const fetchOPMData = async (url, date) => {
    try {
      const opmData = await fetchData(
        `${url}?period=${
          DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION
        }&starttime=${getFormattedPSTDate(date)}`,
        {},
      );
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0,
      );
      setTotalOPM(totalOrders);
      setAvgOPM(
        Math.round(totalOrders / DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION),
      );
      setLastMinOPM(opmData[opmData.length - 1]["orderCount"]);
    } catch (err) {
      console.log("Error occured while fetching data", err);
    }
  };

  const fetchCompData = async (url, date) => {
    try {
      const opmData = await fetchData(
        `${url}?period=${
          DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION
        }&starttime=${getFormattedPSTDate(date)}`,
        {},
      );
      const totalOrders = opmData.reduce(
        (acc, obj) => acc + parseInt(obj.orderCount),
        0,
      );
      setLastDayTotalOPM(totalOrders);
      setLastDayAvgOPM(
        Math.round(totalOrders / DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION),
      );
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
    const timer = setTimeout(
      () => setCanShow(!canShow),
      DASHBOARD_LABELS.REFRESHTIME,
    );
    return () => clearTimeout(timer);
  });

  return (
    <>
      {showGlobalLoader ? (
        <LoaderPortal>
          <GlobalLoader />
        </LoaderPortal>
      ) : (
        <div className="home-page py-1 box-border">
          <div className="flex sm:flex-row justify-between mb-4">
            <div className="flex items-center font-helvetica">
              <span className="text-lg text-gray-200 font-bold mr-4">
                {PAGE_TITLES.DASHBOARD}
              </span>
              <CustomImage src={infoIcon} />
              <span className="text-xs text-gray-400 ml-2">
                Last {DASHBOARD_LABELS.HOME_PAGE_REFERSH_DURATION} min data
              </span>
            </div>
            <div className="flex items-center font-helvetica">
              {width > SCREEN_WIDTH.SM && !isLoading && (
                <TimeTracker timeStamp={refreshTime} />
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
            <Loader className="card-loader-height" />
          ) : (
            <div className="flex flex-wrap gap-2.5 pb-4 border-b border-b-black-200 card-loader-height font-helvetica">
              <HomeCard
                title={
                  <CardTitle
                    title={DASHBOARD_LABELS.AVG_ORDERS_PER_MIN}
                    icon={avgOrdersPerMinIcon}
                  />
                }
                value={<OPMCards value={avgOPM} />}
              />
              <HomeCard
                title={
                  <CardTitle
                    title={DASHBOARD_LABELS.TOTAL_NO_OF_ORDERS}
                    icon={totalNoOfOrdersIcon}
                  />
                }
                value={<OPMCards value={totalOPM} />}
              />
              <HomeCard
                title={
                  <CardTitle
                    title={DASHBOARD_LABELS.LAST_MIN_OPM}
                    icon={lastMinOpmIcon}
                    classname={"card-title"}
                  />
                }
                value={<OPMCards value={lastMinOPM} />}
              />
              <HomeCard
                title={
                  <CardTitle
                    title={DASHBOARD_LABELS.AVG_OPM_COMPARISON}
                    icon={avgOpmcompIcon}
                  />
                }
                value={
                  <ComparisonCards today={avgOPM} lastDay={lastDayAvgOPM} />
                }
              />
              <HomeCard
                title={
                  <CardTitle
                    title={DASHBOARD_LABELS.TOTAL_ORDER_COMPARISON}
                    icon={totalOrderCompIcon}
                  />
                }
                value={
                  <ComparisonCards today={totalOPM} lastDay={lastDaytotalOPM} />
                }
              />
            </div>
          )}

          <div className="home-opm-charts flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:gap-[2%] min-h-21r">
            <OPM fetchType={FETCH_TYPES.HOME} />
            <OpmComparison />
          </div>
          <Sessions />
        </div>
      )}
    </>
  );
};

export default HomePage;
