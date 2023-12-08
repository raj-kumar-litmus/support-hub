import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { TableProps } from "../../@types/components/CommonTypes";

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
