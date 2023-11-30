import { useEffect, useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import { CardProps } from "../../@types/components/commonTypes";

const Card = (props: CardProps) => {
  const [cardTitle, setCardTitle] = useState(null);
  const [cardSubTitle, setSubTitle] = useState(null);
  const [cardItems, setCardItems] = useState([]);
  const { width } = useScreenSize();

  useEffect(() => {
    const cards = [];
    Object.entries(props.cardData).forEach(([key, value], ind) => {
      if (ind === 0) {
        setCardTitle({ key, value });
      } else if (ind === 1) {
        props.type === "ORDER_DETAILS_ITEM"
          ? setSubTitle({ key, value })
          : cards.push({ key, value });
      } else {
        cards.push({ key, value });
      }
    });
    setCardItems(cards);
  }, []);

  return (
    <div className="shadow-lg bg-black-200 w-full flex m-auto text-gray-300 pt-4 pb-4 pr-2 rounded-lg mb-3">
      <div className="w-3/12 pl-4 pr-4 text-center items-center border-r border-black-300 flex flex-col justify-center">
        <div className="text-xs mb-1 text-gray-400">{cardTitle?.key}</div>
        <div
          className={`${
            width < 350 ? "text-[0.8rem]" : ""
          } font-medium text-gray-300`}
        >
          {cardTitle?.value}
        </div>
      </div>
      <div
        className={`w-9/12 ${
          props.type === "ORDER_DETAILS_ITEM" ? `flex-col` : `flex`
        }`}
      >
        {cardSubTitle && (
          <div className="w-full pl-2 pb-2 mb-2 flex border-b border-solid border-black-300">
            <div className="pl-2 pr-2 flex flex-col flex-1 justify-between">
              <div className="text-xs mb-2 text-gray-400">
                {cardSubTitle?.key}
              </div>
              <div
                className={`${
                  width < 350 ? "text-[0.75rem]" : "text-sm"
                } font-medium text-gray-300`}
              >
                {cardSubTitle?.value}
              </div>
            </div>
          </div>
        )}
        <div
          className={`pl-2 w-full flex ${
            props.type === "ORDER_DETAILS_ITEM" ? `flex-row-reverse` : ``
          }`}
        >
          {cardItems.map((item, ind) => (
            <div key={ind} className="pl-2 pr-2 flex flex-col flex-1">
              <div
                className={`text-xs text-gray-400 ${
                  props.type === "ORDER_DETAILS_ITEM" ? "text-center" : ""
                }`}
              >
                {item.key}
              </div>
              <div
                className={`text-[13px] font-medium text-gray-300 flex h-full items-center ${
                  props.type === "ORDER_DETAILS_ITEM" ? "justify-center" : ""
                }`}
              >
                {["Total Price", "Unit Price"].includes(item.key) ? (
                  <div className="flex flex-col">
                    <span>{item.value.split(" ")[0]}</span>
                    <span>{item.value.split(" ")[1]}</span>
                  </div>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
