interface Params {
  visit: string;
  statusCode: number;
  delay?: number;
  body?: any;
}
describe("페이지 라우팅", () => {
  const api = (params: Params) => {
    const { visit, statusCode, delay, body } = params;
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/",
      },
      { statusCode, body, delay },
    ).as("ipCheck");
    cy.visit(visit);

    // write(private route)인 경우, 로딩바를 출력
    if (visit === "/write") cy.get("svg > circle");
    else cy.get("svg > circle").should("not.exist");

    // delay 유무에 따라 wait 분기처리
    if (delay) cy.wait(delay);
    else cy.wait("@ipCheck");
  };

  it("최초 페이지를 private route에 접근했을 때 IP Check API timeout이 발생할 경우, 메인 페이지로 이동시킨다", () => {
    api({ visit: "/write", statusCode: 500, delay: 1000 * 2 });
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("최초 페이지를 private route에 접근했을 때 IP Check API에 에러가 발생할 경우, 메인 페이지로 이동시킨다", () => {
    api({ visit: "/write", statusCode: 500 });
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("최초 페이지를 public route에 접근했을 때 IP Check API timeout이 발생할 경우, 해당 페이지에 유지시킨다", () => {
    api({ visit: "/post/1", statusCode: 500, delay: 1000 * 2 });
    cy.url().should("include", "/post/1");
  });

  it("최초 페이지를 public route에 접근했을 때 IP Check API에 에러가 발생할 경우, 해당 페이지에 유지시킨다", () => {
    api({ visit: "/post/1", statusCode: 500 });
    cy.url().should("include", "/post/1");
  });

  it("최초에 private route에 접근했을 때 IP Check API 결과가 false인 경우, 메인 페이지로 이동시킨다", () => {
    api({ visit: "/wrtie", statusCode: 200, body: { isAdmin: false } });
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("최초에 private route에 접근했을 때 IP Check API 결과가 true라면, 해당 private 페이지로 이동시킨다", () => {
    api({ visit: "/write", statusCode: 200, body: { isAdmin: true } });
    cy.url().should("eq", "http://localhost:3000/write");
  });
});
