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
import { useContext, useEffect, useState } from 'react';
import { WeatherData } from '../@types/todo';
import { ChartContext } from '../context/chart';
import LineChart from './LineChart';

interface Props {
  data: WeatherData | null;
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

const OPM = ({ data }: Props) => {
  const [date, setDate] = useState<null | string>(null);
  const [duration, setDuration] = useState<null | string>(null);
  const [channel, setChannel] = useState<null | string>(null);
  const [locale, setLocale] = useState<null | string>(null);
  const [paymentMode, setPaymentMode] = useState<null | string>(null);
  const [promoCode, setPromoCode] = useState<null | string>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { title } = useContext(ChartContext) || { title: '' };
  const options = {
    /** Whether it is responsive or not */
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top' as const,
    //   },
    //   title: {
    //     display: true,
    //     text: 'Chart.js Line Chart',
    //   },
    // },
  };

  useEffect(() => {
    console.log(date);
    console.log(duration);
    console.log(channel);
    console.log(locale);
    console.log(paymentMode);
    console.log(promoCode);
  }, [date, duration, channel, locale, paymentMode, promoCode]);

  const clearAllHandler = () => {
    setDate(null);
    setDuration(null);
    setChannel(null);
    setLocale(null);
    setPaymentMode(null);
    setPromoCode(null);
  };

  return (
    <>
      <div className="flex gap-[75vw]">
        <p>{title}</p>
        <button onClick={() => setShowFilters(!showFilters)}>Filter</button>
      </div>
      {showFilters && (
        <>
          <div className="flex gap-5">
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="date">
                From
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
                className="border rounded border-solid border-slate-300 border-1"
                id="date"
                type="date"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="duration">
                Duration
              </label>
              <select
                id="duration"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setDuration(e.target.value)
                }
                className="border rounded border-solid border-slate-300 border-1"
              >
                <option value="0:15">0:15</option>
                <option value="0:30">0:30</option>
                <option value="0:45">0:45</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="channel">
                Channel
              </label>
              <select
                id="channel"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setChannel(e.target.value)
                }
                className="border rounded border-solid border-slate-300 border-1"
              >
                <option value="All">All</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="locale">
                Locale
              </label>
              <select
                id="locale"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLocale(e.target.value)
                }
                className="border rounded border-solid border-slate-300 border-1"
              >
                <option value="US">US</option>
                <option value="CA">CA</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="payment">
                Payment
              </label>
              <select
                id="payment"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setPaymentMode(e.target.value)
                }
                className="border rounded border-solid border-slate-300 border-1"
              >
                <option value="Klarna">Klarna</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-[14px]" htmlFor="promoCode">
                Promo Code
              </label>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTimeout(() => setPromoCode(e.target.value), 1500)
                }
                className="border rounded border-solid border-slate-300 border-1"
                id="promoCode"
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-[10px]">
            {date && (
              <button className="search-tag">
                {date}
                <span onClick={() => setDate(null)} className="ml-[10px]">
                  X
                </span>
              </button>
            )}
            {duration && (
              <button className="search-tag">
                {duration}
                <span onClick={() => setDuration(null)} className="ml-[10px]">
                  X
                </span>
              </button>
            )}
            {channel && (
              <button className="search-tag">
                {channel}
                <span onClick={() => setChannel(null)} className="ml-[10px]">
                  X
                </span>
              </button>
            )}
            {paymentMode && (
              <button className="search-tag">
                {paymentMode}
                <span
                  onClick={() => setPaymentMode(null)}
                  className="ml-[10px]"
                >
                  X
                </span>
              </button>
            )}
            {locale && (
              <button className="search-tag">
                {locale}
                <span onClick={() => setLocale(null)} className="ml-[10px]">
                  X
                </span>
              </button>
            )}
            {(date || duration || channel || paymentMode || locale) && (
              <button
                className="text-[12px] text-[#575353]"
                onClick={clearAllHandler}
              >
                Clear All
              </button>
            )}
          </div>
        </>
      )}
      {data && <LineChart options={options} data={data} />}
    </>
  );
};

export default OPM;
