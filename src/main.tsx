import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./pages/Main/Main";
import Intro from "./pages/Intro/Intro";

import "reset-css";
import "./index.css";

import "@fontsource/press-start-2p";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/player",
    element: <Main />,
  },
  {
    path: "*",
    element: <>404</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

