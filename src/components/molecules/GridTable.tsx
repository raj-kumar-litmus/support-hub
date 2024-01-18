import { FC } from "react";
import CustomCard from "../atoms/CustomCard";
import CustomImage from "../atoms/CustomImage";
import { GridTableProps } from "../../@types/components/commonTypes";
import { getSeverityStyles } from "../../helpers/utils/utils";

const GridTable: FC<GridTableProps> = (props) => {
  const { className = "", dataClassName = "" } = props;
  const colWidth = `grid-cols-${props.columns}`;

  const handleCardClick = () => {};

  const emptyCells =
    props.data.length % props.columns === 0
      ? 0
      : props.columns - (props.data.length % props.columns);

  return (
    <div className={`grid-table flex flex-col cursor-pointer ${className}`}>
      <div className="flex items-center mb-2">
        <div className="grid-table-header text-10 font-normal font-IBM text-white-900 uppercase">
          {props.title}
        </div>
        {props.lastUpdatedTime && (
          <div className="text-8 font-IBM ml-4">
            Last Updated {props.lastUpdatedTime}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className={`grid ${colWidth} gap-2 h-full`}>
          {props.data.map((d, index) => (
            <CustomCard
              key={index}
              className={`grid-card ${
                d.severity ? getSeverityStyles(d.severity).boxShadow : ""
              }`}
              onClick={() => handleCardClick()}
            >
              {d?.title && <div className="text-8">{d.title}</div>}
              <div
                className={`flex justify-center items-center gap-2 ${
                  d.severity ? getSeverityStyles(d.severity).text : ""
                }`}
              >
                {d.icon && <CustomImage src={d.icon} className="w-3 h-3" />}
                {d.data && <div className={`${dataClassName}`}>{d.data}</div>}
              </div>
            </CustomCard>
          ))}
          {Array.from({ length: emptyCells }).map((_, index) => (
            <CustomCard key={index} className="grid-card">
              -
            </CustomCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridTable;
