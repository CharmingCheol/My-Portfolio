import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import StyleReset from "@utils/styles/reset";

const Home = loadable(() => import("@pages/Home"));
const Profile = loadable(() => import("@pages/Profile/reducer"));
const Project = loadable(() => import("@pages/Project/reducer"));

const App = () => {
  return (
    <>
      <StyleReset />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/project" component={Project} exact />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
