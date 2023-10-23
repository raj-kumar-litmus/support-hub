import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import App from "./App.tsx";
import DcOpenOrders from "./components/DcOpenOrders.tsx";
import BarChart from "./components/charts/BarChart.tsx";
import Chart from "./components/ChartIndex.tsx";
import "./index.css";
import HomePage from "./components/homePage.tsx";

// const Loader = lazy(() => import("./components/Loader.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {/* <Suspense fallback={<Loader />}> */}
      <Suspense>
        <Routes>
          <Route path="/home" element={<App appContent={<HomePage />} />} />
          <Route
            path="/dc-open-orders"
            element={<App appContent={<DcOpenOrders />} />}
          />
          {/* <Route path="/sessions" element={<App appContent={<BarChart />} />} /> */}
          <Route
            path="/opm"
            element={<App appContent={<Chart type="opm" />} />}
          />
          <Route
            path="/opmcomparison"
            element={<App appContent={<Chart type="opmcomparison" />} />}
          />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
);
