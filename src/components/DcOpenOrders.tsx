import { useEffect, useState } from "react";
import { DCOpenOrders } from "../utils/interfaces/dcOpenOrders";
import Table from "./Common/Table/Table";
import Card from "./Common/Card/Card";

const tableDataResponse = [
  {
    country: "US",
    shipNode: "0801",
    dcName: "UDC",
    workableOrders: 3562,
  },
  {
    country: "US",
    shipNode: "1001",
    dcName: "SDC",
    workableOrders: 18451,
  },
  {
    country: "CA",
    shipNode: "0750",
    dcName: "UTI",
    workableOrders: 6547,
  },
  {
    country: "US",
    shipNode: "1021",
    dcName: "WDC",
    workableOrders: 16620,
  },
  {
    country: "CA",
    shipNode: "1050",
    dcName: "VDC",
    workableOrders: 3560,
  },
  {
    country: "US",
    shipNode: "0701",
    dcName: "PDC",
    workableOrders: 29158,
  },
];

const DcOpenOrders = () => {
  const [tableData, setTableData] = useState<DCOpenOrders[]>([]);

  useEffect(() => {
    const response = tableDataResponse;
    const modifiedArray = response.map((item) => ({
      "DC Name": item.dcName,
      Country: item.country,
      "Shipment Node": item.shipNode,
      "Workable Orders": item.workableOrders,
    }));
    setTableData(modifiedArray);
  }, []);

  return (
    <div className="w-11/12 md:w-4/6 m-auto">
      <h3 className="text-[#757575] font-bold m-3 ml-0">DC Open Orders</h3>
      <div className="hidden sm:block py-8 rounded-md">
        {tableData?.length > 0 && <Table tableData={tableData} />}
      </div>
      <div className="block sm:hidden">
        {tableData?.length > 0 &&
          tableData?.map((dataObj, index) => (
            <Card key={index} cardData={dataObj} />
          ))}
      </div>
    </div>
  );
};

export default DcOpenOrders;
