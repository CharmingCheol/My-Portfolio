import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import dotenv from "dotenv";
import AlertList from "@common/Molecules/AlertList";
import BlogLayout from "@common/Organisms/BlogLayout";
import AlertListProvider from "@reducers/AlertList";
import StyleReset from "@utils/styles/reset";
import Routes from "./routes";

dotenv.config();

const App = () => {
  return (
    <>
      <StyleReset />
      <BrowserRouter>
        <BlogLayout />
        <Switch>
          <AlertListProvider>
            <AlertList />
            <Routes />
          </AlertListProvider>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
