import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@shopify/polaris/dist/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "@shopify/polaris";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider theme={{ colorScheme: "dark" }}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
