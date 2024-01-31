import { Fragment, useContext, useEffect, useState } from "react";
import {
  FocusRoomContextType,
  MicroServiceNames,
} from "../../@types/pages/focusRoom";
import { FocusRoomContext } from "../../context/focusRoom";
import { FOCUS_ROOM_MICROSERVICES_DOUGH_NUT_CHART_OPTIONS } from "../../helpers/config/chartConfig";
import { centerText } from "../../helpers/utils/utils";
import useScreenSize from "../../hooks/useScreenSize";
import DoughnutChart from "../atoms/Doughnut";

const MicroServiceDoughNuts = (props) => {
  const { focusRoomConfig } = useContext(
    FocusRoomContext,
  ) as FocusRoomContextType;
  const [msNames, setMsNames] = useState<MicroServiceNames[]>(null);
  const { width, height } = useScreenSize();

  useEffect(() => {
    if (Array.isArray(focusRoomConfig?.microservices?.results)) {
      setMsNames(focusRoomConfig.microservices.results);
    }
  }, [focusRoomConfig]);

  return (
    <>
      {Array.isArray(msNames) &&
        Array.isArray(props.microservices) &&
        props.microservices.map((e) => (
          <Fragment key={e.serviceInfo?.instance}>
            <DoughnutChart
              containerClassName={`flex justify-center ${
                props.isPopUp ? "h-[87px]" : ""
              }`}
              data={{
                datasets:
                  e.cpu === 100 || e.memory === 100
                    ? [
                        {
                          data: [100],
                          weight: 3,
                          backgroundColor: ["#B23A3A"],
                          borderWidth: 0,
                        },
                      ]
                    : [
                        {
                          data: [e.cpu, 100 - e.cpu],
                          weight: 6,
                          backgroundColor:
                            e?.cpu === 0
                              ? ["transparent", "transparent"]
                              : ["#CD8A51", "#21262D"],
                          borderColor: e?.cpu === 0 ? "transparent" : "#232323",
                          borderWidth: 0,
                        },
                        {
                          weight: 3,
                          data: [100],
                          borderColor: e?.cpu === 0 ? "transparent" : "#232323",
                          borderWidth: 0,
                          backgroundColor:
                            e?.cpu === 0 || e?.memory === 0
                              ? ["transparent"]
                              : ["#14181E"],
                        },
                        {
                          data: [e.memory, 100 - e.memory],
                          weight: 6,
                          borderColor: e?.cpu === 0 ? "transparent" : "#232323",
                          borderWidth: 0,
                          backgroundColor:
                            e?.memory === 0
                              ? ["transparent", "transparent"]
                              : ["#008080", "#14181E"],
                        },
                      ],
              }}
              options={FOCUS_ROOM_MICROSERVICES_DOUGH_NUT_CHART_OPTIONS({
                hasHighCpuOrMemory: e.cpu === 100 || e.memory === 100,
              })}
              plugins={[
                centerText({
                  screenWidth: width,
                  screenHeight: height,
                  text: e.serviceInfo?.name,
                  fillColor:
                    e.cpu === 0 || e.memory === 0 ? "#EF4444" : "#14181E",
                  arcX: props.isPopUp ? width / 40 : width / 39,
                  arcY: width / 36,
                  arcRadius: props.isPopUp
                    ? e.cpu === 0 || e.memory === 0
                      ? width / 50
                      : width / 58
                    : e.cpu === 0 || e.memory === 0
                    ? width / 45
                    : width / 50,
                  arcStart: 0,
                  arcEnd: 2 * Math.PI,
                  activePods: e.serviceInfo?.activePods,
                  totalPods: e.serviceInfo?.maxReplica || 0,
                  isDisabledDoughNut: e.cpu === 0 || e.memory === 0,
                  isPopUp: props.isPopUp,
                }),
              ]}
              isDisabledDoughNut={e.cpu === 0 || e.memory === 0}
              onClickHandler={(_) => {
                const {
                  cpu,
                  memory,
                  traffic,
                  errorRate,
                  serviceInfo: { name, activePods, maxReplica: totalPods },
                } = e;
                props.setOverLayData({
                  cpu,
                  memory,
                  traffic,
                  errorRate,
                  activePods,
                  totalPods,
                  title: msNames?.filter((l) => l.shortName === name)?.[0]
                    ?.description,
                });
                props.op.current?.toggle(_);
              }}
            />
          </Fragment>
        ))}
    </>
  );
};

export default MicroServiceDoughNuts;
