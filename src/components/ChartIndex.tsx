import React from "react";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";

interface Props {
  type: string;
}

const Chart: React.FC<Props> = ({ type }) => {
  return (
    <>
      {type === "opm" && <OPM />}
      {type === "opmcomparison" && <OpmComparison />}
    </>
  );
};

export default Chart;
