import React from "react";
import OPM from "../views/opm";
import OpmComparison from "../views/opmComparison";

interface Props {
  type: string;
  isFullScreen?: boolean;
}

const Chart: React.FC<Props> = ({ type, isFullScreen }) => {
  return (
    <>
      {type === "opm" && <OPM isFullScreen={isFullScreen} />}
      {type === "opmcomparison" && (
        <OpmComparison isFullScreen={isFullScreen} />
      )}
    </>
  );
};

export default Chart;
