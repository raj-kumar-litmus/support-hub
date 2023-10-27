import React from "react";
import CrossIcon from "../assets/cross_with_circle.svg";
import CustomButton from "./Button";
import CustomImage from "./common/customimage";

interface Props {
  content: string;
  leftIcon?: string;
  label?: string;
  onClickHandler: () => void;
}

const FilteredCard: React.FC<Props> = ({
  content,
  leftIcon,
  label,
  onClickHandler,
}) => {
  return (
    <CustomButton id={label} className="filteredCard" onClick={onClickHandler}>
      <CustomImage id={label} src={leftIcon} />
      {/* <img src={leftIcon} /> */}
      <span id={label}>{content}</span>
      <img
        className="ml-[10px] relative right-[10px] md:right-[0px]"
        id={label}
        src={CrossIcon}
      />
    </CustomButton>
  );
};

export default FilteredCard;
