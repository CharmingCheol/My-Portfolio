import React from "react";
import { Route } from "react-router-dom";
import { MainLayout } from "common";
import Header from "components/organisms/Header";
import { fnGetMainLayoutPage } from "utils";
import StyleReset from "styles/reset";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <StyleReset />
      <Route
        render={({ location }) => {
          return fnGetMainLayoutPage(location.pathname) ? <Header /> : null;
        }}
      />
      <MainLayout>
        <Routes />
      </MainLayout>
    </>
  );
};

export default App;
