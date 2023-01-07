import { OK } from "http-status";
import { createWritingFixtureList } from "fixtures/writing";
import { WritingApiMock } from "../utils";

describe("Blog 페이지", () => {
  let writingApiMock: WritingApiMock;

  beforeEach(() => {
    writingApiMock = new WritingApiMock();
  });

  it("페이지 입장 시 최초 1번 페이지네이션 게시글들이 출력 된다", () => {
    writingApiMock.pagination({ statusCode: OK, body: { list: createWritingFixtureList(10), totalCount: 14 } }, 1);

    cy.visit("/");
    cy.wait("@pagination");

    cy.get('[data-cy="writing-list"] > li').should("have.length", 10);
  });

  it("페이지네이션 버튼을 클릭 할 경우 게시글 리스트가 업데이트 된다", () => {
    writingApiMock.pagination(
      { statusCode: OK, body: { list: createWritingFixtureList(10), totalCount: 14 } },
      1,
      "first",
    );
    writingApiMock.pagination(
      { statusCode: OK, body: { list: createWritingFixtureList(4), totalCount: 14 } },
      2,
      "second",
    );

    cy.visit("/");
    cy.wait("@first");

    cy.contains("button", "2").click();
    cy.wait("@second");
    cy.get('[data-cy="writing-list"] > li').should("have.length", 4);

    cy.contains("button", "1").click();
    cy.wait("@first");
    cy.get('[data-cy="writing-list"] > li').should("have.length", 10);
  });

  it("게시글 아이템을 클릭 할 경우, 게시글 상세 페이지로 이동 한다", () => {
    const id = "foooo";
    const body = { list: createWritingFixtureList(10, { id }), totalCount: 14 };
    writingApiMock.pagination({ statusCode: OK, body }, 1);

    cy.visit("/");
    cy.wait("@pagination");

    cy.get('[data-cy="writing-list"] > li').first().click();
    cy.url().should("equal", `http://localhost:3000/writing/${id}`);
  });
});
