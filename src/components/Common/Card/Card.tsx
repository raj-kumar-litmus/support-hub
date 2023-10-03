import { DCOpenOrders } from "../../../utils/interfaces/dcOpenOrders";

const Card = ({ cardData }: { cardData: DCOpenOrders }) => {
  return (
    <div className="shadow-lg border border-gray-100 w-full flex m-auto text-neutral-500 pt-4 pb-4 pr-2 rounded-lg mb-3">
      {Object.entries(cardData).map(([key, value], ind) => {
        return ind === 0 ? (
          <div
            key={ind}
            className="w-6/12 pl-4 pr-4 text-center items-center border-r flex flex-col justify-center"
          >
            <div className="text-xs mb-1">{key}</div>
            <div className="font-medium">{value}</div>
          </div>
        ) : (
          <div key={ind} className="w-6/12 pl-4 flex">
            <div className="pl-2 pr-2 flex flex-col flex-1 justify-between">
              <div className="text-xs mb-2">{key}</div>
              <div className="text-sm font-medium">{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
