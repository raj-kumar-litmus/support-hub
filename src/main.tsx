import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import DcOpenOrders from "./components/DcOpenOrders.tsx";
import BarChart from "./components/charts/BarChart.tsx";
import App from "./App.tsx";
import "./index.css";

const Loader = lazy(() => import("./components/loader.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/home"
            element={
              <App
                appContent={<div className="p-4">Sephora support hub</div>}
              />
            }
          />
          <Route
            path="/dc-open-orders"
            element={<App appContent={<DcOpenOrders />} />}
          />
          <Route path="/sessions" element={<App appContent={<BarChart />} />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
);
