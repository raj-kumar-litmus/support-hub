import { useEffect } from "react";
import ReactDOM from "react-dom";

const LoaderPortal = ({ children }) => {
  const portalRoot = document.getElementById("loading");
  const wrapperElement = document.createElement("div");

  useEffect(() => {
    portalRoot.appendChild(wrapperElement);

    return () => {
      portalRoot.removeChild(wrapperElement);
    };
  }, [wrapperElement, portalRoot]);

  return ReactDOM.createPortal(children, wrapperElement);
};

export default LoaderPortal;
