import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(() => import("pages/Home"));
const Project = loadable(() => import("pages/Project/reducer"));
const Me = loadable(() => import("pages/Me"));

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/me" component={Me} exact />
        <Route path="/project" component={Project} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

export default Routes;
