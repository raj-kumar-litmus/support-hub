import { FC } from "react";
import { InfoFieldProps } from "../../@types/pages/OrderDetails";

const InfoField: FC<InfoFieldProps> = (props) => {
  return (
    <div className={`text-xs font-normal ${props.wrapperClassName}`}>
      <div className={`text-gray-400 ${props.titleClassName}`}>{props.title}</div>
      <div
        className={`text-gray-300 ${props.dataClassName}`}
        title={props.data.toString()}
      >
        {props.data}
      </div>
    </div>
  );
};

export default InfoField;
