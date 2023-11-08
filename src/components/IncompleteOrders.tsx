import React, { FC, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchUtil";
import { IncompleteOrdersData } from "../@types/IncompleteOrdersData";
import { URL_INCOMPLETE_ORDERS } from "../constants/apiConstants";
import CustomDialog from "./common/customdialog";
import Loader from "./loader";
import info from "../assets/oms_info_white.svg";
import CustomTable from "./common/customtable";
import { Column } from "primereact/column";
import statusMessages from "./utils/IncompleteOrdersStatusData";

const IncompleteOrder: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IncompleteOrdersData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<
    | { code: number; message: string; nextState: string; sla: string }
    | any
    | null
  >(null);

  const handleClick = (header: number) => {
    setShowDialog(true);

    switch (header) {
      case 130:
        setDialogData(statusMessages[130]);
        break;
      case 131:
        setDialogData(statusMessages[131]);
        break;
      case 132:
        setDialogData(statusMessages[132]);
        break;
      case 140:
        setDialogData(statusMessages[140]);
        break;
      case 143:
        setDialogData(statusMessages[143]);
        break;
      case 144:
        setDialogData(statusMessages[144]);
        break;
      case 155:
        setDialogData(statusMessages[155]);
        break;
      case 440:
        setDialogData(statusMessages[440]);
        break;
      case 455:
        setDialogData(statusMessages[455]);
        break;
      case 460:
        setDialogData(statusMessages[460]);
        break;
      default:
        setDialogData("No information available");
    }
  };

  const HEADERS = [
    { field: "date", header: "Date" },
    { field: "status130Count", header: "130 " },
    { field: "status131Count", header: " 131" },
    { field: "status132Count", header: " 132" },
    { field: "status140Count", header: " 140" },
    { field: "status143Count", header: "143" },
    { field: "status144Count", header: "144" },
    { field: "status155Count", header: "155" },
    { field: "status440Count", header: "440" },
    { field: "status455Count", header: "455" },
    { field: "status460Count", header: "460" },
  ];

  useEffect(() => {
    setIsLoading(true);
    async function fetchIncompleteOrderdata() {
      try {
        const data = await fetchData(URL_INCOMPLETE_ORDERS, {});

        setTableData(data);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchIncompleteOrderdata();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[95%] ml-7 mt-7">
          <div className="hidden sm:block rounded-md">
            {tableData?.length > 0 && (
              <CustomTable
                resizableColumns
                showGridlines
                stripedRows
                value={tableData}
                className="custom-table incomplete-order"
                children={HEADERS.map((h) => (
                  <Column
                    key={h.field}
                    field={h.field}
                    header={
                      <div className="flex">
                        {h.header}
                        {h.field !== "date" && (
                          <img
                            src={info}
                            alt="Icon"
                            height="16"
                            className="w-3 ml-3 cursor-pointer"
                            onClick={() => handleClick(Number(h.header))}
                          />
                        )}
                      </div>
                    }
                  >
                    {" "}
                  </Column>
                ))}
              ></CustomTable>
            )}
          </div>
          <CustomDialog
            visible={showDialog}
            onHide={() => {
              setShowDialog(false);
              setDialogData(null);
            }}
            className="orderStatus-dialog"
            header="Status Info"
          >
            {dialogData && (
              <div className="text-gray-300 mt-3 mx-2 block text-left ">
                {dialogData.code && (
                  <div className="mb-3 ">
                    <span className="font-bold text-gray-100  ">
                      Status Code:
                    </span>{" "}
                    {dialogData.code}
                  </div>
                )}
                {dialogData.message && (
                  <div className="mb-3 ">{dialogData.message}</div>
                )}
                {dialogData.nextState && (
                  <div className="mb-3">
                    <span className="font-bold text-gray-100 ">
                      Next state:
                    </span>{" "}
                    {dialogData.nextState}
                  </div>
                )}
                {dialogData.sla && (
                  <div>
                    {" "}
                    <span className="font-bold text-gray-100  ">SLA: </span>
                    {dialogData.sla}
                  </div>
                )}
              </div>
            )}
          </CustomDialog>
        </div>
      )}
    </>
  );
};

export default IncompleteOrder;
