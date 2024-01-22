import { FC } from "react";
import AppContent from "./components/organisms/AppContent";
import { LoaderProvider } from "./context/loaderContext";
import { AppProps } from "./@types/components/commonTypes";

const App: FC<AppProps> = (props) => {
  const {
    appContent,
    showSidePane = true,
    showNavbar = true,
    bg,
    padding,
  } = props;
  return (
    <LoaderProvider>
      <AppContent
        showSidePane={showSidePane}
        showNavbar={showNavbar}
        appContent={appContent}
        bg={bg}
        padding={padding}
      />
    </LoaderProvider>
  );
};
export default App;
