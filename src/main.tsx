import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import App from "./App.tsx";
import "./index.css";

const Loader = lazy(() => import("./components/loader.tsx"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/home" element={<App />} />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>,
);
