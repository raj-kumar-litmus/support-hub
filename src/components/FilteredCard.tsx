import React from "react";
import CrossIcon from "../assets/cross.svg";
import CustomButton from "./Button";
import CustomImage from "./common/customimage";
import { FilteredCardProps } from "../@types/components/commonTypes";

const FilteredCard: React.FC<FilteredCardProps> = (props) => {
  return (
    <CustomButton id={props.label} className="filteredCard">
      <CustomImage
        id={props.label}
        src={props.leftIcon}
        width="12"
        height="12"
      />
      <span id={props.label}>{props.content}</span>
      <CustomImage
        src={CrossIcon}
        onClick={() => props.onClickHandler(props.label)}
      />
    </CustomButton>
  );
};

export default FilteredCard;
