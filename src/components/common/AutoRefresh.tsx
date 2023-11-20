import React, { useEffect, useState, Fragment } from "react";
import useInterval from "../../hooks/useInterval";
import CustomCheckbox from "./CustomCheckBox";
import CustomInputNumber from "./CustomInputNumber";
import CustomToast from "./CustomToast";

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
      <div className="md:flex gap-[1vw]">
        <CustomCheckbox
          checked={showPollingForm}
          onClick={onCheckHandler}
          containerclassname={props.checkBoxContainerClassname}
          label="Auto Refresh"
          labelclassname={props.checkBoxLabelClassname}
        />
        {showPollingForm && (
          <div className="ml-[6vw] sm:ml-[1vw] ml-[1vw] opmFilters items-center">
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
        onHide={() => setShowAutoRefreshToast(false)}
        showToast={showAutoRefreshToast}
        severity="info"
        summary="Chart"
        // closable={false}
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
