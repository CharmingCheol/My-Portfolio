beforeEach(() => {
  cy.visit("/writing/1234qwer");
});

describe("글 상세 페이지", () => {
  it("페이지 이동 시, id에 맞는 게시글을 불러온다", () => {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
      },
      { fixture: "writing.json" },
    ).as("getWriting");
    cy.wait("@getWriting");
    cy.contains("title");
    cy.contains("2021.08.02");
    cy.get('[alt="thumbnail"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    cy.contains("Fixtures are a great way to mock data for responses to routes");
  });

  it("id에 일치하는 페이지가 없는 경우, 존재하지 않은 페이지 UI를 출력한다", () => {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
      },
      { statusCode: 404 },
    ).as("getWriting");
    cy.wait("@getWriting");
    cy.contains("Not Found");
  });
});
