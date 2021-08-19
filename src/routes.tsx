/* eslint-disable no-nested-ternary */
import React from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import loadable, { LoadableComponent } from "@loadable/component";
import LoadingBar from "components/atoms/LoadingBar";
import Header from "components/organisms/Header";
import { useAppSelector } from "store";

const Blog = loadable(() => import("pages/Blog"));
const Error = loadable(() => import("pages/Error"));
const Home = loadable(() => import("pages/Home"));
const Me = loadable(() => import("pages/Me"));
const Post = loadable(() => import("pages/Post"));
const Project = loadable(() => import("pages/Project/reducer"));
const Write = loadable(() => import("pages/Write"));

interface PrivateRouteProps extends RouteProps {
  component: LoadableComponent<unknown>;
}

const PrivateRoute = (params: PrivateRouteProps) => {
  const { component: Component, ...other } = params;
  const isAdmin = useAppSelector((state) => state.option.isAdmin);

  return (
    <Route
      {...other}
      render={() => {
        return isAdmin ? <Component /> : <LoadingBar />;
      }}
    />
  );
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
        <Route path="/post/:id" component={Post} />
        <PrivateRoute path="/write" component={Write} />
        {/* <Route path="/blog/error" component={Error} /> */}
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Routes;
