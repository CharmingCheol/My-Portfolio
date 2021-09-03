/* eslint-disable no-nested-ternary */
import React from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import loadable, { LoadableComponent } from "@loadable/component";
import Header from "components/organisms/Header";
import { encrypt, decrypt } from "utils";

const Blog = loadable(() => import("pages/Blog"));
const Error = loadable(() => import("pages/Error"));
const Home = loadable(() => import("pages/Home"));
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
  const decrypted = decrypt(encrypted);
  return <Route {...other} path={decrypted} render={() => <Component />} />;
};

const Routes = () => {
  return (
    <>
      <Route
        render={({ location }) => {
          if (location.pathname === "/") return <Header />;
          return null;
        }}
      />
      <Switch>
        <Route path="/portfolio" component={Home} exact />
        <Route path="/portfolio/me" component={Me} />
        <Route path="/portfolio/project" component={Project} />
        <Route path="/" component={Blog} exact />
        <Route path="/writing/:id" component={Writing} />
        <PrivateRoute
          component={Write}
          path={process.env.WRITE_PAGE as string}
          encrypted={encrypt(process.env.WRITE_PAGE as string)}
          exact
        />
        {/* <Route path="/blog/error" component={Error} /> */}
        <Route component={NotFound} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Routes;
