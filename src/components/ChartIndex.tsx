import { useContext, useEffect, useState } from 'react';
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
import { WeatherData } from '../@types/todo';
import { ChartContext } from '../context/chart';
import OPM from './Opm';

interface Props {
  type: string;
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

function Chart({ type }: Props) {
  const [opmData, setOpmData] = useState<null | WeatherData>(null);
  const [opmcomparison, setOpmcomparison] = useState<null | WeatherData>(null);
  const { setTitle } = useContext(ChartContext) || {
    setTitle: (_: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  };
  useEffect(() => {
    if (type === 'opm') {
      setTitle('OPM');
      setOpmData({
        labels: [
          '06:58',
          '07:58',
          '08:58',
          '09:58',
          '10:58',
          '11:28',
          '11:58',
          '12:58',
          '13:58',
          '14:58',
          '15:58',
        ],
        datasets: [
          {
            label: 'Orders Per Minute',
            borderColor: 'rgb(128,128,128)',
            backgroundColor: 'rgb(128,128,128)',
            data: [
              '96',
              '106',
              '36',
              '167',
              '194',
              '126',
              '16',
              '11',
              '79',
              '67',
              '30',
            ],
          },
        ],
      });
    }
    if (type === 'opmcomparison') {
      setTitle('OPM Comparison');
      setOpmcomparison({
        labels: [
          '06:58',
          '07:58',
          '08:58',
          '09:58',
          '10:58',
          '11:28',
          '11:58',
          '12:58',
          '13:58',
          '14:58',
          '15:58',
        ],
        datasets: [
          {
            label: 'Orders Per Minute',
            borderColor: 'rgb(128,128,128)',
            backgroundColor: 'rgb(128,128,128)',
            data: [
              '111',
              '143',
              '116',
              '138',
              '119',
              '130',
              '112',
              '120',
              '108',
              '132',
            ],
          },
          {
            label: 'Orders Per Minute',
            borderColor: 'rgb(128,128,128)',
            backgroundColor: 'rgb(128,128,128)',
            data: [
              '94',
              '105',
              '114',
              '142',
              '113',
              '103',
              '106',
              '122',
              '127',
              '113',
            ],
          },
        ],
      });
    }
  }, []);

  return (
    <>
      {type === 'opm' && <OPM data={opmData} />}
      {type === 'opmcomparison' && <OPM data={opmcomparison} />}
    </>
  );
}

export default Chart;
