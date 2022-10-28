import { NOT_FOUND, NO_CONTENT, OK } from "http-status";
import { createWritingFixture } from "fixtures/writing";
import { Auth, WritingApiMock } from "../utils";

describe("Writing 페이지", () => {
  const WRITING_ID = "1234qwer";
  const createdAt = new Date();
  const writingFixture = createWritingFixture({
    id: WRITING_ID,
    title: "title",
    content: "content",
    createdAt: createdAt.toString(),
  });

  let writingApiMock: WritingApiMock;
  let auth: Auth;

  beforeEach(() => {
    writingApiMock = new WritingApiMock();
    auth = new Auth();
    auth.logOut();
  });

  it("게시글 id에 맞는 화면을 보여준다", () => {
    writingApiMock.findOne({ statusCode: OK, body: writingFixture });

    cy.visit(`/writing/${WRITING_ID}`);
    cy.wait("@findOne");

    cy.contains("title");
    cy.contains(`${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}`);
    cy.contains("content");
  });

  it("관리자 계정인 경우 관리자 UI가 페이지에 출력 된다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    writingApiMock.findOne({ statusCode: OK, body: writingFixture });

    cy.visit(`/writing/${WRITING_ID}`);
    cy.wait("@findOne");

    cy.contains("수정");
    cy.contains("삭제");
  });

  it("id에 알맞은 게시글이 없을 경우, Not Found 페이지를 보여준다", () => {
    writingApiMock.findOne({ statusCode: NOT_FOUND });

    cy.visit(`/writing/${WRITING_ID}`);
    cy.wait("@findOne");

    cy.contains("Not Found");
  });

  it("수정 버튼 클릭 시, 게시글 데이터가 반영 된 채로 Write 페이지에 이동 한다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    writingApiMock.findOne({ statusCode: OK, body: writingFixture });

    cy.visit(`/writing/${WRITING_ID}`);
    cy.wait("@findOne");
    cy.contains("수정").click();

    cy.get("input").should("have.value", "title");
    cy.contains("content");
  });

  it("삭제 버튼 클릭 시, 게시글 삭제 모달 출력 후 메인 페이지로 이동 한다", () => {
    auth.logIn({ id: Cypress.env("ID"), password: Cypress.env("PASSWORD") });
    writingApiMock.findOne({ statusCode: OK, body: writingFixture });
    writingApiMock.delete({ statusCode: NO_CONTENT });

    cy.visit(`/writing/${WRITING_ID}`);
    cy.wait("@findOne");
    cy.contains("삭제").click();

    cy.get("button").contains("확인").click();
    cy.wait("@delete");

    cy.url().should("equal", "http://localhost:3000/");
  });
});
