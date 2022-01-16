import React from "react";
import { Helmet } from "react-helmet";
import Container from "containers/Home";
import logo from "static/img/logo.png";

const Home = () => {
  return (
    <>
      <Helmet>
        <meta name="title" content="CharmingCheol" />
        <meta name="description" content="차민철의 기술 블로그와 포트폴리오" />
        <meta name="og:title" content="CharmingCheol" />
        <meta name="og:description" content="차민철의 기술 블로그와 포트폴리오" />
        <meta name="og:image" content={logo} />
      </Helmet>
      <Container />
    </>
  );
};

export default Home;
