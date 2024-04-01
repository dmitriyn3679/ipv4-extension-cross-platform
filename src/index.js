import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./app/store";
import "./index.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log = () => {}
console.error = () => {}
console.debug = () => {}

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
);
