import { DCOpenOrders } from "../../@types/dcOpenOrders";

const Card = ({ cardData }: { cardData: DCOpenOrders }) => {
  return (
    <div className="shadow-lg shadow-[#00000033] w-full flex m-auto text-neutral-500 pt-4 pb-4 pr-2 rounded-lg mb-3 bg-[#30343B]">
      {Object.entries(cardData).map(([key, value], ind) => {
        return ind === 0 ? (
          <div
            key={ind}
            className="w-6/12 pl-4 pr-4 text-center items-center border-r border-[#383F47] flex flex-col justify-center"
          >
            <div className="text-xs mb-1 text-[#898A8D]">{key}</div>
            <div className="font-medium text-[#FAF9F6]">{value}</div>
          </div>
        ) : (
          <div key={ind} className="w-6/12 pl-4 flex">
            <div className="pl-2 pr-2 flex flex-col flex-1 justify-between">
              <div className="text-xs mb-2 text-[#898A8D]">{key}</div>
              <div className="text-sm font-medium text-[#FAF9F6]">{value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
