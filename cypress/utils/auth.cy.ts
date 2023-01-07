class Auth {
  logIn(args: { id: string; password: string }): void {
    const { id, password } = args;
    cy.visit(Cypress.env("LOGIN_PAGE"));
    cy.get("input.id").type(id);
    cy.get("input.password").type(password);
    cy.get("button").contains("로그인").click();
  }

  logOut(): void {
    cy.window().then((window) => {
      window.sessionStorage.removeItem("login");
    });
  }
}

export default Auth;
