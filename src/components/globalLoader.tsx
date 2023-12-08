import React from "react";
import GlobalLoaderIcon from "../assets/loader.gif";
import CustomImage from "./common/CustomImage";
import { LoaderProps } from "../@types/components/CommonTypes";

const GlobalLoader: React.FC<LoaderProps> = (props) => {
  return (
    <CustomImage className={`${props.className}`} src={GlobalLoaderIcon} />
  );
};

export default GlobalLoader;
