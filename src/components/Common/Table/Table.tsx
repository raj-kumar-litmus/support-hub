import { DCOpenOrders } from "../../../utils/interfaces/dcOpenOrders";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Table = ({ tableData }: { tableData: DCOpenOrders[] }) => {
  console.log("prop received: ", tableData);
  const keyArray = Object.keys(tableData[0])?.map((key) => key);

  return (
    <DataTable
      value={tableData}
      showGridlines
      stripedRows
      className="ordersTable"
    >
      {keyArray?.map((item, index) => (
        <Column key={index} field={item} header={item}></Column>
      ))}
    </DataTable>
  );
};

export default Table;
