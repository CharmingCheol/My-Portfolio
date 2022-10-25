/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("/writing/1");
  cy.visit("/dfdf/asd");
});

describe("Not Found 페이지", () => {
  it("Not Found 페이지에서 [이전 페이지로 이동하기]를 클릭할 경우, 직전 페이지로 되돌아간다", () => {
    cy.contains("이전 페이지로 이동하기").click();
    cy.url().should("include", "/writing/1");
  });

  it("Not Found 페이지에서 [홈으로 이동하기]를 클릭할 경우, 메인 페이지로 되돌아간다", () => {
    cy.contains("홈으로 이동하기").click();
    cy.url().should("equal", "http://localhost:3000/");
  });
});
