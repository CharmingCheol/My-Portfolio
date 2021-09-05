import React from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import loadable, { LoadableComponent } from "@loadable/component";
import { encrypt, decrypt } from "utils";

const Blog = loadable(() => import("pages/Blog"));
const Home = loadable(() => import("pages/Home"));
const Login = loadable(() => import("pages/Login"));
const Me = loadable(() => import("pages/Me"));
const NotFound = loadable(() => import("pages/NotFound"));
const Project = loadable(() => import("pages/Project/reducer"));
const Write = loadable(() => import("pages/Write"));
const Writing = loadable(() => import("pages/Writing"));

interface PrivateRouteProps extends RouteProps {
  component: LoadableComponent<unknown>;
  encrypted: string;
}

const PrivateRoute = (params: PrivateRouteProps) => {
  const { component: Component, encrypted, ...other } = params;
  const path = decrypt(encrypted);
  return (
    <Route
      {...other}
      path={path}
      render={({ location }) => {
        const login = window.sessionStorage.getItem("login");
        const notMatchText = !login || decrypt(login) !== process.env.LOG_IN_TEXT;
        if (location.pathname === process.env.LOGIN_PAGE) return notMatchText ? <Component /> : <Redirect to="/" />; // 로그인 페이지(notMatchText가 true면 로그인 페이지로 이동, false면 메인 페이지로 redirect)
        return notMatchText ? <Redirect to={process.env.LOGIN_PAGE as string} /> : <Component />; // 그외 페이지(notMatchText가 true면 로그인 페이지로 redirect, fasle면 private page 이동)
      }}
    />
  );
};

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/portfolio" component={Home} exact />
        <Route path="/portfolio/me" component={Me} />
        <Route path="/portfolio/project" component={Project} />
        <Route path="/" component={Blog} exact />
        <Route path="/writing/:id" component={Writing} />
        <PrivateRoute
          component={Login}
          path={process.env.LOGIN_PAGE as string}
          encrypted={encrypt(process.env.LOGIN_PAGE as string)}
          exact
        />
        <PrivateRoute
          component={Write}
          path={process.env.WRITE_PAGE as string}
          encrypted={encrypt(process.env.WRITE_PAGE as string)}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default Routes;
