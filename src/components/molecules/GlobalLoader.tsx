import React from "react";
import CustomImage from "../atoms/CustomImage";
import GlobalLoaderIcon from "../../assets/loader.gif";
import { LoaderProps } from "../../@types/components/commonTypes";

const GlobalLoader: React.FC<LoaderProps> = (props) => {
  return (
    <CustomImage className={`${props.className}`} src={GlobalLoaderIcon} />
  );
};

export default GlobalLoader;
