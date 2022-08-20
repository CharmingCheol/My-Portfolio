import ApiOptions from "./api-options";

describe("ApiOptions", () => {
  let apiOptions: ApiOptions;

  beforeEach(() => {
    apiOptions = new ApiOptions();
  });

  describe("retry", () => {
    describe("tryCount가 0보다 작을 경우 실행을 중단한다", () => {
      it("retry = 0", () => {
        const zeroRetry = apiOptions.retry(0);
        expect(zeroRetry).toBeUndefined();
      });
      it("retry < 0", () => {
        const minusRetry = apiOptions.retry(-1);
        expect(minusRetry).toBeUndefined();
      });
    });
  });
});
