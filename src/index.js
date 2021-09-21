import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@shopify/polaris/dist/styles.css";
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import "intersection-observer";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider theme={{ colorScheme: "dark" }}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
