import { TabPanel, TabView } from "primereact/tabview";
import { FC } from "react";
import { CustomTabProps } from "../../@types/components/commonTypes";

const CustomTab: FC<CustomTabProps> = (props) => {
  return (
    <TabView
      className={props.className}
      activeIndex={props.tabValue}
      onTabChange={(e) => props.setTabValue(e.index)}
    >
      {props.tabData.length > 0 &&
        props.tabData.map((tab) => (
          <TabPanel header={tab.header} key={tab.header}>
            {tab.data && <div>{tab.data}</div>}
          </TabPanel>
        ))}
    </TabView>
  );
};
export default CustomTab;
