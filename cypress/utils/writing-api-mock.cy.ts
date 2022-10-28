import { RouteHandler } from "cypress/types/net-stubbing";
import { WritingsApiSend } from "apis/send";

type WritingApi = {
  [key in keyof typeof WritingsApiSend]: (response: RouteHandler, alias?: string) => void;
};

class WritingApiMock implements WritingApi {
  private WRITING_ID = "1234qwer";

  public create(response: RouteHandler, alias = "create"): void {
    throw new Error("Method not implemented.");
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

  public pagination(response: RouteHandler, alias = "pagination"): void {
    throw new Error("Method not implemented.");
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
