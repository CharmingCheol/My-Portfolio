import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./index";

const Home = () => <div>You are on the home page</div>;
const Me = () => <div>You are on the me page</div>;
const Project = () => <div>You are on the project page</div>;

const App = () => (
  <>
    <Header />
    <Switch>
      <Route path="/portfolio" component={Home} exact />
      <Route path="/portfolio/me" component={Me} />
      <Route path="/portfolio/project" component={Project} />
    </Switch>
  </>
);

describe("organisms/Header", () => {
  const setup = (route?: string) => {
    if (route) window.history.pushState({}, "", route);
    return render(<App />, { wrapper: BrowserRouter });
  };

  it("logo image 클릭 시, /portfolio으로 이동한다", () => {
    setup("/portfolio/me");
    expect(screen.getByText("You are on the me page")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("logo"));
    expect(screen.getByText("You are on the home page")).toBeInTheDocument();
  });

  it("Me 메뉴 클릭 시, /portfolio/me로 이동한다", () => {
    setup();
    fireEvent.click(screen.getByText("Me"));
    expect(screen.getByText("You are on the me page")).toBeInTheDocument();
  });

  it("Project 메뉴 클릭 시, /portfolio/project로 이동한다", () => {
    setup();
    fireEvent.click(screen.getByText("Project"));
    expect(screen.getByText("You are on the project page")).toBeInTheDocument();
  });

  it("햄버거 아이콘 클릭 시, X아이콘으로 출력된다", () => {
    const { container } = setup();
    const iconWrapper = container.querySelector(".icon-button");
    expect(iconWrapper).toHaveClass("hamburger");
    fireEvent.click(screen.getByRole("button"));
    expect(iconWrapper).toHaveClass("close");
  });

  it("X아이콘 클릭 시, 햄버거 아이콘으로 출력된다", () => {
    const { container } = setup();
    const iconWrapper = container.querySelector(".icon-button");
    expect(iconWrapper).toHaveClass("hamburger");
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    expect(iconWrapper).toHaveClass("hamburger");
  });
});
