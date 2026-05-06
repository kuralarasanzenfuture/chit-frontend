import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { BranchProvider } from "./components/BranchContext.jsx";
import "react-tooltip/dist/react-tooltip.css";
import { Store } from "./store/Store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>,
);
