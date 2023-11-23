import React, { useEffect, useRef } from "react";
import { Toast, ToastProps } from "primereact/toast";

interface Props extends ToastProps {
  showToast?: boolean;
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  messageIcon?: any;
}

const CustomToast = (props: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (props.showToast) {
      ref.current.show({
        severity: props.severity,
        summary: props.summary,
        detail: props.detail,
        life: props.life,
        icon: props.messageIcon,
        closable: props.closable,
      });
      props.onHide();
    }
  }, [props.showToast]);

  return <Toast ref={ref} position={props.position || "center"} />;
};

export default CustomToast;
