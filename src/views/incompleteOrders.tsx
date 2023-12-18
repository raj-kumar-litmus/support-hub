import { Column } from "primereact/column";
import { FC, useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import CustomDialog from "../components/common/customdialog";

import Loader from "../components/loader";
import CustomCard from "../components/common/customcard";
import CustomTable from "../components/common/customtable";
import CustomImage from "../components/common/customimage";
import info from "../assets/oms_info_white.svg";
import { URL_INCOMPLETE_ORDERS } from "../constants/apiConstants";
import {
  PAGE_TITLES,
  SCREEN_WIDTH,
  THRESHOLD_VALUE,
  LABELS,
  STATUS_MESSAGE,
  INCOMPLETE_ORDERS_DIALOG,
} from "../constants/appConstants";
import {
  IncompleteOrdersData,
  IncompleteOrderDialogData,
} from "../@types/components/commonTypes";
import { fetchData } from "../utils/fetchUtil";

const IncompleteOrder: FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IncompleteOrdersData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<
    IncompleteOrderDialogData | string
  >();
  const { width } = useScreenSize();
  const handleClick = (header: number) => {
    setShowDialog(true);

    switch (header) {
      case 130:
        setDialogData(STATUS_MESSAGE[130]);
        break;
      case 131:
        setDialogData(STATUS_MESSAGE[131]);
        break;
      case 132:
        setDialogData(STATUS_MESSAGE[132]);
        break;
      case 140:
        setDialogData(STATUS_MESSAGE[140]);
        break;
      case 143:
        setDialogData(STATUS_MESSAGE[143]);
        break;
      case 144:
        setDialogData(STATUS_MESSAGE[144]);
        break;
      case 155:
        setDialogData(STATUS_MESSAGE[155]);
        break;
      case 440:
        setDialogData(STATUS_MESSAGE[440]);
        break;
      case 455:
        setDialogData(STATUS_MESSAGE[455]);
        break;
      case 460:
        setDialogData(STATUS_MESSAGE[460]);
        break;
      default:
        setDialogData("No information available");
    }
  };

  const HEADERS = [
    { field: "date", header: "Date" },
    { field: "status130Count", header: "130" },
    { field: "status131Count", header: "131" },
    { field: "status132Count", header: "132" },
    { field: "status140Count", header: "140" },
    { field: "status143Count", header: "143" },
    { field: "status144Count", header: "144" },
    { field: "status155Count", header: "155" },
    { field: "status440Count", header: "440" },
    { field: "status455Count", header: "455" },
    { field: "status460Count", header: "460" },
  ];
  const ValueWiseCellStyle = (rowData, column, value?) => {
    if (rowData[column?.field] > THRESHOLD_VALUE.INCOMPLETE_ORDERS) {
      return "bg-red-700 rounded";
    }
    if (value > THRESHOLD_VALUE.INCOMPLETE_ORDERS) {
      return "bg-red-700 rounded-lg";
    }
    return "";
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
        <>
          <h3 className="text-lg text-gray-200 font-bold mb-2 font-helvetica">
            {PAGE_TITLES.INCOMPLETE_ORDERS}
          </h3>
          {width > SCREEN_WIDTH.SM ? (
            <div>
              <div className="sm:block rounded-md">
                {tableData?.length > 0 && (
                  <CustomTable
                    showGridlines
                    value={tableData}
                    className="custom-table"
                  >
                    {HEADERS.map((h, index) => (
                      <Column
                        key={h.field}
                        bodyClassName={ValueWiseCellStyle}
                        frozen={index ? false : true}
                        field={h.field}
                        header={
                          <div className="flex -ml-1">
                            {h.header}
                            {h.field !== "date" && (
                              <CustomImage
                                src={info}
                                alt="Icon"
                                height="16"
                                className="w-3 ml-2 pt-0.5 cursor-pointer"
                                onClick={() => handleClick(Number(h.header))}
                              />
                            )}
                          </div>
                        }
                      ></Column>
                    ))}
                  </CustomTable>
                )}
              </div>
            </div>
          ) : (
            <div>
              {tableData?.length > 0 &&
                tableData.map((item) => (
                  <CustomCard
                    key={item.date}
                    className="bg-black-200 mt-3 incomplete-order-card max-h-40 sm:hidden font-helvetica"
                  >
                    <div>
                      <div className="flex justify-center  text-sm text-white-500 pb-1 border-b border-black-400">
                        <div className="text-gray-400 ">{LABELS.DATE}:</div>
                        <div className="ml-4">{item.date}</div>
                      </div>
                      <div className="flex-grow grid grid-cols-5 gap-x-1 gap-y-3 mt-3  text-white-500">
                        {Object.keys(item)
                          .filter((key) => key !== "date")
                          .map((key) => (
                            <div
                              key={key}
                              className={`flex flex-col items-center text-sm ${ValueWiseCellStyle(
                                "",
                                "",
                                item[key],
                              )}`}
                            >
                              <span
                                className="text-gray-400 flex flex-row "
                                onClick={() => {
                                  handleClick(
                                    Number(
                                      HEADERS.find(
                                        (header) => header.field === key,
                                      )?.header,
                                    ),
                                  );
                                }}
                              >
                                {HEADERS.find((header) => header.field === key)
                                  ?.header || key}
                                <CustomImage
                                  src={info}
                                  alt="Info"
                                  className="w-3 ml-1 pt-1 cursor-pointer"
                                />
                              </span>
                              <span className="">{item[key]}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </CustomCard>
                ))}
            </div>
          )}
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
                      {INCOMPLETE_ORDERS_DIALOG.statusCode}
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
                      {INCOMPLETE_ORDERS_DIALOG.nextState}
                    </span>{" "}
                    {dialogData.nextState}
                  </div>
                )}
                {dialogData.sla && (
                  <div>
                    <span className="font-bold">
                      {INCOMPLETE_ORDERS_DIALOG.sla}
                    </span>
                    {dialogData.sla}
                  </div>
                )}
              </div>
            )}
          </CustomDialog>
        </>
      )}
    </>
  );
};

export default IncompleteOrder;
