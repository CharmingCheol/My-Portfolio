describe("페이지 라우팅", () => {
  it("제한시간 내에 IP Check API를 전달 받지 못할 경우, error 페이지로 이동시킨다", () => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/",
      },
      { statusCode: 500, body: "time out error", delay: 10000 },
    ).as("ipCheck");
    cy.visit("/");
    cy.wait(1000 * 10);
    cy.url().should("include", "/blog/error");
    cy.contains("500");
    cy.contains("time out error");
  });

  it("최초 페이지가 private route에서 IP Check API를 보낼 때 로딩바가 출력된다", () => {});

  it("최초 페이지가 private route에서 IP Check API를 보낼 때 로딩바가 출력하지 않는다", () => {});

  it("유저가 private 페이지에 접근할 경우, 로딩바 없이 error 페이지로 이동시킨다", () => {});

  it("관리자가 private 페이지에 접근할 경우, 로딩바 없이 해당 페이지로 이동시킨다", () => {});
});
