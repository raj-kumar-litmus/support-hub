import ApiWidget from "../components/organisms/ApiWidget";
import BopisWidget from "../components/organisms/BopisWidget";
import CancellationWidget from "../components/organisms/CancellationWidget";
import DatabaseWidget from "../components/organisms/DatabaseWidget";
import KafkaWidget from "../components/organisms/KafkaWidget";
import MicroservicesWidget from "../components/organisms/MicroservicesWidget";
import OmsWidget from "../components/organisms/OmsWidget";
import OpmTimeSeriesWidget from "../components/organisms/OpmTimeSeriesWidget";
import OpmWidget from "../components/organisms/OpmWidget";
import SddWidget from "../components/organisms/SddWidget";
import SalesWidget from "../components/organisms/SalesWidget";
import SkuInventoryWidget from "../components/organisms/SkuInventoryWidget";
import UfeWidget from "../components/organisms/UfeWidget";
import VendorsWidget from "../components/organisms/VendorsWidget";

const FocusRoom = () => {
  return (
    <div className="grid grid-cols-3 gap-2 xl:gap-3">
      <div className="space-y-2 xl:space-y-3">
        <div className="h-[32.8vh]">
          <OpmWidget />
        </div>
        <div className="h-[13.4vh]">
          <SalesWidget />
        </div>
        <div className="h-[14.2vh]">
          <BopisWidget />
        </div>
        <div className="h-[14.2vh]">
          <SddWidget />
        </div>
        <div className="h-[11vh]">
          <VendorsWidget />
        </div>
      </div>
      <div className="col-span-2 space-y-2 xl:space-y-3">
        <div className="h-[29.8vh]">
          <OpmTimeSeriesWidget />
        </div>

        <div className="grid grid-cols-2 gap-2 xl:gap-3">
          <div className="space-y-2 xl:space-y-3">
            <div className="h-[22.9vh]">
              <OmsWidget />
            </div>
            <div className="h-[35.8vh]">
              <MicroservicesWidget />
            </div>
          </div>
          <div className="space-y-2 xl:space-y-3">
            <div className="h-[11vh]">
              <CancellationWidget />
            </div>
            <div className="h-[11vh]">
              <KafkaWidget />
            </div>
            <div className="grid grid-cols-2 gap-2 xl:gap-3 h-[13.1vh]">
              <ApiWidget />
              <UfeWidget />
            </div>
            <div className="h-[11vh]">
              <DatabaseWidget />
            </div>
            <div className="h-[8vh]">
              <SkuInventoryWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusRoom;
