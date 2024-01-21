import { Column } from "primereact/column";
import { getTableHeaders } from "../../helpers/utils/utils";
import CustomTable from "../atoms/CustomTable";
import CustomSideBar from "../molecules/CustomSideBar";

const tableData = [
  {
    "CONSUMER GROUPS": "DotCom.OMS.ReturnOrderCreate.Prod",
    LAG: "140",
  },
  {
    "CONSUMER GROUPS": "DotCom.OMS.ShipmentConfirmation.Prod",
    LAG: "50",
  },
  {
    "CONSUMER GROUPS": "DotCom.OMS.TlogAck.Prod",
    LAG: "40",
  },
  {
    "CONSUMER GROUPS": "DotCom.Commerce.SalesOrder.Prod",
    LAG: "100",
  },
  {
    "CONSUMER GROUPS": "DotCom.Commerce.OrderFulfillmentAction.Prod",
    LAG: "24",
  },
  {
    "CONSUMER GROUPS": "DotCom.Narvar.ReturnOrder.Prod",
    LAG: "16",
  },
];

const KafkaSideBar = (props) => {
  const { visible, setVisible } = props;

  const rowClass = (data) => {
    return {
      "hightlight-rows": data.LAG === "140",    // todo: select rows to be highlighed
    };
  };
  return (
    <CustomSideBar
      position="right"
      title="KAFKA"
      visible={visible}
      onHide={() => {
        setVisible(false);
      }}
      setVisible={setVisible}
      sideBarWidthClass="!w-50w"
      className="bg-gradient-to-b from-black-104 to-black-105"
    >
      <CustomTable
        resizableColumns
        stripedRows
        value={tableData}
        className="custom-table kafka-table"
        rowClassName={rowClass}
      >
        {getTableHeaders(tableData).map((item, index) => (
          <Column key={index} field={item} header={item}></Column>
        ))}
      </CustomTable>
    </CustomSideBar>
  );
};

export default KafkaSideBar;
