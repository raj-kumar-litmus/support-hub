import React from "react";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";
import { ChartProps } from "../@types/components/commonTypes";
import { FETCH_TYPES } from "../utils/Utils";

const Chart: React.FC<ChartProps> = (props) => {
  return (
    <>
      {props.type === "opm" && <OPM fetchType={FETCH_TYPES.OPM}  />}
      {props.type === "opmcomparison" && <OpmComparison />}
    </>
  );
};

export default Chart;
