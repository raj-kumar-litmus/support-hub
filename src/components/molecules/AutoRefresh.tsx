import { useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
import CustomCheckbox from "../atoms/CustomCheckBox";
import CustomInputNumber from "../atoms/CustomInputNumber";
import CustomToast from "../atoms/CustomToast";
import CustomImage from "../atoms/customimage";
import InfoIcon from "../../assets/info.svg";
import { LABELS } from "../../helpers/constants/appConstants";

interface AutoRefreshProps {
  getData(): any;
  startPollingHandler(): any;
  inputClassname?: string;
  inputContainerClassname?: string;
  checkBoxLabelClassname?: string;
  checkBoxContainerClassname?: string;
}

const AutoRefresh = (props: AutoRefreshProps) => {
  const [showPollingForm, setShowPollingForm] = useState<boolean>(false);
  const [startPolling, setStartPolling] = useState<boolean>(false);
  const [autoRefreshDuration, setAutoRefreshDuration] = useState<number>(0);
  const [showAutoRefreshToast, setShowAutoRefreshToast] =
    useState<boolean>(false);
  const [pollingRefershDuration, setPollingRefreshDuration] =
    useState<number>(0);
  const AUTO_REFRESH_MAX_DURATIONS_MINS = import.meta.env
    .VITE_AUTO_REFRESH_MAX_DURATIONS_MINS;

  useInterval(() => {
    if (startPolling) {
      (async () => {
        await props.getData(false);
      })();
    }
  }, pollingRefershDuration || 60000);

  useEffect(() => {
    if (pollingRefershDuration) {
      setTimeout(() => {
        props.startPollingHandler();
      }, 2000);
    }
  }, [pollingRefershDuration]);

  useEffect(() => {
    if (!showPollingForm) {
      setStartPolling(false);
    }
  }, [showPollingForm]);

  const onPollingChangeHandler = (e) => {
    setAutoRefreshDuration(
      e.value > AUTO_REFRESH_MAX_DURATIONS_MINS
        ? AUTO_REFRESH_MAX_DURATIONS_MINS
        : e.value,
    );
    setPollingRefreshDuration(e.value * 60 * 1000);
    if (e.value) {
      setShowAutoRefreshToast(true);
    }
  };

  const onCheckHandler = () => {
    if (!showPollingForm) {
      setStartPolling(true);
      setAutoRefreshDuration(1);
      setShowAutoRefreshToast(true);
    }
    setShowPollingForm(!showPollingForm);
  };

  return (
    <>
      <div className="md:flex md:gap-1w md:relative md:top-[1vh]">
        <CustomCheckbox
          checked={showPollingForm}
          onClick={onCheckHandler}
          containerclassname={props.checkBoxContainerClassname}
          label={LABELS.AUTO_REFRESH}
          labelclassname={props.checkBoxLabelClassname}
        />
        {showPollingForm && (
          <div className="ml-1w opmFilters items-center">
            <CustomInputNumber
              containerclassname={props.inputContainerClassname}
              min={1}
              max={AUTO_REFRESH_MAX_DURATIONS_MINS}
              value={autoRefreshDuration}
              inputClassName={props.inputClassname}
              onChange={onPollingChangeHandler}
              placeholder={`Choose Refresh duration between 1 to ${AUTO_REFRESH_MAX_DURATIONS_MINS}`}
            />
          </div>
        )}
      </div>
      <CustomToast
        className="autoRefreshToast"
        onHide={() => setShowAutoRefreshToast(false)}
        showToast={showAutoRefreshToast}
        severity="info"
        messageIcon={<CustomImage src={InfoIcon} />}
        detail={`The chart will be auto refreshed every ${
          autoRefreshDuration * 60
        } seconds`}
        life={60000}
        position="top-center"
      />
    </>
  );
};

export default AutoRefresh;
