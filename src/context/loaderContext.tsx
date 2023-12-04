import { createContext, useState } from "react";
import { LoaderContextType } from "../@types/components/commonTypes";

export const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider = ({ children }) => {
  const [showGlobalLoader, setShowGlobalLoader] = useState<boolean>(true);

  const showLoader = () => {
    setShowGlobalLoader(true);
  };

  const hideLoader = () => {
    setShowGlobalLoader(false);
  };

  return (
    <LoaderContext.Provider
      value={{ showGlobalLoader, showLoader, hideLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
};
