import { DCOpenOrders } from "../../@types/dcOpenOrders";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CommerceItemData } from "../../@types/OrderDetails";

type TableProps = {
  tabledata: DCOpenOrders[] | CommerceItemData[];
};

const Table = (props: TableProps) => {
  const keyArray = Object.keys(props.tabledata[0])?.map((key) => key);
  return (
    <DataTable value={props.tabledata} {...props}>
      {keyArray?.map((item, index) => (
        <Column key={index} field={item} header={item}></Column>
      ))}
    </DataTable>
  );
};

export default Table;
