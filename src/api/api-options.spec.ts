import ApiOptions from "./api-options";

describe("ApiOptions", () => {
  let apiOptions: ApiOptions;

  beforeEach(() => {
    apiOptions = new ApiOptions();
  });

  describe("retry", () => {
    describe("tryCount가 0보다 작을 경우 실행을 중단한다", () => {
      it("retry = 0", () => {
        const response = apiOptions.retry(0, 0);
        expect(response).toBeUndefined();
      });
      it("retry < 0", () => {
        const response = apiOptions.retry(-1, 0);
        expect(response).toBeUndefined();
      });
    });
    describe("delay가 0보다 작을 경우 실행을 중단한다", () => {
      it("delay = 0", () => {
        const response = apiOptions.retry(1, 0);
        expect(response).toBeUndefined();
      });

      it("delay < 0", () => {
        const response = apiOptions.retry(1, -1);
        expect(response).toBeUndefined();
      });
    });
  });
});
