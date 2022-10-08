import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "http-status";

import { API_URL } from "constants/api";
import { createWritingFixture } from "fixtures/writing";
import { globalUIActions } from "reducers/globalUI";
import { WritingRequestBody } from "types/writing";

import CreateWritingApi from "./create.api";

const mockHttpMethod = {
  post: jest.fn(),
};

const mockUseHistory = { replace: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => mockUseHistory),
}));

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => mockUseDispatch),
}));

describe("CreateWritingApi", () => {
  const body: WritingRequestBody = { title: "title", content: "content" };
  let createWritingApi: ReturnType<typeof CreateWritingApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    createWritingApi = CreateWritingApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("title이 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = createWritingApi.validate({ title: "", content: "" });
      const case2 = createWritingApi.validate({ title: "  ", content: "" });
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("content가 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = createWritingApi.validate({ title: "title", content: "" });
      const case2 = createWritingApi.validate({ title: "title", content: "  " });
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("데이터가 모두 존재 할 경우 true를 반환 한다", () => {
      const actual = createWritingApi.validate({ title: "title", content: "content" });
      expect(actual).toBeTruthy();
    });
  });

  describe("dispatch", () => {
    it("API 호출 시 body로 전달 할 데이터도 같이 전달 된다", async () => {
      await createWritingApi.dispatch(body);
      expect(mockHttpMethod.post).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, body);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiSuccess: DeepPartial<AxiosResponse> = { data: createWritingFixture(body), status: OK };
      mockHttpMethod.post.mockReturnValue(apiSuccess);

      const actual = await createWritingApi.dispatch(body);
      expect(actual).toStrictEqual(apiSuccess);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockHttpMethod.post.mockRejectedValue(apiError);

      const actual = await createWritingApi.dispatch(body);
      expect(actual).toStrictEqual(apiError.response);
    });
  });

  describe("receive", () => {
    it("status가 200인 경우 게시글 상세 페이지로 이동 한다", () => {
      const response: DeepPartial<AxiosResponse> = { data: createWritingFixture(body), status: OK };
      createWritingApi.receive({ response: response as AxiosResponse });
      expect(mockUseHistory.replace).toHaveBeenCalledWith(`/writing/${response.data.id}`);
    });

    it("status가 400인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const response: DeepPartial<AxiosResponse> = { status: BAD_REQUEST, statusText: "400 error" };

      createWritingApi.receive({ response: response as AxiosResponse });

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "400 error" });
    });

    it("status가 500인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const response: DeepPartial<AxiosResponse> = { status: INTERNAL_SERVER_ERROR, statusText: "500 error" };

      createWritingApi.receive({ response: response as AxiosResponse });

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "500 error" });
    });

    it("알 수 없는 status인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const response: DeepPartial<AxiosResponse> = { status: 426, statusText: "426 error" };

      createWritingApi.receive({ response: response as AxiosResponse });

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "알 수 없는 API 결과 입니다" });
    });
  });
});
