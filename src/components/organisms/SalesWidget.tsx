import GridTable from "../molecules/GridTable";

const SalesWidget = () => {
  const sales = [
    { title: "Total Forecast", data: "$15.01M" },
    { title: "Total Sales", data: "$14.27M" },
    { title: "Total Orders", data: "183,951" },
    { title: "Avg Order", data: "78" },
  ];
  return (
    <div className="grid bg-black-106 border border-black-108 text-white-900 rounded-12 h-full px-4 pt-1 pb-4">
      <GridTable
        title="Sales"
        columns={4}
        data={sales}
        lastUpdatedTime="11:00 PM"
        dataClassName="text-sm font-IBM"
      />
    </div>
  );
};

export default SalesWidget;
