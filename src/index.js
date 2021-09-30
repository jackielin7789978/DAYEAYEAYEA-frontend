import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./constants/globalStyle";

ReactDOM.render(
  <>
    <GlobalStyle />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>,
  document.getElementById("root")
);
