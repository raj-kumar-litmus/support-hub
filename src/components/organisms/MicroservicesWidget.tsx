import { useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { MicroserviceHealth } from "../../@types/components/commonTypes";
import { fetchData, fetchFocusRoomData } from "../../helpers/utils/fetchUtil";
import FilterIcon from "../../assets/expand.svg";
import CustomImage from "../atoms/CustomImage";
import MicroServicesPopUp from "../molecules/MicroServicesPopUp";
import { FOCUS_ROOM_LABELS } from "../../helpers/constants/appConstants";
import CustomOverlayFocusRoom from "../molecules/OverlayFocusRoom";
import MicroServiceDoughNuts from "../molecules/MicroServiceDoughNuts";
import { URL_FOCUS_ROOM_MICROSERVICE_HEALTH } from "../../helpers/constants/apiConstants";

const MicroservicesWidget = () => {
  const [filteredMicroServices, setFilteredMicroServices] = useState(null);
  const [microServices, setMicroServices] = useState(null);
  const [searchResult, setSearchResult] = useState("");
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

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFocusRoomData(
          URL_FOCUS_ROOM_MICROSERVICE_HEALTH,
          {},
        );
        if (Array.isArray(data?.results?.services)) {
          setMicroServices(sortMicroServices(data?.results?.services));
        }
      } catch (err) {
        console.log("Error while fetching data: ", err);
      }
    })();
  }, []);

  useEffect(() => {
    setMsCount(filteredMicroServices?.length || 0);
  }, [filteredMicroServices]);

  useEffect(() => {
    if (searchResult && showPopUp && Array.isArray(microServices)) {
      setFilteredMicroServices(
        sortMicroServices(
          microServices.filter((e) =>
            e.serviceInfo.name.includes(searchResult),
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
      <div className="flex gap-[20px] items-center h-[25px] font-IBM px-[1vw] py-[2vh]">
        <p className="font-bold text-10">{FOCUS_ROOM_LABELS.MICRO_SERVICES}</p>
        <p className="text-green-501 text-8 before:inline-block before:content-[''] before:h-[5px] before:w-[5px] before:bg-green-501 before:rounded-full before:align-middle before:relative before:right-[5px] before:bottom-[1px]">
          {FOCUS_ROOM_LABELS.CPU}
        </p>
        <p className="text-pink-300 text-8 before:inline-block before:content-[''] before:h-[5px] before:w-[5px] before:bg-pink-300 before:rounded-full before:align-middle before:relative before:right-[5px] before:bottom-[1px]">
          {FOCUS_ROOM_LABELS.Memory}
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
            <div className="flex pt-[10px] align-center items-center">
              <p className="text-sm">{FOCUS_ROOM_LABELS.POD}</p>
              <div className="flex align-center items-center ml-[10px] px-[5px] border border-1 border-white rounded rounded-xl">
                <p>
                  {overLayData?.activePods}/{overLayData?.totalPods || 0}
                </p>
                <CustomImage
                  className="w-[14px] pl-[3px]"
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
              title: "CPU",
              data: overLayData?.cpu && overLayData?.cpu?.toFixed(1),
            },
            {
              boxClass: "border-yellow-500",
              title: "Memory",
              data: overLayData?.memory && overLayData?.memory?.toFixed(1),
            },
            {
              boxClass: "border-gray-109",
              title: "Traffic",
              data: overLayData?.traffic && overLayData?.traffic?.toFixed(1),
            },
            {
              boxClass: "border-gray-109",
              title: "Errors",
              data: overLayData?.errors && overLayData?.errors?.toFixed(1),
            },
          ]}
          buttonContent={FOCUS_ROOM_LABELS.VIEW_DETAILS}
        />
      }
    </div>
  );
};
export default MicroservicesWidget;
