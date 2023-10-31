import { useEffect, useState } from "react";
import { DCOpenOrders } from "../../@types/dcOpenOrders";

type CardProps = {
  cardData: DCOpenOrders | CommerceItemData;
  type: string;
  key: number;
};

const Card = (props: CardProps) => {
  const [cardTitle, setCardTitle] = useState(null);
  const [cardSubTitle, setSubTitle] = useState(null);
  const [cardItems, setCardItems] = useState([]);

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
    <div className="shadow-lg border bg-[#30343B] border-[#383F47] w-full flex m-auto text-[#FAF9F6] pt-4 pb-4 pr-2 rounded-lg mb-3">
      <div className="w-3/12 pl-4 pr-4 text-center items-center border-r border-[#383F47] flex flex-col justify-center">
        <div className="text-xs mb-1 text-[#898A8D]">{cardTitle?.key}</div>
        <div className="font-medium text-[#FAF9F6]">{cardTitle?.value}</div>
      </div>
      <div
        className={`w-9/12 ${
          props.type === "ORDER_DETAILS_ITEM" ? `flex-col` : `flex`
        }`}
      >
        {cardSubTitle && (
          <div className="w-full pl-2 pb-2 mb-2 flex border-b border-solid border-[#383F47]">
            <div className="pl-2 pr-2 flex flex-col flex-1 justify-between">
              <div className="text-xs mb-2 text-[#898A8D]">
                {cardSubTitle?.key}
              </div>
              <div className="text-sm font-medium text-[#FAF9F6]">
                {cardSubTitle?.value}
              </div>
            </div>
          </div>
        )}
        <div
          className={`pl-2 flex ${
            props.type === "ORDER_DETAILS_ITEM" ? `flex-row-reverse` : ``
          }`}
        >
          {cardItems.map((item, ind) => (
            <div
              key={ind}
              className="pl-2 pr-2 flex flex-col flex-1 justify-between"
            >
              <div className="text-xs mb-2 text-[#898A8D]">{item.key}</div>
              <div className="text-[13px] font-medium text-[#FAF9F6]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
