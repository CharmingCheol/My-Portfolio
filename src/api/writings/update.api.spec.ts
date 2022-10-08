import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { createWritingFixture } from "fixtures/writing.fixture";
import { WritingRequestBody } from "types/writing";

import UpdateWritingApi from "./update.api";

const mockHttpMethod = {
  patch: jest.fn(),
};

const mockUseHistory = { replace: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => mockUseHistory),
}));

describe("UpdateWritingApi", () => {
  const id = "id";
  const body: WritingRequestBody = { title: "title", content: "content" };
  let updateWritingApi: ReturnType<typeof UpdateWritingApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    updateWritingApi = UpdateWritingApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("content가 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = updateWritingApi.validate({ body: { content: "", title: "" }, id: "" });
      const case2 = updateWritingApi.validate({ body: { content: "  ", title: "" }, id: "" });
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("title이 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = updateWritingApi.validate({ body: { content: "content", title: "" }, id: "" });
      const case2 = updateWritingApi.validate({ body: { content: "content", title: "  " }, id: "" });
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("id가 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = updateWritingApi.validate({ body, id: "" });
      const case2 = updateWritingApi.validate({ body, id: "  " });
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("데이터가 모두 존재할 경우 true를 반환 한다", () => {
      const case1 = updateWritingApi.validate({ body, id });
      const case2 = updateWritingApi.validate({ body, id });
      expect(case1).toBeTruthy();
      expect(case2).toBeTruthy();
    });
  });

  describe("dispatch", () => {
    it("API 호출 시 body와 id도 같이 전달 된다", async () => {
      await updateWritingApi.dispatch({ body, id });
      expect(mockHttpMethod.patch).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiSuccess: DeepPartial<AxiosResponse> = { data: createWritingFixture(), status: OK };
      mockHttpMethod.patch.mockReturnValue(apiSuccess);

      const actual = await updateWritingApi.dispatch({ body, id });
      expect(actual).toStrictEqual(apiSuccess);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockHttpMethod.patch.mockRejectedValue(apiError);

      const actual = await updateWritingApi.dispatch({ body, id });
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("receive", () => {
    it("status가 200인 경우 게시글 상세 페이지로 이동 한다", () => {
      const response: DeepPartial<AxiosResponse> = { data: createWritingFixture({ ...body, id }), status: OK };
      updateWritingApi.receive({ response: response as AxiosResponse });
      expect(mockUseHistory.replace).toHaveBeenCalledWith(`/writing/${response.data.id}`);
    });
  });
});
