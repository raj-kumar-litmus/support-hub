import { FC, useEffect, useState } from "react";
import { DCOpenOrders } from "../@types/dcOpenOrders";
import { fetchData } from "../utils/fetchUtil";
import { URL_INCOMPLETE_ORDERS } from "../constants/apiConstants";
import { STATUS_CODES } from "../constants/appConstants";
import Loader from "./loader";
import CustomTable from "./common/customtable";
import CustomModal from "./Modal";
import { Column } from "primereact/column";
import { getTableHeaders } from "./utils/Utils";

interface incompleteOrderData {
  date: string;
  status130Count: number;
  status131Count: number;
  status132Count: number;
  status140Count: number;
  status143Count: number;
  status144Count: number;
  status155Count: number;
  status440Count: number;
  status455Count: number;
  status460Count: number;
}

const InCompleteOrders: FC = () => {
  const [tableData, setTableData] = useState<DCOpenOrders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    async function fetchOrdersData() {
      try {
        const data = await fetchData(URL_INCOMPLETE_ORDERS, {});
        const modifiedArray = data?.map((item: incompleteOrderData) => ({
          Date: item.date,
          " 130": item.status130Count,
          " 131": item.status131Count,
          " 132": item.status132Count,
          " 140": item.status140Count,
          " 143": item.status143Count,
          " 144": item.status144Count,
          " 155": item.status155Count,
          " 440": item.status440Count,
          " 455": item.status455Count,
          " 460": item.status460Count,
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

  const buildHeader = (item) => {
    return (
      <div className="flex gap-[0.5vw]">
        <span>{item}</span>
        <span
          className="cursor-pointer"
          onClick={() => {
            setShowModal(true);
            setStatusCode(item);
          }}
        >
          ⓘ
        </span>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <div>
          <h3 className="sm:text-lg text-[#F2F2F2] font-bold m-3 ml-0 font-helvetica">
            In Complete Orders
          </h3>
          <CustomModal
            className="w-[50vw] inCompleteOrdersModal"
            onHide={() => setShowModal(false)}
            visible={showModal}
            position="center"
          >
            <p className="font-bold">Status Code: {statusCode}</p>
            <p>{STATUS_CODES[statusCode]?.description}</p>
            <p>{STATUS_CODES[statusCode]?.nextStatusText}</p>
            <p>
              <span className="font-bold">SLA:</span>{" "}
              {STATUS_CODES[statusCode]?.SLA}
            </p>
          </CustomModal>
          <div className="rounded-md">
            {tableData?.length > 0 && (
              <CustomTable
                resizableColumns
                stripedRows
                value={tableData}
                className="custom-table"
                cellClassName={(e) => {
                  if (e > 100) return "bg-red-500 !border-solid !border-2";
                }}
              >
                {getTableHeaders(tableData).map((item, index) => (
                  <Column
                    key={index}
                    field={item}
                    header={item == "Date" ? "Date" : buildHeader(item)}
                  ></Column>
                ))}
              </CustomTable>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InCompleteOrders;
