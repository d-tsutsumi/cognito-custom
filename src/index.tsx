import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AuthProvider } from "./AuthContext";
import AppRoute from "./Route";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
