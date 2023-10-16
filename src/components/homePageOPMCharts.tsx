import HomeOPM from "./charts/homeOPM";
import HomeOPMComp from "./charts/homeOPMComp";

const HomePageOPM = () => {
  return (
    <div className="home-opm-charts flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 mb-6">
      <HomeOPM />
      <HomeOPMComp />
    </div>
  );
};

export default HomePageOPM;
