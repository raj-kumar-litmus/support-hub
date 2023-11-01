import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import DcOpenOrders from "./components/DcOpenOrders";
import BarChart from "./components/charts/BarChart";
import App from "./App";
import Chart from "./components/ChartIndex";
import "./index.css";
import OrderDetails from "./components/orderDetails/OrderDetails.js";
import HomePage from "./components/homePage.js";

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
          <Route path="/sessions" element={<App appContent={<BarChart />} />} />
          <Route
            path="/opm"
            element={<App appContent={<Chart type="opm" />} />}
          />
          <Route
            path="/opm/fullscreen"
            element={
              <App showNavbar={false} appContent={<Chart type="opm" />} />
            }
          />
          <Route
            path="/opmcomparison"
            element={<App appContent={<Chart type="opmcomparison" />} />}
          />
          <Route
            path="/opmcomparison/fullscreen"
            element={
              <App
                showNavbar={false}
                appContent={<Chart type="opmcomparison" />}
              />
            }
          />
          <Route
            path="/orderDetails/:orderId"
            element={<App appContent={<OrderDetails />} />}
          />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
