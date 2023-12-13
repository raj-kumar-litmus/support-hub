import  { forwardRef, ReactNode } from 'react';
import { OverlayPanel, OverlayPanelProps } from 'primereact/overlaypanel';

interface CustomOverlayProps extends OverlayPanelProps {
  children: ReactNode;
}

const CustomOverlay = forwardRef<OverlayPanel, CustomOverlayProps>(
  ({ children, ...rest }, ref) => {
    return (
      <OverlayPanel ref={ref} {...rest}>
        {children}
      </OverlayPanel>
    );
  }
);
export default CustomOverlay;