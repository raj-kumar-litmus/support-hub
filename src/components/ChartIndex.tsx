import React from "react";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import { ChartProps } from "../@types/components/commonTypes";

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <>
      {props.type === "opm" && <OPM />}
      {props.type === "opmcomparison" && <OpmComparison />}
    </>
  );
};

export default Chart;
