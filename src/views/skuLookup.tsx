import { FC, Fragment, KeyboardEvent, useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import CustomCard from "../components/atoms/CustomCard";
import SearchBar from "../components/molecules/SearchBar";
import Loader from "../components/atoms/Loader";
import {
  SKU_LOOKUP_CATALOG,
  SKU_LOOKUP_INVENTORY_STATUS,
} from "../helpers/constants/apiConstants";
import {
  SCREEN_WIDTH,
  SKU_DETAILS,
  SKU_INVENTORY,
  SKU_PRICE_DETAILS,
  SKU_PRODUCT_INFO,
} from "../helpers/constants/appConstants";
import {
  HorizontalTableProps,
  HeaderProps,
} from "../@types/components/commonTypes";
import { SkuCardProps } from "../@types/pages/skuLookup";
import { fetchData } from "../helpers/utils/fetchUtil";

const HorizontalTable: FC<HorizontalTableProps> = (props) => {
  const tableHeadColSpan =
    props.tableData?.length > 0 &&
    Object.entries(props.tableData[0]).length * 2;
  return (
    <div className="rounded-lg border border-black-400 overflow-x-auto mt-4">
      <table className={`${props.tableClassName || ""} w-full`}>
        {props.tableHead && (
          <thead
            className={`text-gray-200 text-center border-b border-black-400 bg-black-100 ${
              props.tableHeadClassName || ""
            }`}
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
              {Object.entries(row).map(
                (
                  [key, value]: [
                    string,
                    Array<string | number> | string | number,
                  ],
                  i,
                ) => (
                  <Fragment key={i}>
                    <th
                      className={`text-gray-200 ${
                        props.rowHeadClassName || ""
                      }`}
                    >
                      {key}
                    </th>
                    <td
                      className={`text-gray-300 ${props.dataClassName || ""}`}
                    >
                      {value}
                    </td>
                  </Fragment>
                ),
              )}
            </tr>
          ))}
      </table>
    </div>
  );
};

const SkuLookup = () => {
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
  const [data, setData] = useState<any[]>([
    [SKU_DETAILS.TITLE, skuDetailsTable],
    [SKU_PRICE_DETAILS.TITLE, priceDetailsTable],
    [SKU_INVENTORY.ATG_INVENTORY, atgInventory],
    [SKU_INVENTORY.YANTRIKS_INVENTORY, yantriksInventory],
    [SKU_PRODUCT_INFO.TITLE, productInfo],
  ]);
  const { width } = useScreenSize();

  useEffect(() => {
    setStatesData();
  }, []);

  useEffect(() => {
    setData([
      [SKU_DETAILS.TITLE, skuDetailsTable],
      [SKU_PRICE_DETAILS.TITLE, priceDetailsTable],
      [SKU_INVENTORY.ATG_INVENTORY, atgInventory],
      [SKU_INVENTORY.YANTRIKS_INVENTORY, yantriksInventory],
      [SKU_PRODUCT_INFO.TITLE, productInfo],
    ]);
  }, [
    skuDetailsTable,
    priceDetailsTable,
    atgInventory,
    productInfo,
    yantriksInventory,
  ]);

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
        [SKU_DETAILS.END_DATE]: catalog?.endDate || "",
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
        [SKU_PRICE_DETAILS.US_LIST_PRICE]:
          catalog?.listPriceUS?.toString() || "",
        [SKU_PRICE_DETAILS.US_SALE_PRICE]:
          catalog?.salePriceUS?.toString() || "",
        [SKU_PRICE_DETAILS.CA_LIST_PRICE]:
          catalog?.listPriceCA?.toString() || "",
        [SKU_PRICE_DETAILS.CA_SALE_PRICE]:
          catalog?.salePriceCA?.toString() || "",
      },
    ]);

    setAtgInventory([
      {
        [SKU_INVENTORY.COUNTRY]: catalog?.inventory?.[0]?.country || "",
        [SKU_INVENTORY.STOCK_LEVEL]:
          catalog?.inventory?.[0]?.stockLevel?.toString() || "",
        [SKU_INVENTORY.ON_HOLD]:
          catalog?.inventory?.[0]?.onHold?.toString() || "",
      },
      {
        [SKU_INVENTORY.COUNTRY]: catalog?.inventory?.[1]?.country || "",
        [SKU_INVENTORY.STOCK_LEVEL]:
          catalog?.inventory?.[1]?.stockLevel?.toString() || "",
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

  const setYantriksData = (inv: any = {}, country: string) => {
    const inventory = {
      [SKU_INVENTORY.COUNTRY]: country || "",
      [SKU_INVENTORY.STOCK_LEVEL]:
        inv.availabilityByProducts?.[0]?.availabilityDetails?.atp?.toString() ||
        "",
    };
    const firstEmptyCountry = yantriksInventory.findIndex(
      (inventory) => inventory[SKU_INVENTORY.COUNTRY] == "",
    );
    yantriksInventory[firstEmptyCountry] = inventory;
    setYantriksInventory([...yantriksInventory]);
  };

  const fetchSKUDetails = async () => {
    setIsLoading(true);
    try {
      const catalogURL = SKU_LOOKUP_CATALOG.replace(":skuid", skuid);
      const catalogResponse = await fetchData(catalogURL, {});
      setIsLoading(false);
      catalogResponse?.inventory?.forEach((item) => {
        fetchInventoryStatus(item.country);
      });
      setStatesData(catalogResponse);
    } catch (error) {
      setIsLoading(false);
      console.log("error fetching data ", error);
    }
  };
  const fetchInventoryStatus = async (country) => {
    setIsLoading(true);
    try {
      const inventoryURL = SKU_LOOKUP_INVENTORY_STATUS.replace(
        ":country",
        country,
      ).replace(":skuid", skuid);
      const inventoryResponse = await fetchData(inventoryURL, {});
      setIsLoading(false);
      setYantriksData(inventoryResponse, country);
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
    <div className="sku-lookup h-full pb-4">
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
          {width < SCREEN_WIDTH.SM ? (
            <div className="py-4">
              {data?.map((cardData, ind) => (
                <SkuCard key={ind} title={cardData[0]} cardData={cardData[1]} />
              ))}
            </div>
          ) : (
            <>
              {data?.map((tableData, ind) => (
                <HorizontalTable
                  key={ind}
                  tableHead={tableData[0]}
                  tableData={tableData[1]}
                  rowHeadClassName="p-4 text-right font-medium w-[15%] lg:whitespace-nowrap"
                  dataClassName="text-left p-4 border-r border-black-400 min-w-[15%]"
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

const SkuCard = (props: SkuCardProps) => {
  return (
    <>
      <Header title={props.title} />
      {props.cardData?.length > 0 &&
        props.cardData?.map((obj, index) => {
          return (
            <CustomCard
              key={index}
              className="sku-lookup-card my-1 text-gray-200 bg-black-200 w-full rounded-lg"
            >
              <div
                className={`grid grid-cols-[repeat(auto-fill,minmax(91px,1fr))] gap-2 ${
                  props.wrapperClass || ""
                }`}
              >
                {Object.entries(obj)?.map(
                  (
                    [key, value]: [
                      string,
                      Array<string | number> | string | number,
                    ],
                    i,
                  ) => (
                    <div key={i}>
                      <div className="text-gray-400 text-10 min-h-[1.8rem]">
                        {key}
                      </div>
                      <div
                        className="text-gray-300 text-xs font-medium"
                        title={value.toString()}
                      >
                        {Array.isArray(value) && value?.length > 1
                          ? value[0] + " " + value[1]
                          : value}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CustomCard>
          );
        })}
    </>
  );
};

const Header: FC<HeaderProps> = (props) => {
  return (
    <div className="text-gray-400 rounded-lg border border-black-400 p-2 my-2 w-full text-center bg-black-300">
      {props.title}
    </div>
  );
};

export default SkuLookup;
