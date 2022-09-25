import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NO_CONTENT, OK } from "http-status";

import { API_URL } from "constants/api";
import { globalUIActions } from "reducers/globalUI";

import DeleteWritingApi from "./delete.api";

const mockHttpMethod = {
  delete: jest.fn(),
};

const mockUseHistory = { replace: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => mockUseHistory),
}));

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => mockUseDispatch),
}));

describe("DeleteWritingApi", () => {
  const id = "id";
  let deleteWritingApi: ReturnType<typeof DeleteWritingApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    deleteWritingApi = DeleteWritingApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("id가 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = deleteWritingApi.validate("");
      const case2 = deleteWritingApi.validate("  ");
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("데이터가 모두 존재 할 경우 true를 반환 한다", () => {
      const actual = deleteWritingApi.validate(id);
      expect(actual).toBeTruthy();
    });
  });

  describe("dispatch", () => {
    it("전달 된 id가 API 주소에 포함 된다", async () => {
      await deleteWritingApi.dispatch(id);
      expect(mockHttpMethod.delete).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiSuccess: DeepPartial<AxiosResponse> = { data: null, status: OK };
      mockHttpMethod.delete.mockReturnValue(apiSuccess);

      const actual = await deleteWritingApi.dispatch(id);
      expect(actual).toStrictEqual(apiSuccess);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockHttpMethod.delete.mockRejectedValue(apiError);

      const actual = await deleteWritingApi.dispatch(id);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("receive", () => {
    it("status가 204인 경우 게시글 상세 페이지로 이동 한다", () => {
      const apiSuccess: DeepPartial<AxiosResponse> = { data: null, status: NO_CONTENT };
      deleteWritingApi.receive(apiSuccess as AxiosResponse);
      expect(mockUseHistory.replace).toHaveBeenCalledWith(`/`);
    });

    it("status가 400인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const apiFailure: DeepPartial<AxiosResponse> = { status: BAD_REQUEST, statusText: "400 error" };

      deleteWritingApi.receive(apiFailure as AxiosResponse);

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "400 error" });
    });

    it("status가 500인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const apiFailure: DeepPartial<AxiosResponse> = { status: INTERNAL_SERVER_ERROR, statusText: "500 error" };

      deleteWritingApi.receive(apiFailure as AxiosResponse);

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "500 error" });
    });

    it("알 수 없는 status인 경우 토스트 추가 액션을 호출 한다", () => {
      const addToastAction = jest.spyOn(globalUIActions, "addToast");
      const apiFailure: DeepPartial<AxiosResponse> = { status: 426, statusText: "426 error" };

      deleteWritingApi.receive(apiFailure as AxiosResponse);

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(addToastAction).toHaveBeenCalledWith({ message: "알 수 없는 API 결과 입니다" });
    });
  });
});
