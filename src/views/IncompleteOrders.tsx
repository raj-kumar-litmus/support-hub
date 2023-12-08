import React, { FC, useEffect, useState } from "react";
import { fetchData } from "../utils/fetchUtil";
import { IncompleteOrdersData } from "../@types/IncompleteOrdersData";
import { URL_INCOMPLETE_ORDERS } from "../constants/apiConstants";
import CustomDialog from "../components/common/customdialog";
import Loader from "../components/loader";
import info from "../assets/oms_info_white.svg";
import CustomTable from "../components/common/customtable";
import { Column } from "primereact/column";
import statusMessages from "../components/utils/IncompleteOrdersStatusData";
import { PAGE_TITLES,THRESHOLD_VALUE } from "../constants/appConstants";

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
  const paymentWiseDataStyle = (rowData, column) => {
   
     if (rowData[column?.field] > THRESHOLD_VALUE.INCOMPLETE_ORDERS) {
      return 'bg-red-600' 
      // return 'border-4 border-lime-400'

    }
    //  else if (!rowData[column?.field]) {
    //   return 'bg-green-800';
    // } 
    return '';
  };
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
        <div>
           <h3 className="sm:text-lg text-gray-200 font-bold mb-2 font-helvetica">
              {PAGE_TITLES.INCOMPLETE_ORDERS}
          </h3>
          <div className="sm:block rounded-md">
            {tableData?.length > 0 && (
              <CustomTable
              showGridlines
                // resizableColumns
                value={tableData}
                className="custom-table"
                children={HEADERS.map((h,index) => (
                  <Column
                    // bodyClassName={paymentWiseDataStyle}
                    key={h.field}
                    frozen={index ? false : true}
                    field={h.field}
                    header={
                      <div className="flex -ml-1">
                        {h.header}
                        {h.field !== "date" && (
                          <img
                            src={info}
                            alt="Icon"
                            height="16"
                            className="w-3 ml-2 mr-1 sm:ml-3 cursor-pointer"
                            onClick={() => handleClick(Number(h.header))}
                          />
                        )}
                      </div>
                    }
                    // body={(rowData) => {
                    //   const textColor =
                    //     rowData[h.field] > THRESHOLD_VALUE.INCOMPLETE_ORDERS
                    //         ? "border-2 border-red-500"
                    //         //  ? "text-red-600"
                    //       : "";

                    //   return (
                    //     <div className={`${textColor}`}>
                    //       {rowData[h.field]}
                    //     </div>
                    //   );
                    // }}
                  >
                    
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
            className="custom-popup"
            header="Status Info"
          >
            {dialogData && (
              <div className="text-gray-300 mt-3 mx-2 block text-left">
                {dialogData.code && (
                  <div className="mb-3">
                    <span className="font-bold text-white ">
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
                    <span className="font-bold ">
                      Next state:
                    </span>{" "}
                    {dialogData.nextState}
                  </div>
                )}
                {dialogData.sla && (
                  <div>
                    {" "}
                    <span className="font-bold">SLA: </span>
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
