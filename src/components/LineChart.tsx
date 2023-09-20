import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeatherData, Options } from '../@types/todo';
import { useState } from 'react';

interface Props {
  options: Options;
  data: WeatherData;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ options, data }: Props) {
  const [rotate, setRotate] = useState<boolean>(false);
  return (
    <div className={rotate ? 'rotate-90 mt-[200px]' : ''}>
      <div className="w-[105%] text-center">
        <button className="mr-[50px]" onClick={() => setRotate(!rotate)}>
          {!rotate ? 'Rotate' : 'UnRotate'}
        </button>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
