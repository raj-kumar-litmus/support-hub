import { FC } from "react";
import { CustomIconProps } from "../../@types/BarChart";

const CustomIcon: FC<CustomIconProps> = (props) => (
  <img {...props} style={{ width: props.width, height: props.height }} />
);

export default CustomIcon;
