import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import App from "./App";
import Chart from "./components/ChartIndex";
import DcOpenOrders from "./components/DcOpenOrders";
import BarChart from "./components/charts/BarChart";
import HomePage from "./components/homePage";
import OrderDetails from "./components/orderDetails/OrderDetails.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
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
