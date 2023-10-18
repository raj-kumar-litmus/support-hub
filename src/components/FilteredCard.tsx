import React from "react";
import CrossIcon from "../assets/cross.svg";
import CustomButton from "./Button";
import CustomImage from "./common/customimage";

interface Props {
  content: string;
  leftIcon?: string;
  onClickHandler(): void;
}

const FilteredCard: React.FC<Props> = ({
  content,
  leftIcon,
  onClickHandler,
}) => {
  return (
    <CustomButton className="filteredCard" onClick={onClickHandler}>
      <CustomImage src={leftIcon} />
      {/* <img src={leftIcon} /> */}
      <span>{content}</span>
      <img className="ml-[10px]" src={CrossIcon} />
    </CustomButton>
  );
};

export default FilteredCard;
