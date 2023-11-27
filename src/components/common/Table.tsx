import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { CommerceItemData } from "../../@types/OrderDetails";
import { DCOpenOrders } from "../../@types/dcOpenOrders";

type TableProps = {
  tableData: DCOpenOrders[] | CommerceItemData[];
};

const Table = (props: TableProps) => {
  const keyArray = Object.keys(props.tableData[0])?.map((key) => key);
  return (
    <DataTable value={props.tableData} {...props}>
      {keyArray?.map((item, index) => (
        <Column key={index} field={item} header={item}></Column>
      ))}
    </DataTable>
  );
};

export default Table;
