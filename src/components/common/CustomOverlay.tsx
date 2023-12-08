// import { OverlayPanel,OverlayPanelProps } from 'primereact/overlaypanel';

// const CustomOverlay = (props:OverlayPanelProps)=>(
//   <OverlayPanel>
//     {props.children}
//   </OverlayPanel>
// )

// export default CustomOverlay;


// CustomOverlay.tsx
import React, { forwardRef, ReactNode } from 'react';
import { OverlayPanel, OverlayPanelProps } from 'primereact/overlaypanel';

interface CustomOverlayProps extends OverlayPanelProps {
  children: ReactNode;
}

const CustomOverlay = forwardRef<OverlayPanel, CustomOverlayProps>(
  ({ children, ...rest }, ref,) => {
    return (
      <OverlayPanel ref={ref} {...rest}>
        {children}
      </OverlayPanel>
    );
  }
);

export default CustomOverlay;
