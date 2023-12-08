import { Column } from "primereact/column";
import { FC, useEffect, useState } from "react";
import Card from "./common/Card";
import CustomTable from "./common/CustomTable";
import Loader from "./Loader";
import { DCOpenOrders, orderData } from "../@types/pages/DcOpenOrders";
import { URL_DC_OPEN_ORDERS } from "../constants/ApiConstants";
import { fetchData } from "../utils/FetchUtil";
import { getTableHeaders } from "./utils/Utils";
import { PAGE_TITLES } from "../constants/AppConstants";

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
        <div>
          <h3 className="sm:text-lg text-gray-200 font-bold m-3 ml-0 font-helvetica">
            {PAGE_TITLES.DC_OPEN_ORDERS}
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
