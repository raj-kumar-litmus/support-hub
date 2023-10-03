import AppContent from "./components/appcontent";

function App ({ appContent }: { appContent: any }) {
  return <div>
    <AppContent
      showSidePane
      showNavbar
      appContent={appContent}
    />
  </div>;
}
export default App;
