import { FC } from "react";
import AppContent from "./components/appcontent";
import { LoaderProvider } from "./context/loaderContext";
import { AppProps } from "./@types/components/commonTypes";

const App: FC<AppProps> = (props) => {
  const { appContent, showSidePane = true, showNavbar = true } = props;
  return (
    <LoaderProvider>
      <AppContent
        showSidePane={showSidePane}
        showNavbar={showNavbar}
        appContent={appContent}
      />
    </LoaderProvider>
  );
};
export default App;
