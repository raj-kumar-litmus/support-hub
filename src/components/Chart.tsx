import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { WeatherResponse, WeatherData } from '../@types/todo';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Temperature Chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Oct',
  'Nov',
  'Dec',
];

const cities = ['Delhi', 'London', 'Tokyo'];

export const datum = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: [1, 2, 3, 4, 5, 6, 7, 8, 90, 10, 11, 12],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: [10, 20, 33, 40, 5, 60, 30, 87, 90, 101, 10, 120],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Chart() {
  const [rotate, setRotate] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherResponse[]>([]);
  const [data, setData] = useState<WeatherData>();

  useEffect(() => {
    (async () => {
      const requests = cities.map((city) =>
        fetch(
          `http://api.weatherapi.com/v1/current.json?key=3a0304c9b4e64fbf979113522231409&q=${city}&aqi=no`
        )
      );
      const responses = await Promise.all(requests);
      const promises = responses.map((response) => response.json());
      const resp = await Promise.all(promises);
      setWeatherData(resp);
    })();
  }, []);

  useEffect(() => {
    if (weatherData.length > 0) {
      const temperatureData = {
        labels: cities,
        datasets: weatherData.map((e, index) => ({
          label: e?.location?.name,
          backgroundColor: `rgba(${255 / (index + 1)}, ${99 / (index + 3)}, ${
            132 / (index + 5)
          }, ${index + 0.5})`,
          borderColor: `rgba(${255 / (index + 1)}, ${99 / (index + 3)}, ${
            132 / (index + 5)
          }, ${index + 0.5})`,
          data: [e?.current?.['temp_f']],
        })),
      };
      console.log(temperatureData);
      console.log(datum);
      setData(temperatureData);
    }
  }, [weatherData]);

  return (
    <div className={rotate ? 'rotate-90 mt-[200px]' : ''}>
      <div className="w-[105%] text-center">
        <button className="mr-[50px]" onClick={() => setRotate(!rotate)}>
          {!rotate ? 'Rotate' : 'UnRotate'}
        </button>
      </div>
      {data && <Bar options={options} data={data} />}
      <Bar options={options} data={datum} />
    </div>
  );
}

export default Chart;
