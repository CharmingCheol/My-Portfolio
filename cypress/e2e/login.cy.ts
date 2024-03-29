beforeEach(() => {
  cy.window().then((win) => {
    win.sessionStorage.removeItem("login");
  });
  cy.visit(Cypress.env("LOGIN_PAGE"));
});

describe("Login 페이지", () => {
  const handleClickLoginButton = ({ id, password }: { id: string; password: string }) => {
    cy.get("input.id").type(id);
    cy.get("input.password").type(password);
    cy.get("button").contains("로그인").click();
  };

  const shouldGoMainPage = () => {
    cy.url().should("equal", "http://localhost:3000/");
  };

  it("로그인에 성공한 경우, session storage에 데이터가 추가되고 메인 페이지로 이동한다", () => {
    handleClickLoginButton({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    cy.contains("글 작성하기");
    cy.window().then((win) => {
      const login = win.sessionStorage.getItem("login");
      cy.wrap(login).should("exist");
    });
    shouldGoMainPage();
  });

  it("로그인에 실패한 경우, session storage에 데이터가 추가되지 않고 메인 페이지로만 이동한다", () => {
    handleClickLoginButton({ id: "wrong id", password: "wrong password" });
    cy.contains("글 작성하기").should("not.exist");
    cy.window().then((win) => {
      const login = win.sessionStorage.getItem("login");
      cy.wrap(login).should("not.exist");
    });
    shouldGoMainPage();
  });
});
