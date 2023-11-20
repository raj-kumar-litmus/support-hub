import { FC, useEffect, useState } from "react";
import { DCOpenOrders } from "../@types/dcOpenOrders";
import { fetchData } from "../utils/fetchUtil";
import { URL_DC_OPEN_ORDERS } from "../constants/apiConstants";
import Card from "./common/Card";
import Loader from "./loader";
import CustomTable from "./common/customtable";
import { Column } from "primereact/column";
import { getTableHeaders } from "./utils/Utils";

interface orderData {
  country: string;
  shipNode: string;
  dcName: string;
  workableOrders: number;
}

const DcOpenOrders: FC = () => {
  const [tableData, setTableData] = useState<DCOpenOrders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchOrdersData() {
      try {
        const data = await fetchData(URL_DC_OPEN_ORDERS, {});
        const modifiedArray = data?.map((item: orderData) => ({
          "DC Name": item.dcName,
          Country: item.country,
          "Shipment Node": item.shipNode,
          "Workable Orders": item.workableOrders,
        }));
        setTableData(modifiedArray);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrdersData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div className="w-11/12 m-auto mt-6">
          <h3 className="sm:text-lg text-[#F2F2F2] font-bold m-3 ml-0 font-helvetica">
            DC Open Orders
          </h3>
          <div className="hidden sm:block rounded-md">
            {tableData?.length > 0 && (
              <CustomTable
                resizableColumns
                stripedRows
                value={tableData}
                className="custom-table ordersTable"
              >
                {getTableHeaders(tableData).map((item, index) => (
                  <Column key={index} field={item} header={item}></Column>
                ))}
              </CustomTable>
            )}
          </div>
          <div className="block sm:hidden">
            {tableData?.length > 0 &&
              tableData?.map((dataObj, index) => (
                <Card key={index} cardData={dataObj} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DcOpenOrders;
