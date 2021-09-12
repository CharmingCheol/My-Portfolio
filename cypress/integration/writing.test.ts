beforeEach(() => {
  cy.visit("/writing/1234qwer");
});

describe("글 상세 페이지", () => {
  describe("페이지 접근", () => {
    it("페이지 이동 시, id에 맞는 게시글을 불러온다", () => {
      cy.intercept(
        {
          method: "GET",
          url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
        },
        { fixture: "writing.json" },
      ).as("getWriting");
      cy.wait("@getWriting");
      cy.contains("title");
      cy.contains("2021.08.02");
      cy.get('[alt="thumbnail"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.contains("Fixtures are a great way to mock data for responses to routes");
    });

    it("id에 일치하는 페이지가 없는 경우, 존재하지 않은 페이지 UI를 출력한다", () => {
      cy.intercept(
        {
          method: "GET",
          url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
        },
        { statusCode: 404 },
      ).as("getWriting");
      cy.wait("@getWriting");
      cy.contains("Not Found");
    });
  });

  describe("게시글 업데이트", () => {
    it("게시글 업데이트 버튼을 클릭한 경우, 현재 contents가 반영 된 채로 게시글 작성 화면에 이동한다", () => {
      cy.url().should("include", Cypress.env("WRITE_PAGE"));
      cy.get("input").should("have.value", "title");
      cy.contains("Fixtures are a great way to mock data for responses to routes ### 1232");
      cy.contains("환경설정").click();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    });

    it("게시글 수정 화면에서 내용을 제출할 경우, 수정한 내용대로 업데이트 된다", () => {
      cy.intercept(
        {
          method: "POST",
          url: `${Cypress.env("serverUrl")}/writings`,
        },
        { fixture: "writing_update.json" },
      ).as("postWriting");
      cy.intercept(
        {
          method: "GET",
          url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
        },
        { fixture: "writing_update.json" },
      ).as("getWriting");
      cy.get(".title-input").clear();
      cy.get(".ProseMirror").first().clear();
      cy.get(".title-input").type("updated title");
      cy.get(".ProseMirror").first().type("updated content");
      cy.contains("출간하기").should("not.be.disabled").click();
      cy.wait("@postWriting");
      cy.wait("@getWriting");
      cy.contains("updated title");
      cy.contains("updated content");
    });

    before(() => {
      cy.visit(Cypress.env("LOGIN_PAGE"));
      cy.get("input.id").type(Cypress.env("ID"));
      cy.get("input.password").type(Cypress.env("PASSWORD"));
      cy.get("button").contains("로그인").click();
    });

    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: `${Cypress.env("serverUrl")}/writings?id=1234qwer`,
        },
        { fixture: "writing.json" },
      ).as("getWriting");
      cy.wait("@getWriting");
      cy.contains("수정").click();
    });

    after(() => {
      cy.window().then((win) => {
        win.sessionStorage.removeItem("login");
      });
    });
  });

  // describe("게시글 삭제", () => {
  //   it("로그인을 했을 경우에만 삭제 버튼이 출력된다", () => {});

  //   // it("삭제 모달에서 취소 버튼을 누를 경우, 모달창이 사라진다", () => {});

  //   // it("게시글을 삭제할 경우 경우, 메인 페이지로 이동하고 게시글이 삭제된다", () => {});
  // });
});
