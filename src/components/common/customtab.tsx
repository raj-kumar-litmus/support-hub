import { TabPanel, TabView } from 'primereact/tabview';
import React, { FC } from 'react';
import { ITab } from "../../@types/tab";

type Props = {
  tabData: Array<ITab>;
  className?: string;
  onTabChange?: React.FormEventHandler<HTMLDivElement>
  tabValue: number;
  setTabValue: (value: number) => void;

};

const CustomTab: FC<Props> = ({
  tabData, className, tabValue, setTabValue
}) => {

  return (
    <TabView className={className} activeIndex={tabValue} onTabChange={(e) => setTabValue(e.index)}>
      {tabData.length > 0 && tabData.map(tab =>
        <TabPanel header={tab.header} key={tab.header}>
          <div className={`${tab.data ? 'block' : 'hidden'}`}>  {tab.data && tab.data}</div>
        </TabPanel>
      )}
    </TabView>
  )
}
export default CustomTab;
