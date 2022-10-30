import { RouteHandler } from "cypress/types/net-stubbing";
import { ImagesApiSend } from "apis/send";

type ImagesApi = {
  [key in keyof typeof ImagesApiSend]: (response: RouteHandler, alias?: string) => void;
};

class ImagesgApiMock implements ImagesApi {
  public imageUrl = "https://res.cloudinary.com/demo/image/upload/w_400/sofa_cat.jpg";

  uploadWritingContent(response: RouteHandler, alias = "uploadWritingContent"): void {
    cy.intercept(
      {
        method: "POST",
        url: `${Cypress.env("serverUrl")}/images/writings/contents`,
      },
      response,
    ).as(alias);
  }
}

export default ImagesgApiMock;
