import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoProvider from './context/todoContext';
import Todos from './containers/Todos';
import { ChartProvider } from './context/chart';
import AddTodo from './components/AddTodo';
import Chart from './components/ChartIndex.tsx';
import App from './App.tsx';
import './index.css';

const Loader = lazy(() => import('./components/loader'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/home" element={<App />} />
          <Route
            path="/opm"
            element={
              <ChartProvider>
                <Chart type="opm" />
              </ChartProvider>
            }
          />
          <Route
            path="/opmcomparison"
            element={
              <ChartProvider>
                <Chart type="opmcomparison" />
              </ChartProvider>
            }
          />
          <Route
            path="/todo"
            element={
              <TodoProvider>
                <div className="mt-[50px] mb-[100px] w-[50%] m-auto">
                  <Todos />
                  <AddTodo />
                </div>
              </TodoProvider>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  </React.StrictMode>
);
