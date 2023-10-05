import { FC } from "react";
import AppContent from "./components/appcontent";

type Props = {
  appContent: any;
};

const App: FC<Props> = ({ appContent }) => {
  return <div>
    <AppContent
      showSidePane
      showNavbar
      appContent={appContent}
    />
  </div>;
}
export default App;
