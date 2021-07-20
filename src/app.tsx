import React from "react";
import { BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import AlertList from "@common/Molecules/AlertList";
import BlogLayout from "@common/Organisms/BlogLayout";
import AlertListProvider from "@reducers/AlertList";
// import StyleReset from "@utils/styles/reset";
import StyleReset from "@styles/reset";
import Routes from "./routes";

dotenv.config();

const App = () => {
  return (
    <>
      <StyleReset />
      <BrowserRouter>
        <BlogLayout />
        <AlertListProvider>
          <AlertList />
          <Routes />
        </AlertListProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
