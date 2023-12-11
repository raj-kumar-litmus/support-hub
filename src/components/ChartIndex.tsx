import React from "react";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import Sessions from "../views/sessions";
import { ChartProps } from "../@types/components/commonTypes";

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <>
      {props.type === "opm" && <OPM />}
      {props.type === "opmcomparison" && <OpmComparison />}
      {props.type === "sessions" && <Sessions />}
    </>
  );
};

export default Chart;
