import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { OpmData, Options } from "../@types/todo";

import LineChart from "../components/LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const OpmComparison: React.FC = () => {
  const [options, setOptions] = useState<Options>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "OPM Comparison",
      },
    },
  });

  const [data, setData] = useState<OpmData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const getData = async () => {
    try {
      await fetch(
        `http://azruvuprep01:8080/supportdashboard/compareOPM?period=10&startTimeOne=2023-09-17T12:57&startDateTwo=09/16/2023&channel=`,
      );
    } catch (err) {
      const apiRespnose = {
        opmOne: [
          {
            timestamp: "12:57",
            orderCount: "111",
          },
          {
            timestamp: "12:58",
            orderCount: "143",
          },
          {
            timestamp: "12:59",
            orderCount: "116",
          },
          {
            timestamp: "13:00",
            orderCount: "138",
          },
          {
            timestamp: "13:01",
            orderCount: "119",
          },
          {
            timestamp: "13:02",
            orderCount: "130",
          },
          {
            timestamp: "13:03",
            orderCount: "112",
          },
          {
            timestamp: "13:04",
            orderCount: "120",
          },
          {
            timestamp: "13:05",
            orderCount: "108",
          },
          {
            timestamp: "13:06",
            orderCount: "132",
          },
        ],
        opmTwo: [
          {
            timestamp: "12:57",
            orderCount: "94",
          },
          {
            timestamp: "12:58",
            orderCount: "105",
          },
          {
            timestamp: "12:59",
            orderCount: "114",
          },
          {
            timestamp: "13:00",
            orderCount: "142",
          },
          {
            timestamp: "13:01",
            orderCount: "113",
          },
          {
            timestamp: "13:02",
            orderCount: "103",
          },
          {
            timestamp: "13:03",
            orderCount: "106",
          },
          {
            timestamp: "13:04",
            orderCount: "122",
          },
          {
            timestamp: "13:05",
            orderCount: "127",
          },
          {
            timestamp: "13:06",
            orderCount: "113",
          },
        ],
      };
      setData({
        labels: apiRespnose["opmOne"].map((e) => e.timestamp),
        datasets: Object.keys(apiRespnose).map((e, index) => ({
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          label: Object.keys(apiRespnose)[index], // @ts-ignore
          data: apiRespnose[e].map((e) => Number(e.orderCount)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        })),
      });
    }
  };

  useEffect(() => {
    (async () => {
      setOptions(options);
      await getData();
    })();
  }, []);

  return <LineChart options={options} data={data} />;
};

export default OpmComparison;
