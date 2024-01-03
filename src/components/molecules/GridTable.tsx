import { Column } from "primereact/column";
import { FC, useEffect, useState } from "react";
import CustomImage from "../atoms/CustomImage";
import CustomTable from "../atoms/CustomTable";
import FilledCheckCircle from "../../assets/filled_check_circle.svg";
import Warning from "../../assets/warning.svg";
import { SEVERITY } from "../../helpers/constants/appConstants";
import { GridTableProps } from "../../@types/components/commonTypes";

const GridTable: FC<GridTableProps> = (props) => {
  const [rowDataList, setRowDataList] = useState<any[]>([]);

  const getSeverityStyles = (data) => (
    data.severity === SEVERITY.HIGH ? "text-yellow-200" :
      "text-green-400"
  );

  const generateGridData = () => {
    if (props.data?.length > 0) {
      const a = props.data.slice();
      let rowData;
      const gridData = [];
      while (a.length > 0) {
        rowData = a.splice(0, props.columns);
        const _data = rowData.map((item, index) => ({
          [`data${index + 1}`]: item.data,
          ...(item.highlight && { highlight: item.highlight }),
          ...(item.severity && { severity: item.severity }),
        }));
        gridData.push(_data);
      }
      setRowDataList(gridData);
    }
  };

  useEffect(() => {
    generateGridData();
  }, [props.data, props.columns]);

  const header = (
    <div className="grid-table-header">
      <span>{props.title}</span>
    </div>
  );

  return (
    <CustomTable
      value={rowDataList}
      showHeaders={false}
      header={props.title ? header : ""}
      className={`grid-table cursor-pointer ${props.className}`}
    >
      {Array(props.columns)
        .fill("")
        .map((_, columnIndex) => (
          <Column
            key={`col${columnIndex + 1}`}
            field={`data${columnIndex + 1}`}
            body={(rowData) =>
              rowData[columnIndex]?.[`data${columnIndex + 1}`] ? (
                <div
                  className={`flex justify-center items-center p-2 ${
                    rowData[columnIndex].severity
                      ? getSeverityStyles(rowData[columnIndex])
                      : ""
                  }`}
                  onClick={() =>
                    props.onClick(
                      rowData[columnIndex]?.[`data${columnIndex + 1}`]
                    )
                  }
                >
                  {rowData[columnIndex]?.severity && (
                    <CustomImage
                      src={
                        rowData[columnIndex].severity === SEVERITY.HIGH
                          ? Warning
                          : FilledCheckCircle
                      }
                      className="mr-2 h-3 w-3"
                    />
                  )}
                  {rowData[columnIndex]?.[`data${columnIndex + 1}`]}
                </div>
              ) : (
                "-"
              )
            }
            bodyClassName={(rowData) =>
              rowData[columnIndex]?.highlight
                ? "!border !border-red-100 bg-red-200"
                : ""
            }
          />
        ))}
    </CustomTable>
  );
};

export default GridTable;
