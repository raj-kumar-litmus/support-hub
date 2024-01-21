import BarChart from "../molecules/BarChart";
import { STACKED_OPM_FOCUSROOM } from "../../helpers/config/chartConfig";
import { PAGE_TITLES } from "../../helpers/constants/appConstants";

const OpmTimeSeriesWidget = () => {
  const data = {
    labels: [
      "10:00",
      "10:01",
      "10:02",
      "10:03",
      "10:04",
      "10:05",
      "10:06",
      "10:07",
      "10:08",
      "10:09",
      "10:10",
      "10:11",
      "10:12",
      "10:13",
      "10:14",
      "10:15",
      "10:16",
      "10:17",
      "10:18",
      "10:19",
      "10:20",
      "10:21",
      "10:22",
      "10:23",
      "10:24",
      "10:25",
      "10:26",
      "10:27",
      "10:28",
      "10:29",
      "10:30",
    ],
    datasets: [
      {
        label: "Desktop",
        backgroundColor: "#5F4B8B",
        data: [
          17, 16, 10, 11, 8, 9, 15, 5, 9, 13, 15, 17, 16, 10, 11, 8, 9, 15, 5,
          9, 13, 15, 17, 16, 10, 11, 8, 9, 15, 5, 9, 13, 15,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
      {
        label: "iPhone App",
        backgroundColor: "#EC935F",
        data: [
          14, 9, 10, 8, 12, 16, 20, 13, 2, 14, 18, 14, 9, 10, 8, 12, 16, 20, 13,
          2, 14, 18, 14, 9, 10, 8, 12, 16, 20, 13, 2, 14, 18,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
      {
        label: "Web",
        backgroundColor: "#A8C696",
        data: [
          12, 21, 13, 9, 24, 17, 6, 14, 8, 10, 12, 12, 21, 13, 9, 24, 17, 6, 14,
          8, 10, 12, 12, 21, 13, 9, 24, 17, 6, 14, 8, 10, 12,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
      {
        label: "Android",
        backgroundColor: "#00A18A",
        data: [
          14, 9, 10, 8, 2, 16, 3, 9, 11, 16, 14, 9, 10, 8, 2, 16, 3, 9, 11, 16,
          14, 9, 10, 8, 2, 16, 3, 9, 11, 16,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
      {
        label: "CSC",
        backgroundColor: "#0279A8",
        data: [
          2, 1, 23, 9, 14, 7, 17, 19, 20, 5, 11, 2, 1, 23, 9, 14, 7, 17, 19, 20,
          5, 11, 2, 1, 23, 9, 14, 7, 17, 19, 20, 5, 11,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
      {
        label: "Others",
        backgroundColor: "#6E8A9E",
        data: [
          12, 2, 13, 19, 24, 7, 2, 1, 4, 6, 4, 12, 2, 13, 19, 24, 7, 2, 1, 4, 6,
          4, 12, 2, 13, 19, 24, 7, 2, 1, 4, 6, 4,
        ],
        borderWidth: 3,
        barThickness: 20,
      },
    ],
  };
  return (
    <div className="bg-black-106 border border-black-108 rounded-12 h-full relative">
      <div className="font-IBM font-bold text-10 text-white-900 w-fit absolute top-2 left-2">
        {PAGE_TITLES.OPM}
      </div>
      <BarChart
        data={data}
        options={STACKED_OPM_FOCUSROOM}
        title="OPM"
        plugin={""}
        className="bg-black-106 px-6 pt-2 pb-0 rounded-xl h-48"
        defaultClasses={true}
      />
    </div>
  );
};
export default OpmTimeSeriesWidget;
