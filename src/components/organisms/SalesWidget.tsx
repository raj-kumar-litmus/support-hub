import { toUpper } from "lodash";
import { OverlayPanel } from "primereact/overlaypanel";
import { useContext, useEffect, useRef, useState } from "react";

import { FocusRoomContext } from "../../context/focusRoom";
import ChartLegend from "../atoms/ChartLegend";
import LinearGauge from "../atoms/LinearGauge";
import Loader from "../atoms/Loader";
import GridCards from "../molecules/GridCards";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

import { URL_FOCUS_ROOM_SALES_DATA } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_SALES_OVERLAY_CONETENT_DECIDER,
  FOCUS_ROOM_SALES_OVERLAY_HEADER_SUFFIX,
  FOCUS_ROOM_TITLES,
  REFRESH_TIME_INTERVAL_FOCUS_ROOM,
} from "../../helpers/constants/appConstants";

import {
  CustomOverlayProps,
  FocusRoomContextType,
  GridData,
  OverlayBox,
} from "../../@types/components/commonTypes";

import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import { numberWithCommas } from "../../helpers/utils/utils";

const SalesWidget = () => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;
  const op = useRef<OverlayPanel>(null);
  const [salesData, setSalesData] = useState<GridData>(null);
  const [salesNames, setSalesNames] = useState<[]>([]);
  const [mappedSalesNames, setMappedSalesNames] = useState<OverlayBox>();
  const [overlayData, setOverlayData] = useState<CustomOverlayProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.sales?.results)) {
      setSalesNames(focusRoomConfig.sales?.results);
    }
  }, [focusRoomConfig]);

  const mapSalesData = (data, names) => {
    return (
      Array.isArray(names) &&
      names.map(({ shortName, description }) => {
        return {
          title: shortName,
          data: data[description]?.total,
          description: description,
        };
      })
    );
  };

  const getData = async () => {
    try {
      const data = await fetchFocusRoomData(URL_FOCUS_ROOM_SALES_DATA, {});
      setSalesData(data?.results);
    } catch (err) {
      console.log("Error while fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
    const intervalId = setInterval(() => {
      setIsLoading(true);
      getData();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.FIFTEEN_MINS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (salesData && salesNames) {
      setMappedSalesNames(mapSalesData(salesData, salesNames));
    }
  }, [salesNames, salesData]);
  const findOverlayData = (description, data) => {
    const keys = Object.keys(data);

    for (const key of keys) {
      if (key === description) {
        return salesData[key];
      }
    }
    return null;
  };

  const handleTitleClick = (e, d) => {
    const partialOVerlayData = findOverlayData(d.description, salesData);
    switch (d.description) {
      case FOCUS_ROOM_SALES_OVERLAY_CONETENT_DECIDER.TOTAL_FORECAST:
        setOverlayData({
          ...partialOVerlayData,
          legendOne: `${Object.keys(salesData?.totalForecast)[2]}`,
          legendTwo: `${Object.keys(salesData?.totalForecast)[1]}`,
          suffix: FOCUS_ROOM_SALES_OVERLAY_HEADER_SUFFIX.USD,
        });
        break;

      case FOCUS_ROOM_SALES_OVERLAY_CONETENT_DECIDER.TOTAL_SALES:
        setOverlayData({
          ...partialOVerlayData,
          legendOne: `${Object.keys(salesData?.totalSales)[2]} SALES`,
          legendTwo: `${Object.keys(salesData?.totalSales)[1]} SALES`,
          suffix: FOCUS_ROOM_SALES_OVERLAY_HEADER_SUFFIX.USD,
        });

        break;

      case FOCUS_ROOM_SALES_OVERLAY_CONETENT_DECIDER.TOTAL_ORDERS:
        setOverlayData({
          ...partialOVerlayData,
          legendOne: Object.keys(salesData?.totalOrders)[2],
          legendTwo: Object.keys(salesData?.totalOrders)[1],
        });
        break;

      case FOCUS_ROOM_SALES_OVERLAY_CONETENT_DECIDER.AVERAGE_ORDER_VALUE:
        setOverlayData({
          ...partialOVerlayData,
          legendOne: `${Object.keys(salesData?.avgOrder)[2]} AOV`,
          legendTwo: `${Object.keys(salesData?.avgOrder)[1]} AOV`,
          suffix: FOCUS_ROOM_SALES_OVERLAY_HEADER_SUFFIX.USD,
        });
        break;
    }

    op.current?.toggle(e);
  };

  return (
    <div className="focus-room-widget-wrapper px-4 pt-1 pb-4">
      {mappedSalesNames && !isLoading && (
        <GridCards
          title={FOCUS_ROOM_TITLES.SALES}
          columns={4}
          data={mappedSalesNames}
          lastUpdatedTime={salesData?.lastUpdated}
          dataClassName="text-sm font-IBM"
          onClick={handleTitleClick}
          formatNumber
        />
      )}

      <CustomOverlayFocusRoom ref={op}>
        <>
          <div className="text-center font-IBM">
            <div className="text-xl">
              {numberWithCommas(overlayData?.total)}{" "}
              {overlayData?.suffix && (
                <span className="text-sm">{overlayData?.suffix}</span>
              )}{" "}
            </div>
            {overlayData && (
              <LinearGauge
                containerClassName="flex mt-2 items-center w-40 text-10"
                height="13px"
                propOne={overlayData.us}
                propTwo={overlayData.ca}
                bgColorOne="bg-red-500"
                bgColorTwo="bg-blue-300"
                formatter
              />
            )}
          </div>

          <div className="flex items-center justify-center mt-2.5 gap-3">
            <ChartLegend
              text={toUpper(overlayData?.legendOne)}
              circleColor="bg-red-500"
              containerClassName={"text-red-500"}
            />
            <ChartLegend
              text={toUpper(overlayData?.legendTwo)}
              circleColor={"bg-blue-500"}
              containerClassName={"text-blue-500"}
            />
          </div>
        </>
      </CustomOverlayFocusRoom>
      {isLoading && <Loader />}
    </div>
  );
};

export default SalesWidget;
