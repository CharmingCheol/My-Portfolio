import { RouteHandler } from "cypress/types/net-stubbing";
import { WritingsApiSend } from "apis/send";

type WritingApi = {
  [key in keyof typeof WritingsApiSend]: (response: RouteHandler, ...rest: any[]) => void;
};

class WritingApiMock implements WritingApi {
  private WRITING_ID = "1234qwer";

  public create(response: RouteHandler, alias = "create"): void {
    cy.intercept(
      {
        method: "POST",
        url: `${Cypress.env("serverUrl")}/writings`,
      },
      response,
    ).as(alias);
  }

  public delete(response: RouteHandler, alias = "delete"): void {
    cy.intercept(
      {
        method: "DELETE",
        url: `${Cypress.env("serverUrl")}/writings/${this.WRITING_ID}`,
      },
      response,
    ).as(alias);
  }

  public pagination(response: RouteHandler, page: number, alias = "pagination"): void {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("serverUrl")}/writings?page=${page}`,
      },
      response,
    ).as(alias);
  }

  public update(response: RouteHandler, alias = "update"): void {
    cy.intercept(
      {
        method: "PATCH",
        url: `${Cypress.env("serverUrl")}/writings/${this.WRITING_ID}`,
      },
      response,
    ).as(alias);
  }

  public findOne(response: RouteHandler, alias = "findOne"): void {
    cy.intercept("GET", `${Cypress.env("serverUrl")}/writings/${this.WRITING_ID}`, response).as(alias);
  }
}

export default WritingApiMock;
