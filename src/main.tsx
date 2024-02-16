import React from "react";
import ReactDOM from "react-dom/client";

import Main from "./pages/Main/Main";

import "reset-css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

