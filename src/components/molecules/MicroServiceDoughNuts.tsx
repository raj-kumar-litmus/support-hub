import { Fragment } from "react";
import { FOCUS_ROOM_MICROSERVICES_DOUGH_NUT_CHART_OPTIONS } from "../../helpers/config/chartConfig";
import { centerText } from "../../helpers/utils/utils";
import useScreenSize from "../../hooks/useScreenSize";
import DoughnutChart from "../atoms/Doughnut";

const MicroServiceDoughNuts = (props) => {
  const { width, height } = useScreenSize();
  return (
    <>
      {props.microservices &&
        Array.isArray(props.microservices) &&
        props.microservices.map((e) => (
          <Fragment key={e.serviceInfo?.instance}>
            <DoughnutChart
              containerClassName="h-75 flex justify-center"
              data={{
                datasets: [
                  {
                    data: [e.cpu, 100 - e.cpu],
                    weight: 3,
                    backgroundColor:
                      e.cpu === 0
                        ? ["transparent", "transparent"]
                        : ["#BB723F", "#21262D"],
                    borderColor: "#232323",
                    borderWidth: 0,
                  },
                  {
                    weight: 3,
                    data: [100],
                    borderColor: "#232323",
                    borderWidth: 0,
                    backgroundColor:
                      e.cpu === 0 || e.memory === 0
                        ? ["transparent"]
                        : ["#29292A"],
                  },
                  {
                    data: [e.memory, 100 - e.memory],
                    weight: 3,
                    borderColor: "#232323",
                    borderWidth: 0,
                    backgroundColor:
                      e.memory === 0
                        ? ["transparent", "transparent"]
                        : ["#31737B", "transparent"],
                  },
                ],
              }}
              options={FOCUS_ROOM_MICROSERVICES_DOUGH_NUT_CHART_OPTIONS}
              plugins={[
                centerText({
                  screenWidth: width,
                  screenHeight: height,
                  text: e.serviceInfo?.name,
                  fillColor:
                    e.cpu === 0 || e.memory === 0 ? "#3E4249" : "#0C1117",
                  arcX: props.isPopUp ? width / 40 : width / 39,
                  arcY: width / 36,
                  arcRadius: props.isPopUp ? width / 58 : width / 50,
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
                  serviceInfo: { instance, activePods, maxReplica: totalPods },
                } = e;
                props.setOverLayData({
                  cpu,
                  memory,
                  traffic,
                  errorRate,
                  activePods,
                  totalPods,
                  title: instance?.split("-").join(" "),
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
