import GridCards from "../molecules/GridCards";
import { FOCUS_ROOM_TITLES } from "../../helpers/constants/appConstants";
import { useState } from "react";
import KafkaSideBar from "./KafkaSideBar";

const KafkaWidget = () => {
  const kafka = [{ data: "ATG" }, { data: "BI" }, { data: "DS" }];

  const [visible, setVisible] = useState<boolean>(false);

  const handleGridClick = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="focus-room-widget-wrapper px-4 pt-1 pb-2">
        <GridCards
          title={FOCUS_ROOM_TITLES.KAFKA}
          columns={3}
          data={kafka}
          dataClassName="text-xs"
          onClick={handleGridClick}
        />
      </div>
      {visible && <KafkaSideBar visible={visible} setVisible={setVisible} />}
    </>
  );
};

export default KafkaWidget;
