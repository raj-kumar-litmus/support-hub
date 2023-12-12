import type { ChartData, ChartOptions } from "chart.js";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { FC } from "react";
import { Pie } from "react-chartjs-2";
import useScreenSize from "../hooks/useScreenSize";

interface Props {
  options?: ChartOptions<"pie"> | any;
  data?: ChartData<"pie"> | any;
  height?: string;
  width?: string;
  xsHeight?: string;
  xsWidth?: string;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      lineTension: 0.8,
    },
  ],
};

const defaultOptions = {
  maintainAspectRatio: false,
  responsive: false,
  plugins: {
    legend: {
      text: 'Votes',
      display: true,
      borderRadius: 2,
      labels: {
        position: "right",
        boxWidth: 12,
      },
    },
    datalabels: {
      display: true,
      borderRadius: 3,
      font: {
        size: 12,
      },
      formatter: (value: string) => {
        return value;
      },
      color: "#404040",
    },
    tooltip: {
      title: function (tooltipItem, data) {
        return data['labels'][tooltipItem[0]['index']];
      },
      label: function (tooltipItem, data) {
        return data['datasets'][0]['data'][tooltipItem['index']];
      },
      afterLabel: function (tooltipItem, data) {
        var dataset = data['datasets'][0];
        var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
        return '(' + percent + '%)';
      },
      backgroundColor: '#FFF',
      titleFontSize: 16,
      titleFontColor: '#0066ff',
      bodyFontColor: '#000',
      bodyFontSize: 14,
      displayColors: false,
      titleColor: '#cd0a0a',
      borderWidth: 1,
      enabled: true,
      usePointStyle: true,
      titleSpacing: 3,
      TitleFont: {
        weight: 'bold'
      },
      bodyColor: 'orange',
      bodyFont: {
        weight: 'italic'
      },
      callbacks: {
        label: (d: { raw: any; }) => {
          const percentage = `${(Number(d.raw) * 100 / 44).toFixed(2)}%`

          return percentage
        },
      },
    },
  }
};

const PieChart: FC<Props> = ({
  options = defaultOptions,
  data = defaultData,
  height = 420,
  width = 420,
  xsHeight = 320,
  xsWidth = 320
}) => {
  const screenWidth = useScreenSize().width;

  return <Pie data={data} options={options} height={(xsHeight && screenWidth < 700) ? xsHeight : height} width={(xsWidth && screenWidth < 700) ? xsWidth : width} />;
};

export default PieChart;
