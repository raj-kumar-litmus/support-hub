import { FC } from "react";
import { HorizontalTableProps } from "../../@types/components/commonTypes";

const HorizontalTable: FC<HorizontalTableProps> = (props) => {
  const tableHeadColSpan =
    (props.tableData?.length > 0 &&
      Object.entries(props.tableData[0]).length * 2) ||
    1;

  return (
    <div className="rounded-lg border border-black-400 overflow-x-auto mt-4">
      <table className={`${props.tableClassName} w-full`}>
        {props.tableHead && (
          <thead
            className={`text-gray-200 text-center border-b border-black-400 bg-black-100 ${props.tableHeadClassName}`}
          >
            <th colSpan={tableHeadColSpan} className="p-2">
              {props.tableHead}
            </th>
          </thead>
        )}
        {props.tableData?.length > 0 &&
          props.tableData.map((row, index) => (
            <tr
              key={index}
              className={`text-sm ${
                index % 2 === 0 ? "bg-black-300" : "bg-black-100"
              }`}
            >
              {Object.entries(row).map(
                ([key, value]: [
                  string,
                  string | number | Array<string | number>,
                ]) => (
                  <>
                    <th className={`text-gray-200 ${props.rowHeadClassName}`}>
                      {key}
                    </th>
                    <td className={`text-gray-300 ${props.dataClassName}`}>
                      {value.length ? value[0] + " " + value[1] : value}
                    </td>
                  </>
                ),
              )}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default HorizontalTable;
