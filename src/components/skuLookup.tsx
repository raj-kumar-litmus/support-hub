import { FC, KeyboardEvent, useEffect, useState } from "react";
import CustomCard from "./common/customcard";
import SearchBar from "./common/searchbar";
import {
  SKU_LOOKUP_CATALOG,
  SKU_LOOKUP_INVENTORY_STATUS,
} from "../constants/apiConstants";
import {
  SKU_DETAILS,
  SKU_INVENTORY,
  SKU_PRICE_DETAILS,
  SKU_PRODUCT_INFO,
} from "../constants/appConstants";
import { fetchData } from "../utils/fetchUtil";
import useScreenSize from "../hooks/useScreenSize";
import Loader from "./loader";

export type HorizontalTableProps = {
  className?: string;
  tableClassName?: string;
  tableHead?: string;
  rowHeadClassName?: string;
  dataClassName?: string;
  tableHeadClassName?: string;
  tableData: any[];
};

const HorizontalTable: FC<HorizontalTableProps> = (props) => {
  const tableHeadColSpan =
    props.tableData?.length > 0 &&
    Object.entries(props.tableData[0]).length * 2;
  return (
    <div className="rounded-lg border border-black-400 overflow-x-auto mt-4">
      <table className={`${props.tableClassName} w-full`}>
        {props.tableHead && (
          <thead
            className={`text-gray-200 text-center border-b border-black-400 bg-black-100 ${props.tableHeadClassName}`}
          >
            <th colSpan={tableHeadColSpan} className="p-2">
              {props.tableHead}
            </th>
          </thead>
        )}
        {props.tableData?.length > 0 &&
          props.tableData.map((row, index) => (
            <tr
              key={index}
              className={`text-sm ${
                index % 2 === 0 ? "bg-black-300" : "bg-black-100"
              }`}
            >
              {Object.entries(row).map(([key, value], i) => (
                <>
                  <th className={`text-gray-200 ${props.rowHeadClassName}`}>
                    {key}
                  </th>
                  <td className={`text-gray-300 ${props.dataClassName}`}>
                    {value}
                  </td>
                </>
              ))}
            </tr>
          ))}
      </table>
    </div>
  );
};

const SKULookup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skuid, setSkuId] = useState<string>("");
  const [skuDetailsTable, setSkuDetailsTable] = useState<any>({});
  const [priceDetailsTable, setPriceDetailsTable] = useState<any>({});
  const [atgInventory, setAtgInventory] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState<any>({});
  const [yantriksInventory, setYantriksInventory] = useState<any[]>([
    {
      [SKU_INVENTORY.COUNTRY]: "",
      [SKU_INVENTORY.STOCK_LEVEL]: "",
    },
    {
      [SKU_INVENTORY.COUNTRY]: "",
      [SKU_INVENTORY.STOCK_LEVEL]: "",
    },
  ]);
  const { width } = useScreenSize();

  useEffect(() => {
  }, [yantriksInventory]);

  useEffect(() => {
    setStatesData();
  }, []);

  const setStatesData = (catalog: any = {}) => {
    setSkuDetailsTable([
      {
        [SKU_DETAILS.SKU]: catalog?.skuId?.toString() || "",
        [SKU_DETAILS.DISPLAY_NAME]: catalog?.product?.displayName || "",
        [SKU_DETAILS.BRAND]: catalog?.product?.brand?.displayName || "",
      },
      {
        [SKU_DETAILS.EFFECTIVELY_ACTIVE]:
          catalog?.effectivelyActive?.toString() || "",
        [SKU_DETAILS.START_DATE]: catalog?.startDate || "",
        [SKU_DETAILS.END_DATE]: catalog?.endDate || "", //need to check
      },
      {
        [SKU_DETAILS.SKU_STATE]: catalog?.skuState?.toString() || "",
        [SKU_DETAILS.RESERVATION_ENABLED]:
          catalog?.reservationEnabled?.toString() || "",
        [SKU_DETAILS.STORE_ONLY]: catalog?.storeOnly?.toString() || "",
      },
    ]);

    setPriceDetailsTable([
      {
        [SKU_PRICE_DETAILS.US_LIST_PRICE]: catalog?.listPriceUS || "",
        [SKU_PRICE_DETAILS.US_SALE_PRICE]: catalog?.salePriceUS || "",
        [SKU_PRICE_DETAILS.CA_LIST_PRICE]: catalog?.listPriceCA || "",
        [SKU_PRICE_DETAILS.CA_SALE_PRICE]: catalog?.salePriceCA || "",
      },
    ]);

    setAtgInventory([
      {
        [SKU_INVENTORY.COUNTRY]: catalog?.inventory?.[0]?.country || "",
        [SKU_INVENTORY.STOCK_LEVEL]: catalog?.inventory?.[0]?.stockLevel || "",
        [SKU_INVENTORY.ON_HOLD]:
          catalog?.inventory?.[0]?.onHold?.toString() || "",
      },
      {
        [SKU_INVENTORY.COUNTRY]: catalog?.inventory?.[1]?.country || "",
        [SKU_INVENTORY.STOCK_LEVEL]: catalog?.inventory?.[1]?.stockLevel || "",
        [SKU_INVENTORY.ON_HOLD]:
          catalog?.inventory?.[1]?.onHold?.toString() || "",
      },
    ]);

    setProductInfo([
      {
        [SKU_PRODUCT_INFO.PRODUCT]: catalog?.product?.productId || "",
        [SKU_PRODUCT_INFO.ACTIVATION_DATE]:
          catalog?.product?.activationDate || "",
        [SKU_PRODUCT_INFO.END_DATE]: catalog?.product?.endDate || "",
      },
      {
        [SKU_PRODUCT_INFO.URL]: catalog?.product?.productUrl || "",
        [SKU_PRODUCT_INFO.EFFECTIVELY_ACTIVE]:
          catalog?.product?.isEffectivelyActive?.toString() || "",
        [SKU_PRODUCT_INFO.ENABLED]: catalog?.product?.enabled?.toString() || "",
      },
    ]);
  };

  const setYantriksData = (
    inv: any = {},
    reset: boolean = false,
    country: string
  ) => {
    const inventory = {
      [SKU_INVENTORY.COUNTRY]: country || "",
      [SKU_INVENTORY.STOCK_LEVEL]:
        inv.availabilityByProducts?.[0]?.availabilityDetails?.atp || "",
    };
    let firstEmptyCountry = yantriksInventory.findIndex((inventory) => {
      return inventory[SKU_INVENTORY.COUNTRY] == "";
    });
    yantriksInventory[firstEmptyCountry] = inventory;
    setYantriksInventory([...yantriksInventory]);
  };

  const fetchSKUDetails = async () => {
    setIsLoading(true);
    try {
      const catalogURL = SKU_LOOKUP_CATALOG.replace(":skuid", skuid);
      const catalogResponse = await fetchData(catalogURL, {});
      setIsLoading(false);
      catalogResponse?.inventory?.forEach((item, index) => {
        fetchInventoryStatus(item.country, index);
      });
      setStatesData(catalogResponse);
    } catch (error) {
      setIsLoading(false);
      console.log("error fetching data ", error);
    }
  };
  const fetchInventoryStatus = async (country, index) => {
    setIsLoading(true);
    try {
      const inventoryURL = SKU_LOOKUP_INVENTORY_STATUS.replace(
        ":country",
        country
      ).replace(":skuid", skuid);
      const inventoryResponse = await fetchData(inventoryURL, {});
      setIsLoading(false);
      setYantriksData(inventoryResponse, true, country);
    } catch (error) {
      setIsLoading(false);
      console.log("error fetching data ", error);
    }
  };

  const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skuid?.trim().length > 0) {
      event.preventDefault();
      fetchSKUDetails();
    }
  };

  return (
    <div className="sku-lookup h-full">
      <div className="flex justify-center items-center gap-2">
        <SearchBar
          searchValue={skuid}
          setSearchValue={setSkuId}
          onSearch={onSearch}
          placeholder="Search SKU#"
          className="text-white-500"
        />
      </div>
      {isLoading ? (
        <Loader className="h-full" />
      ) : (
        <>
          {width < 640 ? (
            <>
              <SkuCard title={SKU_DETAILS.TITLE} cardData={skuDetailsTable} />
              <SkuCard
                title={SKU_PRICE_DETAILS.TITLE}
                cardData={priceDetailsTable}
              />
              <SkuCard
                title={SKU_INVENTORY.ATG_INVENTORY}
                cardData={atgInventory}
              />
              <SkuCard
                title={SKU_INVENTORY.YANTRIKS_INVENTORY}
                cardData={yantriksInventory}
              />
              <SkuCard title={SKU_PRODUCT_INFO.TITLE} cardData={productInfo} />
            </>
          ) : (
            <>
              <HorizontalTable
                tableData={skuDetailsTable}
                tableHead={SKU_DETAILS.TITLE}
                rowHeadClassName="p-4 text-right font-medium w-[15%] lg:whitespace-nowrap"
                dataClassName="text-left p-4 border-r border-black-400 min-w-[15%]"
              />
              <HorizontalTable
                tableData={priceDetailsTable}
                tableHead={SKU_PRICE_DETAILS.TITLE}
                rowHeadClassName="p-4 text-right font-medium w-[12.5%] lg:whitespace-nowrap"
                dataClassName="text-left p-4 border-r border-black-400 w-[12.5%]"
              />
              <HorizontalTable
                tableData={atgInventory}
                tableHead={SKU_INVENTORY.ATG_INVENTORY}
                rowHeadClassName="p-4 text-right font-medium w-[15%] lg:whitespace-nowrap"
                dataClassName="text-left p-4 border-r border-black-400 w-[15%]"
              />
              <HorizontalTable
                tableData={yantriksInventory}
                tableHead={SKU_INVENTORY.YANTRIKS_INVENTORY}
                rowHeadClassName="p-4 text-right font-medium w-1/4 lg:whitespace-nowrap"
                dataClassName="text-left p-4 border-r border-black-400 w-1/4"
              />
              <HorizontalTable
                tableData={productInfo}
                tableHead={SKU_PRODUCT_INFO.TITLE}
                rowHeadClassName="p-4 text-right font-medium w-[15%] lg:whitespace-nowrap"
                dataClassName="text-left p-4 border-r border-black-400 w-[15%]"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

interface SkuCardProps {
  title: string;
  cardData: any[];
}

const SkuCard = (props: SkuCardProps) => {
  return (
    <CustomCard
      className="sku-lookup-card shadow-lg bg-black-200 w-full m-auto text-gray-300 rounded-lg mb-3 mt-6"
      header={<div>{props.title}</div>}
    >
      {props.cardData?.length > 0 &&
        props.cardData?.map((obj, index) => {
          return (
            <div key={index} className="flex p-0 justify-between">
              {Object.entries(obj).map(([key, value], i) => (
                <InfoField
                  key={i}
                  title={key}
                  data={value || "-"}
                  wrapperClassName={
                    "flex flex-col justify-between w-[30%] mb-2 min-h-[3rem] gap-[1rem]"
                  }
                  dataClassName={"mb-2"}
                />
              ))}
            </div>
          );
        })}
    </CustomCard>
  );
};

export type InfoFieldProps = {
  title: string;
  data: string | number;
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  dataClassName?: string;
};

const InfoField: FC<InfoFieldProps> = (props) => {
  return (
    <div className={`text-xs font-normal ${props.wrapperClassName}`}>
      <div className={`text-gray-400 ${props.titleClassName}`}>
        {props.title}
      </div>
      <div
        className={`text-gray-300 ${props.dataClassName}`}
        title={props.data.toString()}
      >
        {props.data}
      </div>
    </div>
  );
};

export default SKULookup;
