/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/");
});

describe("블로그 페이지", () => {
  // 헤더
  it("/ 페이지에서 헤더가 출력된다", () => {
    cy.get("header");
  });

  it("헤더에서 로고를 클릭 할 경우, /으로 이동한다", () => {
    cy.get("a").should("have.attr", "href", "/");
    cy.url().should("include", "/");
  });

  it("헤더에서 Me를 클릭하면, /me으로 이동한다", () => {
    cy.contains("Me").click();
  });

  it("헤더에서 Project를 클릭하면, /project로 이동한다", () => {
    cy.contains("Project").click();
    cy.url().should("include", "/project");
  });

  it("viewport의 크기가 작아질 경우, 헴버거 버튼이 출력된다", () => {
    cy.viewport(500, 500);
    cy.get(".hamburger");
  });

  it("햄버거 버튼을 클릭 할 경우, 메뉴가 출력되고 닫기 버튼으로 변경된다", () => {
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.get(".showed");
    cy.get(".close");
  });

  it("햄버거 버튼 클릭 후 메뉴에서 Me를 클릭 할 경우, /me으로 이동한다", () => {
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.contains("Me").click();
  });

  it("햄버거 버튼 클릭 후 메뉴에서 About를 클릭 할 경우, /me으로 이동한다", () => {
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.contains("Project").click();
    cy.url().should("include", "/project");
  });

  it("닫기 버튼을 클릭 할 경우, 메뉴가 사라지고 햄버거 버튼으로 변경된다", () => {
    cy.viewport(500, 500);
    cy.get(".hamburger").click();
    cy.get(".close").click();
    cy.get(".hamburger");
    cy.get(".showed").should("not.exist");
  });
});
