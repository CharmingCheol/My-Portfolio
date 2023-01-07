import { createWritingFixture } from "fixtures/writing";
import { CREATED, OK } from "http-status";
import { Auth, ImagesgApiMock, WritingApiMock } from "../utils";

describe("Write 페이지", () => {
  const WRITING_ID = "1234qwer";

  let imagesgApiMock: ImagesgApiMock;
  let writingApiMock: WritingApiMock;
  let auth: Auth;

  beforeEach(() => {
    imagesgApiMock = new ImagesgApiMock();
    writingApiMock = new WritingApiMock();
    auth = new Auth();
    auth.logOut();
  });

  it("본문 이미지를 업로드 할 경우, 화면에 업로드 한 이미지가 출력 된다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    imagesgApiMock.uploadWritingContent({ statusCode: OK, body: { path: imagesgApiMock.imageUrl } });

    cy.visit(Cypress.env("WRITE_PAGE"));
    cy.get("button.image").click();

    cy.contains("Choose a file").click();
    cy.get('input[type="file"]').selectFile("cypress/fixtures/logo.png");
    cy.contains("OK").click();
    cy.wait("@uploadWritingContent");

    cy.get("img").should("have.attr", "src").and("equal", imagesgApiMock.imageUrl);
  });

  it("뒤로 가기 버튼을 클릭할 경우, 게시글 작성 페이지를 벗어 난다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });

    cy.visit(Cypress.env("WRITE_PAGE"));
    cy.contains("뒤로가기").click();

    cy.url().should("not.equal", Cypress.env("WRITE_PAGE"));
  });

  it("출간하기 버튼을 클릭 할 경우, 게시글 생성 완료 후 게시글 상세 페이지로 이동 한다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    writingApiMock.create({ statusCode: CREATED, body: createWritingFixture({ id: WRITING_ID }) });

    cy.visit(Cypress.env("WRITE_PAGE"));
    cy.get('input[placeholder="제목을 입력하세요"]').type("title");
    cy.get(".ProseMirror").first().type("content");

    cy.contains("출간하기").should("not.be.disabled").click();
    cy.wait("@create");

    cy.url().should("include", `/writing/${WRITING_ID}`);
  });
});
