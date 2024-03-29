import NotificationWidget from "../components/atoms/NotificationWidget";
import ApiWidget from "../components/organisms/ApiWidget";
import BopisWidget from "../components/organisms/BopisWidget";
import CancellationWidget from "../components/organisms/CancellationWidget";
import DatabaseWidget from "../components/organisms/DatabaseWidget";
import KafkaWidget from "../components/organisms/KafkaWidget";
import MicroservicesWidget from "../components/organisms/MicroservicesWidget";
import OmsWidget from "../components/organisms/OmsWidget";
import OpmTimeSeriesWidget from "../components/organisms/OpmTimeSeriesWidget";
import OpmWidget from "../components/organisms/OpmWidget";
import SalesWidget from "../components/organisms/SalesWidget";
import SddWidget from "../components/organisms/SddWidget";
import SkuInventoryWidget from "../components/organisms/SkuInventoryWidget";
import UfeWidget from "../components/organisms/UfeWidget";
import VendorsWidget from "../components/organisms/VendorsWidget";

import { FocusRoomProvider } from "../context/focusRoom";

const FocusRoom = () => {
  return (
    <FocusRoomProvider>
      <div className="grid grid-cols-3 gap-y-1.5h gap-x-0.6w">
        <div className="space-y-1.5h">
          <div className="h-[32.8vh]">
            <OpmWidget />
          </div>
          <div className="h-[13.8vh]">
            <SalesWidget />
          </div>
          <div className="h-14.2h">
            <BopisWidget />
          </div>
          <div className="h-14.2h">
            <SddWidget />
          </div>
          <div className="h-11h">
            <VendorsWidget />
          </div>
        </div>
        <div className="col-span-2 space-y-1.5h">
          <div className="h-[29.8vh]">
            <div className="absolute top-4h right-2.3w h-[7.5vh] w-[4.2vw] flex justify-end bg-black-109 border-b border-l border-black-108 rounded-bl-2xl pb-1.5h pl-0.6w">
              <NotificationWidget />
            </div>
            <OpmTimeSeriesWidget />
          </div>

          <div className="grid grid-cols-2 gap-y-1.5h gap-x-0.6w">
            <div className="space-y-1.5h">
              <div className="h-[22.9vh]">
                <OmsWidget />
              </div>
              <div className="h-[36.3vh]">
                <MicroservicesWidget />
              </div>
            </div>
            <div className="space-y-1.5h">
              <div className="h-11h">
                <CancellationWidget />
              </div>
              <div className="h-11h">
                <KafkaWidget />
              </div>
              <div className="grid grid-cols-2 gap-y-1.5h gap-x-0.6w h-[13.1vh]">
                <ApiWidget />
                <UfeWidget />
              </div>
              <div className="h-11h">
                <DatabaseWidget />
              </div>
              <div className="h-[8.6vh]">
                <SkuInventoryWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusRoomProvider>
  );
};

export default FocusRoom;
