import { useState } from "react";
import { DCOpenOrders } from "../@types/dcOpenOrders";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface TableProps {
  tableData: DCOpenOrders[];
  stripedRows: boolean;
  showGridlines: boolean;
  selectionMode: string;
  sortable: boolean;
}

const Table = (props: TableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<DCOpenOrders | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<DCOpenOrders[] | null>(
    null,
  );
  const keyArray = Object.keys(props.tableData[0])?.map((key) => key);
  return (
    <DataTable
      value={props.tableData}
      stripedRows={props.stripedRows ? true : false}
      showGridlines={props.showGridlines ? true : false}
      selectionMode={
        props.selectionMode == "radio"
          ? "radiobutton"
          : props.selectionMode == "checkbox"
          ? "multiple"
          : null
      }
      selection={
        props.selectionMode == "radio" ? selectedOrder : selectedOrders
      }
      onSelectionChange={(e) =>
        props.selectionMode == "radio"
          ? setSelectedOrder(e.value)
          : setSelectedOrders(e.value)
      }
    >
      {props.selectionMode && (
        <Column
          selectionMode={
            props.selectionMode == "radio"
              ? "single"
              : props.selectionMode == "checkbox"
              ? "multiple"
              : undefined
          }
        ></Column>
      )}

      {keyArray?.map((item, index) => (
        <Column
          key={index}
          field={item}
          sortable={props.sortable ? true : false}
          header={item}
        ></Column>
      ))}
    </DataTable>
  );
};

export default Table;
