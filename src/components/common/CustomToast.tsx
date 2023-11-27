import { Toast, ToastProps } from "primereact/toast";
import { useEffect, useRef } from "react";

interface Props extends ToastProps {
  showToast?: boolean;
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
  closable?: boolean;
  messageIcon?: any;
  className?: string;
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

  return (
    <Toast
      className={props.className}
      ref={ref}
      position={props.position || "center"}
    />
  );
};

export default CustomToast;
