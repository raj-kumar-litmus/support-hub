import { OverlayPanel } from "primereact/overlaypanel";
import { forwardRef } from "react";
import { CustomOverlayProps } from "../../@types/components/commonTypes";

const CustomOverlay = forwardRef<OverlayPanel, CustomOverlayProps>(
  function OverLay({ children, ...rest }, ref) {
    return (
      <OverlayPanel ref={ref} {...rest}>
        {children}
      </OverlayPanel>
    );
  },
);

export default CustomOverlay;
