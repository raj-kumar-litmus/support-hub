import { DCOpenOrders } from "../@types/dcOpenOrders";

interface CardProps {
  cardData: DCOpenOrders;
  width: string;
  button: boolean;
}

const Card = (props: CardProps) => {
  return (
    <>
      <div
        className={`${
          props.width == "small"
            ? "w-2/5"
            : props.width == "large"
            ? "w-full"
            : "w-4/5"
        } shadow-lg border border-gray-100 m-auto text-neutral-500 p-4 rounded-lg mb-3`}
      >
        {props.cardData ? (
          <div className="flex">
            {Object.entries(props.cardData).map(([key, value], ind) => {
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
        ) : (
          <div>
            <h2 className="font-bold mb-3">Simple Card</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore sed consequuntur error repudiandae numquam deserunt
              quisquam repellat libero asperiores earum nam nobis, culpa ratione
              quam perferendis esse, cupiditate neque quas!
            </p>
            {props.button && (
              <button className="bg-blue-400 p-2 text-white rounded-lg mt-3">
                Click!
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
