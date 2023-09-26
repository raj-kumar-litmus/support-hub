import React from "react";

interface Props {
  content: string;
}

const FilteredCard: React.FC<Props> = ({ content }) => {
  return <div>{content}</div>;
};

export default FilteredCard;
