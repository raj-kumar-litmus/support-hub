import HomeCard from "./common/homeCard";
import CustomImage from "./common/customimage";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import avg_orders_per_min from "../assets/avg_orders_per_min.svg";
import total_no_of_orders from "../assets/total_no_of_orders.svg";
import total_order_comp from "../assets/total_order_comp.svg";
import avg_opm_comp from "../assets/avg_opm_comp.svg";
import trending_down from "../assets/trending_down.svg";

const CardTitle = ({ title, icon }) => {
  return (
    <div className="flex justify-between">
      <h6>{title}</h6>
      <CustomImage src={icon} />
    </div>
  );
};

const CardValue1 = ({ value, time }) => {
  return (
    <div className="flex items-end">
      <span className="text-2xl text-[#F2F2F2]">{value}</span>
      <div className="border rounded-lg border-[#383F47] text-white text-[10px] h-fit p-1 ml-3">
        Last {time} min
      </div>
    </div>
  );
};

const CardValue2 = ({}) => {
  return (
    <div className="flex">
      <div className="flex flex-col pr-4 justify-between">
        <span className="text-[10px]">Today</span>
        <span className="text-[#F2F2F2] text-2xl">38</span>
      </div>
      <div className="flex flex-col pr-4 justify-between">
        <span className="text-[10px]">Last Day</span>
        <span className="text-[#F2F2F2] text-2xl">38</span>
      </div>
      <div className="flex flex-col pr-4 justify-between">
        <span className="text-[10px] text-[#F16476]">Difference</span>
        <div className="flex">
          <span className="text-[#F2F2F2] text-[#F16476] text-2xl">38</span>
          <CustomImage className="flex ml-2" src={trending_down} />
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="home-page p-6 box-border">
      <div className="flex flex-wrap gap-[10px]">
        <HomeCard
          title={
            <CardTitle title={"Avg Orders Per Min"} icon={avg_orders_per_min} />
          }
          value={<CardValue1 value={35} time={"15"} />}
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
          value={<CardValue1 value={38} time={"15"} />}
          bgColor="#BCBBBB"
          textColor="#FFFFFF"
        />
        <HomeCard
          title={<CardTitle title={"Avg OPM Comparison"} icon={avg_opm_comp} />}
          value={<CardValue2 />}
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
          value={<CardValue2 />}
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
