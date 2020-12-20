import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StyleReset from "@utils/styles/reset";

const Home = loadable(() => import("@pages/Home"));
const Profile = loadable(() => import("@pages/Profile/reducer"));
const Project = loadable(() => import("@pages/Project/reducer"));
const Temp = loadable(() => import("@pages/Temp"));

const App = () => {
  return (
    <>
      <StyleReset />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/project" component={Project} exact />
          <Route path="/temp" component={Temp} exact />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
