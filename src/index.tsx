import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import { store } from "store";
import App from "app";

dotenv.config();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <App /> */}
      <div>hello</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
