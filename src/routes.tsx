/* eslint-disable no-nested-ternary */
import React, { useLayoutEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import CryptoJS from "crypto-js";
import LoadingBar from "@common/Atoms/LoadingBar";
import useDecryptIP from "@hooks/useDecryptIP";
import { encrypt } from "@utils/modules/encryption";

const Blog = loadable(() => import("@pages/Blog"));
const CategoryPost = loadable(() => import("@pages/CategoryPost"));
const Home = loadable(() => import("@pages/Home"));
const PostDetail = loadable(() => import("@pages/PostDetail"));
const Profile = loadable(() => import("@pages/Profile/reducer"));
const Project = loadable(() => import("@pages/Project/reducer"));
const WritePost = loadable(() => import("@pages/WritePost/reducer"));

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/project" component={Project} exact />
        <Route path="/blog" component={Blog} exact />
        <Route path="/blog/:category" component={CategoryPost} exact />
        <PrivateRoute exact component={WritePost} path="/blog/write/post" />
        <Route path="/blog/:category/:id" component={PostDetail} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
};

const PrivateRoute = ({ component: TargetPage, ...rest }: any) => {
  const [encryptedIP, setEncryptedIP] = useState<CryptoJS.lib.CipherParams>();
  const [pageLoading, setPageLoading] = useState(true);
  const sameIP = useDecryptIP({
    callback: () => {
      setPageLoading(false);
    },
    encryptIP: encryptedIP as CryptoJS.lib.CipherParams,
  });

  useLayoutEffect(() => {
    const callback = async () => {
      try {
        const { ip } = await fetch("https://api.ipify.org/?format=json").then((res) => res.json());
        const ciphertext = encrypt(ip as string);
        setEncryptedIP(ciphertext);
      } catch {
        return <Redirect to="/blog" />;
      }
    };
    callback();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (pageLoading ? <LoadingBar /> : sameIP ? <TargetPage {...props} /> : <Redirect to="/blog" />)}
    />
  );
};

export default Routes;
