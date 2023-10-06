import { FC, useEffect, useState } from "react";
import { DCOpenOrders } from "../@types/dcOpenOrders";
import { fetchData } from "../utils/fetchUtil";
import { URL_DC_OPEN_ORDERS } from "../constants/apiConstants";
import Table from "./common/Table";
import Card from "./common/Card";

interface orderData {
  country: string;
  shipNode: string;
  dcName: string;
  workableOrders: number;
}

const DcOpenOrders: FC = () => {
  const [tableData, setTableData] = useState<DCOpenOrders[]>([]);

  useEffect(() => {
    async function fetchOrdersData() {
      const data = await fetchData(URL_DC_OPEN_ORDERS, {});
      const modifiedArray = data.map((item: orderData) => ({
        "DC Name": item.dcName,
        Country: item.country,
        "Shipment Node": item.shipNode,
        "Workable Orders": item.workableOrders,
      }));
      setTableData(modifiedArray);
    }
    fetchOrdersData();
  }, []);

  return (
    <div className="w-11/12 m-auto mt-6">
      <h3 className="text-[#757575] font-bold m-3 ml-0 font-helvetica">
        DC Open Orders
      </h3>
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
