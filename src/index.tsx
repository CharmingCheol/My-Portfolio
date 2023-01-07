import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalContext, store } from "reducers";
import App from "./app";

ReactDOM.render(
  <Provider store={store} context={GlobalContext}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
