import React from "react";
import { BrowserRouter } from "react-router-dom";
import StyleReset from "@styles/reset";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <StyleReset />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
