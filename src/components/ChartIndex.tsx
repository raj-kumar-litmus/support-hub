import React from "react";
import OPM from "../views/Opm";
import OpmComparison from "../views/OpmComparison";
import { ChartProps } from "../@types/components/CommonTypes";

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <>
      {props.type === "opm" && <OPM />}
      {props.type === "opmcomparison" && <OpmComparison />}
    </>
  );
};

export default Chart;
