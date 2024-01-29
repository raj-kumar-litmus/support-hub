import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import { MicroserviceHealth } from "../../@types/components/commonTypes";
import FilterIcon from "../../assets/expand.svg";
import { URL_FOCUS_ROOM_MICROSERVICE_HEALTH } from "../../helpers/constants/apiConstants";
import {
  FOCUS_ROOM_LABELS,
  REFRESH_TIME_INTERVAL_FOCUS_ROOM,
} from "../../helpers/constants/appConstants";
import { fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import CustomImage from "../atoms/CustomImage";
import Loader from "../atoms/Loader";
import MicroServiceDoughNuts from "../molecules/MicroServiceDoughNuts";
import MicroServicesPopUp from "../molecules/MicroServicesPopUp";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";

const MicroservicesWidget = () => {
  const [filteredMicroServices, setFilteredMicroServices] = useState(null);
  const [microServices, setMicroServices] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  const BACK_END_DOMAIN_NAME: string = `${
    import.meta.env.VITE_FOCUSROOM_BASEURL
  }`;
  const [showPopUp, setShowPopUp] = useState(false);
  const [msCount, setMsCount] = useState(0);
  const [overLayData, setOverLayData] = useState<any>(null);

  const onPopUpHideHandler = () => {
    setShowPopUp(false);
    setSearchResult(null);
    setFilteredMicroServices(sortMicroServices(microServices));
  };

  const sortMicroServices = (MS_HEALTH: MicroserviceHealth[]) => {
    const reducedMs = MS_HEALTH.reduce(
      (acc, e) => {
        acc[e.cpu === 0 || e.memory === 0 ? "dead" : "alive"].push(e);
        return acc;
      },
      { dead: [], alive: [] },
    );
    return [
      ...reducedMs.dead,
      ...reducedMs.alive.sort((a, b) => b.goldenSignal - a.goldenSignal),
    ];
  };

  const fetchMicroServices = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFocusRoomData(
        URL_FOCUS_ROOM_MICROSERVICE_HEALTH,
        {},
      );
      if (Array.isArray(data?.results?.services)) {
        setMicroServices(sortMicroServices(data?.results?.services));
      }
    } catch (err) {
      console.log("Error while fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMicroServices();
    const intervalId = setInterval(() => {
      fetchMicroServices();
    }, REFRESH_TIME_INTERVAL_FOCUS_ROOM.ONE_MIN);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setMsCount(filteredMicroServices?.length || 0);
  }, [filteredMicroServices]);

  useEffect(() => {
    if (searchResult && showPopUp && Array.isArray(microServices)) {
      setFilteredMicroServices(
        sortMicroServices(
          microServices.filter(
            (e) =>
              e.serviceInfo.name
                .toLowerCase()
                .includes(searchResult.toLowerCase()) ||
              e.serviceInfo.instance
                .toLowerCase()
                .includes(searchResult.toLowerCase()),
          ),
        ),
      );
    }
    if (showPopUp && !searchResult) {
      setFilteredMicroServices(sortMicroServices(microServices));
    }
    if (!searchResult && Array.isArray(microServices)) {
      setFilteredMicroServices(sortMicroServices(microServices));
    }
  }, [searchResult, showPopUp, microServices]);

  return (
    <div className="focus-room-widget-wrapper">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="flex gap-5 items-center h-25 font-IBM px-1w py-2h">
            <p className="font-bold text-10">
              {FOCUS_ROOM_LABELS.MICRO_SERVICES}
            </p>
            <p className="text-green-501 text-8 before:inline-block before:content-[''] before:h-5p before:w-5p before:bg-green-501 before:rounded-full before:align-middle before:relative before:right-5p before:bottom-px">
              {FOCUS_ROOM_LABELS.CPU}
            </p>
            <p className="text-pink-300 text-8 before:inline-block before:content-[''] before:h-5p before:w-5p before:bg-pink-300 before:rounded-full before:align-middle before:relative before:right-5p before:bottom-px">
              {FOCUS_ROOM_LABELS.MEMORY}
            </p>
            <div className="group cursor-pointer ml-auto">
              <CustomImage
                className="invisible group-hover:visible "
                src={FilterIcon}
                onClick={() => setShowPopUp(true)}
              />
            </div>
          </div>
          {showPopUp && Array.isArray(filteredMicroServices) && (
            <MicroServicesPopUp
              msCount={msCount}
              searchResult={searchResult}
              setSearchResult={(e) => setSearchResult(e.target.value)}
              setShowPopUp={(e) => setShowPopUp(e)}
              onPopUpHideHandler={onPopUpHideHandler}
              showPopUp={showPopUp}
              setOverLayData={setOverLayData}
              op={op}
              microservices={filteredMicroServices}
            />
          )}
          <div className="microServices-doughnut-container overflow-scroll">
            {Array.isArray(filteredMicroServices) &&
              filteredMicroServices.length > 0 && (
                <MicroServiceDoughNuts
                  isPopUp={false}
                  setOverLayData={setOverLayData}
                  op={op}
                  microservices={filteredMicroServices}
                />
              )}
          </div>
          {
            <CustomOverlayFocusRoom
              ref={op}
              header={overLayData && overLayData.title}
              subHeader={
                <div className="flex pt-2.5 align-center items-center">
                  <p className="text-sm">{FOCUS_ROOM_LABELS.POD}</p>
                  <div className="flex align-center items-center ml-2.5 px-5p border border-1 border-white rounded rounded-xl">
                    <p>
                      {overLayData?.activePods}/{overLayData?.totalPods || 0}
                    </p>
                    <CustomImage
                      className="w-3.5 pl-3p"
                      src={FilterIcon}
                      onClick={() => {}} // todo. for demo 2.
                    />
                  </div>
                </div>
              }
              columns={2}
              boxContent={[
                {
                  boxClass: "border-green-500",
                  title: FOCUS_ROOM_LABELS.CPU,
                  data: overLayData?.cpu && overLayData?.cpu?.toFixed(1),
                },
                {
                  boxClass: "border-yellow-500",
                  title: FOCUS_ROOM_LABELS.MEMORY,
                  data: overLayData?.memory && overLayData?.memory?.toFixed(1),
                },
                {
                  boxClass: "border-gray-109",
                  title: FOCUS_ROOM_LABELS.TRAFFIC,
                  data:
                    overLayData?.traffic && overLayData?.traffic?.toFixed(1),
                },
                {
                  boxClass: "border-gray-109",
                  title: FOCUS_ROOM_LABELS.ERRORS,
                  data:
                    overLayData?.errorRate &&
                    overLayData?.errorRate?.toFixed(1),
                },
              ]}
              buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
            />
          }
        </>
      )}
    </div>
  );
};
export default MicroservicesWidget;
