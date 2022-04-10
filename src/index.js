import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import sotre from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={sotre}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
