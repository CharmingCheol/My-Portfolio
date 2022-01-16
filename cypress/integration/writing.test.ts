before(() => {
  cy.visit(Cypress.env("LOGIN_PAGE"));
  cy.get("input.id").type(Cypress.env("ID"));
  cy.get("input.password").type(Cypress.env("PASSWORD"));
  cy.get("button").contains("로그인").click();
});

after(() => {
  cy.window().then((window) => {
    window.sessionStorage.removeItem("login");
  });
});

describe("글 상세 페이지", () => {
  const WRITING_ID = "1234qwer";

  const getWritingSuccess = (fixture?: string) => {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("serverUrl")}/writings/${WRITING_ID}`,
      },
      { fixture: fixture || "writing.json" },
    ).as("getWritingSuccess");
  };

  const getWritingNotFound = () => {
    cy.intercept(
      {
        method: "GET",
        url: `${Cypress.env("serverUrl")}/writings/${WRITING_ID}`,
      },
      { statusCode: 404 },
    ).as("getWritingNotFound");
  };

  describe("페이지 접근", () => {
    it("페이지 이동 시, id에 맞는 게시글을 불러온다", () => {
      // api
      getWritingSuccess();

      // 게시글 불러오기 api 호출
      cy.visit(`/writing/${WRITING_ID}`);
      cy.wait("@getWritingSuccess");

      // response data 출력
      cy.contains("title");
      cy.contains("2021.08.02");
      cy.contains("Fixtures are a great way to mock data for responses to routes");
      cy.get('[alt="thumbnail"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    });

    it("id에 일치하는 페이지가 없는 경우, 존재하지 않은 페이지 UI를 출력한다", () => {
      // api
      getWritingNotFound();

      // not found api 호출
      cy.visit(`/writing/${WRITING_ID}`);
      cy.wait("@getWritingNotFound");

      cy.contains("Not Found");
    });
  });

  describe("게시글 업데이트", () => {
    beforeEach(() => {
      // api
      getWritingSuccess();

      // 게시글 불러오기 api 호출
      cy.visit(`/writing/${WRITING_ID}`);
      cy.wait("@getWritingSuccess");

      cy.contains("수정").click();
    });

    it("게시글 업데이트 버튼을 클릭한 경우, 현재 contents가 반영 된 채로 게시글 작성 화면에 이동한다", () => {
      // 글 작성 화면으로 이동
      cy.url().should("include", Cypress.env("WRITE_PAGE"));

      // 제목, 본문 내용 적용
      cy.get("input").should("have.value", "title");
      cy.contains("Fixtures are a great way to mock data for responses to routes ### 1232");

      // 썸네일 적용
      cy.contains("환경설정").click();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    });

    it("게시글 수정 화면에서 내용을 제출할 경우, 수정한 내용대로 업데이트 된다", () => {
      // api
      cy.intercept(
        {
          method: "PATCH",
          url: `${Cypress.env("serverUrl")}/writings/${WRITING_ID}`,
        },
        { id: WRITING_ID },
      ).as("patchWriting");
      getWritingSuccess("writing_update.json");

      // 현재 제목, 본문 입력창 clear
      cy.get(".title-input").clear();
      cy.get(".ProseMirror").first().clear();

      // 제목, 본문 작성
      cy.get(".title-input").type("updated title");
      cy.get(".ProseMirror").first().type("updated content");

      // 츨간하기 클릭 시 게시글 업데이트
      cy.contains("출간하기").should("not.be.disabled").click();
      cy.wait("@patchWriting");

      // 업데이트 된 게시글 페이지 이동
      cy.wait("@getWritingSuccess");
      cy.contains("updated title");
      cy.contains("updated content");
    });
  });

  describe("게시글 삭제", () => {
    beforeEach(() => {
      // api
      getWritingSuccess();

      // 게시글 페이지 이동
      cy.visit(`/writing/${WRITING_ID}`);
      cy.wait("@getWritingSuccess");

      // 삭제 버튼 클릭
      cy.get("button").contains("삭제").click();
      cy.contains("게시글을 삭제하겠습니까?");
    });

    it("삭제 모달에서 취소 버튼을 누를 경우, 모달창이 사라진다", () => {
      cy.get("button").contains("취소").click();
      cy.contains("게시글을 삭제하겠습니까?").should("not.exist");
    });

    it("게시글을 삭제할 경우 경우, 메인 페이지로 이동하고 게시글이 삭제된다", () => {
      // api
      cy.intercept(
        {
          method: "DELETE",
          url: `${Cypress.env("serverUrl")}/writings/${WRITING_ID}`,
        },
        { statusCode: 204 },
      ).as("deleteWriting");
      getWritingNotFound();

      // 삭제 모달에서 확인 버튼 클릭
      cy.get("button").contains("확인").click();
      cy.wait("@deleteWriting");

      // 메인 페이지 이동 후 삭제 된 게시글 페이지 이동
      cy.url().should("equal", "http://localhost:3000/");
      cy.visit(`/writing/${WRITING_ID}`);

      // not found api 전달
      cy.wait("@getWritingNotFound");
      cy.contains("Not Found");
    });
  });
});
