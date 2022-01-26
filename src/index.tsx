import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import { store } from "store";
import App from "app";

dotenv.config();

console.log("FIREBASE_STORAGE_BUCKET", process.env.FIREBASE_STORAGE_BUCKET);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
