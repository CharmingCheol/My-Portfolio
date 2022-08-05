import React, { useLayoutEffect } from "react";
import { Route } from "react-router-dom";
import { useAppDispatch } from "store";

import { changeIsAdmin } from "reducers/option";
import { Header, MainLayout } from "common";
import { decrypt, fnGetMainLayoutPage } from "utils";
import StyleReset from "styles/reset";

import Routes from "./routes";

const App = () => {
  const dispatch = useAppDispatch();

  // session storage value 체크
  useLayoutEffect(() => {
    const login = window.sessionStorage.getItem("login");
    if (login) {
      const decrypted = decrypt(login);
      if (decrypted === process.env.LOG_IN_TEXT) {
        dispatch(changeIsAdmin(true));
      } else {
        window.sessionStorage.removeItem("login");
      }
    }
  }, [dispatch]);

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
