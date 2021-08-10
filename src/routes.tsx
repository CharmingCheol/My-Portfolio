import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Header from "components/organisms/Header";

const Blog = loadable(() => import("pages/Blog"));
const Home = loadable(() => import("pages/Home"));
const Project = loadable(() => import("pages/Project/reducer"));
const Me = loadable(() => import("pages/Me"));

const Routes = () => {
  return (
    <>
      <Route
        render={({ location }) => {
          if (location.pathname === "/blog") return <Header />;
          return null;
        }}
      />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/me" component={Me} />
        <Route path="/project" component={Project} />
        <Route path="/blog" component={Blog} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Routes;
