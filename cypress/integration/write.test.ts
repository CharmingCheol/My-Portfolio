const RESPONSE_IMAGE = "https://res.cloudinary.com/demo/image/upload/w_400/sofa_cat.jpg";
const SERVER_URL = "http://localhost:3001/api";

describe("글 작성 페이지", () => {
  describe("뒤로가기 버튼", () => {
    it("글 작성 도중 뒤로 갔다가 다시 앞으로 갈 경우, 초기화 된 상태로 글 작성 페에지에 이동한다", () => {
      cy.visit("/post/2");
      cy.visit(Cypress.env("WRITE_PAGE"));
      cy.get(".title-input").type("hello title");
      cy.get(".ProseMirror").first().type("hello content");
      cy.go(-1);
      cy.url().should("include", "/post/2");
      cy.get("#editor").should("not.exist");
      cy.go(1);
      cy.get("#editor");
      cy.contains("hello title").should("not.exist");
      cy.contains("hello content").should("not.exist");
    });
  });

  describe("에디터", () => {
    it("툴바에서 이미지 업로드 버튼 클릭 시, img src에 my-portfolio-server uri가 포함된다", () => {
      cy.intercept(
        {
          method: "POST",
          url: `${SERVER_URL}/images/contents`,
        },
        { body: { url: RESPONSE_IMAGE } },
      ).as("uploadImage");
      cy.visit(Cypress.env("WRITE_PAGE"));

      cy.get("button.image").click();
      cy.contains("Choose a file").click();
      cy.get('input[type="file"]').attachFile("logo.png");
      cy.contains("OK").click();
      cy.wait("@uploadImage");
      cy.get("img").should("have.attr", "src").and("equal", RESPONSE_IMAGE);
      cy.get("img").should("have.attr", "alt").and("equal", "sofa_cat.jpg");
    });

    it("이미지가 아닌 file을 업로드 한 경우, 에디터에 아무런 반응을 주지 않는다", () => {
      cy.visit(Cypress.env("WRITE_PAGE"));
      cy.get(".ProseMirror").first().type("hello content"); // 본문 입력
      cy.get("button.image").click();
      cy.contains("Choose a file").click();
      cy.get('input[type="file"]').attachFile("example.json"); // json 업로드
      cy.get(".ProseMirror").first().should("have.text", "hello content"); // [alt](url)이 추가되지 않음
    });
  });

  describe("환결설정", () => {
    const thumbnailUpload = () => {
      cy.intercept(
        {
          method: "POST",
          url: `${SERVER_URL}/images/thumbnails`,
        },
        { body: { url: RESPONSE_IMAGE } },
      ).as("thumbnails");
      cy.visit(Cypress.env("WRITE_PAGE"));
      cy.contains("환경설정").click();
      cy.get(".thumbnail-preview").click();
      cy.get(".thumbnail-input").attachFile("logo.png");
      cy.wait("@thumbnails");
    };
    it("대표사진 업로드 성공 시, 이미지 미리보기가 변경된다", () => {
      thumbnailUpload();
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", RESPONSE_IMAGE);
    });

    it("대표사진 업로드에 실패 할 경우, 이미지 미리보기가 변경되지 않는다", () => {
      thumbnailUpload(); // 썸네일 업로드
      cy.get(".thumbnail-preview").click(); // 썸네일 업로드 재시도
      cy.get(".thumbnail-input").attachFile("example.json"); // 이미지 파일 대신 json 업로드
      cy.get('[alt="thumbnail-preview"]').should("have.attr", "src").and("equal", RESPONSE_IMAGE); // 이전에 업로드 한 썸네일 이미지 출력
    });

    // it("[초기화] 버튼 클릭 시, 환결설정에 입력한 값들이 기본값으로 초기화된다", () => {});

    // it("[초기화] 초기화 후 확인 버튼을 눌렀다가 다시 모달창을 열었을 때, 기본값으로 초기화된다", () => {});

    // it("설정값을 변경 후 [적용] 버튼을 눌렀다가 다시 모달창을 열었을 때, 세팅 된 값으로 출력된다 ", () => {});
  });

  // describe("출간하기 버튼", () => {
  //   it("제목이 비어있는 상태로 출간하기 버튼 클릭 시, '제목이 비었습니다' 알림창을 띄운다", () => {});

  //   it("본문이 비어있는 상태로 출간하기 버튼 클릭 시, '본문이 비었습니다' 알림창을 띄운다", () => {});

  //   it("썸네일이 비어있는 상태로 출간하기 버튼 클릭 시, '썸네일이 비었습니다' 알림창을 띄운다", () => {});

  //   it("제목, 본문, 썸네일을 작성 후 출간하기 버튼 클릭 시, api 응답이 이루어지고 게시글 상세 페이지로 이동한다", () => {});

  //   it("글을 작성해서 게시글 상세 페이지로 이동 후 뒤로가기 버튼 클릭 시, 초기화 된 상태로 글 쓰기 페이지에 이동한다", () => {});
  // });
});
