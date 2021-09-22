const postThumbnailImageAPI = () => {
  cy.intercept(
    {
      method: "POST",
      url: `${Cypress.env("serverUrl")}/images/thumbnails`,
    },
    { body: { url: Cypress.env("responseImage") } },
  ).as("postThumbnailImageAPI");
};

const postWritingAPI = () => {
  cy.intercept(
    {
      method: "POST",
      url: `${Cypress.env("serverUrl")}/writings`,
    },
    { fixture: "writing.json" },
  ).as("postWritingAPI");
};

const postContentImageAPI = () => {
  cy.intercept(
    {
      method: "POST",
      url: `${Cypress.env("serverUrl")}/images/contents`,
    },
    { body: { url: Cypress.env("responseImage") } },
  ).as("postContentImageAPI");
};

const uploadContentImage = (file: string) => {
  cy.get("button.image").click();
  cy.contains("Choose a file").click();
  cy.get('input[type="file"]').attachFile(file);
};

const uploadThumbnailImage = () => {
  // 썸네일 이미지 선택
  cy.contains("환경설정").click();
  cy.get(".thumbnail-preview").click();
  cy.get(".thumbnail-input").attachFile("logo.png");

  // 썸네일 이미지 업로드 api
  cy.wait("@postThumbnailImageAPI");
};

const haveNotContents = () => {
  // 제목, 본문이 비어있음 확인
  cy.contains("hello title").should("not.exist");
  cy.contains("hello content").should("not.exist");

  // 썸네일 이미지 없음 확인
  cy.contains("환경설정").click();
  cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("not.equal", Cypress.env("responseImage"));
  cy.contains("확인").click();
};

const writeContents = () => {
  cy.get(".title-input").type("hello title");
  cy.get(".ProseMirror").first().type("hello content");
  uploadThumbnailImage();
};

const postWriting = () => {
  // 최초에 버튼 비활성화
  cy.contains("출간하기").should("be.disabled");

  // 제목, 본문, 썸네일 이미지 추가
  writeContents();

  // 버튼 활성화 확인 후 클릭
  cy.contains("확인").click();
  cy.contains("출간하기").should("not.be.disabled").click();

  // 게시글 추가 api
  cy.wait("@postWritingAPI");
};

before(() => {
  cy.visit(Cypress.env("LOGIN_PAGE"));
  cy.get("input.id").type(Cypress.env("ID"));
  cy.get("input.password").type(Cypress.env("PASSWORD"));
  cy.get("button").contains("로그인").click();
});

beforeEach(() => {
  // api
  postThumbnailImageAPI();
  postContentImageAPI();
  postWritingAPI();

  // 글 작성화면 이동
  cy.visit("/writing/1234qwer");
  cy.contains("글 작성하기").click();
});

after(() => {
  cy.window().then((window) => {
    window.sessionStorage.removeItem("login");
  });
});

describe("글 작성 페이지", () => {
  describe("뒤로가기", () => {
    it("글 작성 도중 브라우저 뒤로 가기->앞으로 가기 할 경우, 초기화 된 상태로 글 작성 페에지에 이동한다", () => {
      // 글 작성
      writeContents();

      // 브라우저 뒤로 가기 클릭
      cy.go(-1);
      cy.get("#editor").should("not.exist");

      // 브라우저 앞으로 가기 클릭
      cy.go(1);
      haveNotContents();
    });

    it("뒤로가기 버튼을 누르고 브라우저 앞으로 가기를 할 경우, 초기화 된 상태로 글 작성 페이지에 이동한다", () => {
      // 글 작성
      writeContents();
      cy.contains("확인").click();

      // 뒤로가기 버튼 클릭
      cy.contains("뒤로가기").click();

      // 브라우저 앞으로 가기 클릭
      cy.go(1);
      haveNotContents();
    });
  });

  describe("에디터", () => {
    it("툴바에서 이미지 업로드 버튼 클릭 시, img src에 my-portfolio-server uri가 포함된다", () => {
      // png 이미지 업로드
      uploadContentImage("logo.png");
      cy.contains("OK").click();
      cy.wait("@postContentImageAPI");

      // 이미지 출력
      cy.get("img").should("have.attr", "src").and("equal", Cypress.env("responseImage"));
      cy.get("img").should("have.attr", "alt").and("equal", "sofa_cat.jpg");
    });

    it("이미지가 아닌 file을 업로드 한 경우, 에디터에 아무런 반응을 주지 않는다", () => {
      cy.get(".ProseMirror").first().type("hello content"); // 본문 입력
      uploadContentImage("writing.json"); // json 업로드
      cy.get(".ProseMirror").first().should("have.text", "hello content"); // [alt](url)이 본문에 추가되지 않음
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
      cy.get(".thumbnail-input").attachFile("writing.json"); // 이미지 파일 대신 json 업로드
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
