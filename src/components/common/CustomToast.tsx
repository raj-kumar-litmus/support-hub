import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { CustomToastProps } from "../../@types/components/CommonTypes";

const CustomToast = (props: CustomToastProps) => {
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
