import { FC} from "react";
import CustomCard from "../atoms/CustomCard";
import CustomImage from "../atoms/CustomImage";
import ScheduleIcon from "../../assets/schedule.svg";
import { GridCardsProps, GridData } from "../../@types/components/commonTypes";
import { getSeverityStyles,hunderedkandMilFormatter,numberWithCommas } from "../../helpers/utils/utils";
import { FOCUS_ROOM_LABELS ,} from "../../helpers/constants/appConstants";

const GridCards: FC<GridCardsProps> = (props) => {
  const { className = "", dataClassName = "", columns = 1 } = props;
  const colWidth = `grid-cols-${columns}`;

  const handleCardClick = (e: React.SyntheticEvent, d: GridData) => {
    !d.unClickable && props.onClick(e, d);
  };

  const emptyCells = props.data
    ? props.data?.length % columns === 0
      ? 0
      : columns - (props.data?.length % columns)
    : columns;

  return (
    <div
      className={`grid-table flex flex-col cursor-pointer h-full ${className}`}
    >
      <div className="flex items-center mb-2">
        <div className="grid-table-header text-10 font-IBM text-white-900 uppercase font-bold">
          {props.title}
        </div>
        {props.lastUpdatedTime && (
          <div className="flex text-8 font-IBM ml-2 text-gray-103">
            <CustomImage src={ScheduleIcon} className="mr-2" />
            {FOCUS_ROOM_LABELS.LAST_UPDATED}
            {props.lastUpdatedTime}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className={`grid ${colWidth} gap-2 h-full`}>
          {props.data?.map((d, index) => (
            <CustomCard
              key={index}
              className={`grid-card ${
                d.severity ? getSeverityStyles(d.severity).boxShadow : ""
              }`}
              onClick={(e) => handleCardClick(e, d)}
            >
              {d?.title && <div className="text-8">{d.title}</div>}
              <div
                className={`flex justify-center items-center gap-2 ${
                  d.severity ? getSeverityStyles(d.severity).text : ""
                }`}
              >
                {d.icon && <CustomImage src={d.icon} className="w-3 h-3" />}
                 {d.data && <div className={`${dataClassName}`}>{ typeof d.data === "number"
                    ? props.formatNumber? hunderedkandMilFormatter(d.data):numberWithCommas(d.data)
                    : d.data}</div>}
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

export default GridCards;
