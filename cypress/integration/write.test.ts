import CryptoJS from "crypto-js";

beforeEach(() => {
  cy.window().then((win) => {
    const message = Cypress.env("LOG_IN_TEXT");
    const secrectKey = Cypress.env("SECRECT_KEY");
    const encrypted = CryptoJS.AES.encrypt(message, secrectKey).toString();
    win.sessionStorage.setItem("login", encrypted);
  });
  cy.visit("/writing/2");
  cy.visit(Cypress.env("WRITE_PAGE"));
});

describe("글 작성 페이지", () => {
  // 본문 이미지 업로드
  const uploadContentImage = (file: string) => {
    cy.get("button.image").click();
    cy.contains("Choose a file").click();
    cy.get('input[type="file"]').attachFile(file);
  };

  // 썸네일 이미지 업로드
  const uploadThumbnailImage = () => {
    cy.intercept(
      {
        method: "POST",
        url: `${Cypress.env("serverUrl")}/images/thumbnails`,
      },
      { body: { url: Cypress.env("responseImage") } },
    ).as("thumbnails");
    cy.contains("환경설정").click();
    cy.get(".thumbnail-preview").click();
    cy.get(".thumbnail-input").attachFile("logo.png");
    cy.wait("@thumbnails");
  };

  // 제목, 본문, 썸네일이 존재하지 않음 확인
  const getNotExisted = () => {
    cy.go(1);
    cy.get("#editor");
    cy.contains("hello title").should("not.exist");
    cy.contains("hello content").should("not.exist");
    cy.contains("환경설정").click();
    cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("not.equal", Cypress.env("responseImage"));
    cy.contains("확인").click();
  };

  // 제목, 본문, 썸네일 작성
  const writeThings = () => {
    cy.get(".title-input").type("hello title");
    cy.get(".ProseMirror").first().type("hello content");
    uploadThumbnailImage();
  };

  // 게시글 전송
  const postWriting = () => {
    cy.intercept(
      {
        method: "POST",
        url: `${Cypress.env("serverUrl")}/writings`,
      },
      { fixture: "writing.json" },
    ).as("postWriting");
    cy.contains("출간하기").should("be.disabled");
    writeThings();
    cy.contains("확인").click();
    cy.contains("출간하기").should("not.be.disabled").click();
    cy.wait("@postWriting");
  };

  describe("뒤로가기", () => {
    it("글 작성 도중 브라우저 뒤로 가기->앞으로 가기 할 경우, 초기화 된 상태로 글 작성 페에지에 이동한다", () => {
      writeThings();
      cy.go(-1);
      cy.url().should("include", "/writing/2");
      cy.get("#editor").should("not.exist");
      getNotExisted();
    });

    it("뒤로가기 버튼을 누르고 브라우저 앞으로 가기를 할 경우, 초기화 된 상태로 글 작성 페이지에 이동한다", () => {
      writeThings();
      cy.contains("확인").click();
      cy.contains("뒤로가기").click();
      getNotExisted();
    });
  });

  describe("에디터", () => {
    it("툴바에서 이미지 업로드 버튼 클릭 시, img src에 my-portfolio-server uri가 포함된다", () => {
      cy.intercept(
        {
          method: "POST",
          url: `${Cypress.env("serverUrl")}/images/contents`,
        },
        { body: { url: Cypress.env("responseImage") } },
      ).as("uploadImage");
      uploadContentImage("logo.png");
      cy.contains("OK").click();
      cy.wait("@uploadImage");
      cy.get("img").should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.get("img").should("have.attr", "alt").and("equal", "sofa_cat.jpg");
    });

    it("이미지가 아닌 file을 업로드 한 경우, 에디터에 아무런 반응을 주지 않는다", () => {
      cy.get(".ProseMirror").first().type("hello content"); // 본문 입력
      uploadContentImage("example.json"); // json 업로드
      cy.get(".ProseMirror").first().should("have.text", "hello content"); // [alt](url)이 추가되지 않음
    });
  });

  describe("환결설정", () => {
    it("대표사진 업로드 성공 시, 이미지 미리보기가 변경된다", () => {
      uploadThumbnailImage();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    });

    it("대표사진 업로드에 실패 할 경우, 이미지 미리보기가 변경되지 않는다", () => {
      uploadThumbnailImage(); // 썸네일 업로드
      cy.get(".thumbnail-preview").click(); // 썸네일 업로드 재시도
      cy.get(".thumbnail-input").attachFile("example.json"); // 이미지 파일 대신 json 업로드
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage")); // 이전에 업로드 한 썸네일 이미지 출력
    });

    it("[초기화] 버튼 클릭 시, 환결설정에 입력한 값들이 기본값으로 초기화된다", () => {
      uploadThumbnailImage();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.contains("초기화").click();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("not.equal", Cypress.env("responseImage"));
    });

    it("설정값을 변경 후 [확인] 버튼을 눌렀다가 다시 모달창을 열었을 때, 세팅 된 값으로 출력된다 ", () => {
      uploadThumbnailImage();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.contains("확인").click();
      cy.contains("환경설정").click();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
    });

    it("설정값을 변경 후 [취소] 버튼을 눌렀다가 다시 모달창을 열었을 때, 이전에 변경 된 값으로 출력되지 않는다", () => {
      uploadThumbnailImage();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.contains("취소").click();
      cy.contains("환경설정").click();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("not.equal", Cypress.env("responseImage"));
    });
  });

  describe("출간하기 버튼", () => {
    it("제목, 본문, 썸네일을 작성 후 출간하기 버튼 클릭 시, api 응답이 이루어지고 게시글 상세 페이지로 이동한다", () => {
      postWriting();
      cy.url().should("include", "/writing/1234qwer");
    });

    it("글을 작성해서 게시글 상세 페이지로 이동 후 뒤로가기 버튼 클릭 시, 글 작성 페이지로 이동하지 않는다", () => {
      postWriting();
      cy.go(-1);
      cy.url().should("not.include", Cypress.env("WRITE_PAGE"));
    });
  });
});
