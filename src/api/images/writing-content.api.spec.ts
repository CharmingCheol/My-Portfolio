import WritingContentImageApi from "./writing-content.api";

const mockHttpMethod = {
  post: jest.fn((entity) => entity),
};

describe("WritingContentImageApi", () => {
  let writingContentImageApi: ReturnType<typeof WritingContentImageApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    writingContentImageApi = WritingContentImageApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("file 이름이 없을 경우 false를 반환 한다", () => {
      const file = new File([""], "");
      const actual = writingContentImageApi.validate(file);
      expect(actual).toBeFalsy();
    });

    it("file 이름이 확장자로만 되어 있을 경우 false를 반환 한다", () => {
      const file = new File([""], "jpg");
      const actual = writingContentImageApi.validate(file);
      expect(actual).toBeFalsy();
    });

    it("file 이름이 확장자 형식으로만 되어 있을 경우 false를 반환 한다", () => {
      const file = new File([""], ".jpg");
      const actual = writingContentImageApi.validate(file);
      expect(actual).toBeFalsy();
    });

    it("이미지 파일 형식이 아닐 경우 false를 반환 한다", () => {
      const txtFile = new File([""], "name.txt");
      const actual = writingContentImageApi.validate(txtFile);
      expect(actual).toBeFalsy();
    });

    describe("이미지 파일 형식인 경우 true를 반환 한다", () => {
      it("jpg 이미지 파일", () => {
        const jpgFile = new File([""], "name.jpg");
        const actual = writingContentImageApi.validate(jpgFile);
        expect(actual).toBeTruthy();
      });
      it("jpeg 이미지 파일", () => {
        const jpegFile = new File([""], "name.jpeg");
        const actual = writingContentImageApi.validate(jpegFile);
        expect(actual).toBeTruthy();
      });
      it("jpg 이미지 파일", () => {
        const pngFile = new File([""], "name.png");
        const actual = writingContentImageApi.validate(pngFile);
        expect(actual).toBeTruthy();
      });
    });
  });
});
