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

const OPM: React.FC = () => {
  const [options, setOptions] = useState<Options>({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "OPM",
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
        `http://azruvuprep01:8080/supportdashboard/opm?period=10&starttime=&channel=&promocode=&paymentType=&country=`,
      );
    } catch (err) {
      const apiRespnose = [
        {
          timestamp: "08:24",
          orderCount: "95",
        },
        {
          timestamp: "08:25",
          orderCount: "107",
        },
        {
          timestamp: "08:26",
          orderCount: "105",
        },
        {
          timestamp: "08:27",
          orderCount: "111",
        },
        {
          timestamp: "08:28",
          orderCount: "108",
        },
        {
          timestamp: "08:29",
          orderCount: "122",
        },
        {
          timestamp: "08:30",
          orderCount: "107",
        },
        {
          timestamp: "08:31",
          orderCount: "108",
        },
        {
          timestamp: "08:32",
          orderCount: "112",
        },
        {
          timestamp: "08:33",
          orderCount: "94",
        },
      ];
      setData({
        labels: apiRespnose.map((e) => e.timestamp),
        datasets: [
          {
            label: "",
            data: apiRespnose.map((e) => Number(e.orderCount)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
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

export default OPM;
