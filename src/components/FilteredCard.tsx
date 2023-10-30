import React from "react";
import CrossIcon from "../assets/cross.svg";
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
      <CustomImage id={label} src={leftIcon} width="12" height="12" />
      <span id={label}>{content}</span>
      <CustomImage
        src={CrossIcon}
      />
    </CustomButton>
  );
};

export default FilteredCard;
