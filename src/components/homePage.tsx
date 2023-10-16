import HomeCard from "./common/homeCard";
import HomeSessionsChart from "./charts/homeSessionsChart";
import graphIcon from "../assets/graph.svg";
import total_no_of_orders from "../assets/total_no_of_orders.svg";
import total_order_comp from "../assets/total_order_comp.svg";
import avg_opm_comp from "../assets/avg_opm_comp.svg";
import HomePageOPMCharts from "./homePageOPMCharts";
import CustomImage from "./common/customimage";
import BarChart from "./charts/BarChart";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";

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
      <span className="text-2xl">{value}</span>
      <div className="border rounded-lg border-[#FFFFFF] text-[10px] h-fit p-1 ml-3">
        Last {time} min
      </div>
    </div>
  );
};

const CardValue2 = ({ title, icon }) => {
  return <div className="flex"></div>;
};

const HomePage = () => {
  return (
    <div className="home-page p-6 box-border">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="home-card flex space-x-4">
          <HomeCard
            title={<CardTitle title={"Avg Orders Per Min"} icon={graphIcon} />}
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
        </div>
        <div className="home-card flex space-x-4">
          <HomeCard
            title={
              <CardTitle title={"Avg OPM Comparison"} icon={avg_opm_comp} />
            }
            value={38}
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
            value={38}
            bgColor="#E9E8E8"
            textColor="#FFFFFF"
          />
        </div>
      </div>
      {/* <HomePageOPMCharts /> */}
      {/* <HomeSessionsChart /> */}
      <div className="home-opm-charts flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 mb-6">
        <OPM />
        <OpmComparison />
      </div>
      <BarChart />
    </div>
  );
};

export default HomePage;
