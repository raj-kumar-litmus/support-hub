import { useEffect, useState } from "react";
import { DCOpenOrders } from "../utils/interfaces/dcOpenOrders";
import Table from "./Common/Table/Table";
import Card from "./Common/Card/Card";

interface orderData {
  country: string;
  shipNode: string;
  dcName: string;
  workableOrders: number;
}

const DcOpenOrders = () => {
  const [tableData, setTableData] = useState<DCOpenOrders[]>([]);

  useEffect(() => {
    fetch("/mock/dcOpenOrders.json")
      .then((res) => res.json())
      .then((response) => {
        const modifiedArray = response.map((item: orderData) => ({
          "DC Name": item.dcName,
          Country: item.country,
          "Shipment Node": item.shipNode,
          "Workable Orders": item.workableOrders,
        }));
        setTableData(modifiedArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-11/12 md:w-4/6 m-auto">
      <h3 className="text-[#757575] font-bold m-3 ml-0">DC Open Orders</h3>
      <div className="hidden sm:block rounded-md">
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
