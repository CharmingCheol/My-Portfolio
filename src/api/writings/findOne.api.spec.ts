import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { WritingFixture } from "fixtures";
import { writingActions } from "reducers/writing";

import FindOneWritingApi from "./findOne.api";

const mockHttpMethod = {
  get: jest.fn(),
};

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => mockUseDispatch),
}));

describe("FindOneWritingApi", () => {
  const id = "id";
  let findOneWritingApi: ReturnType<typeof FindOneWritingApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    findOneWritingApi = FindOneWritingApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("id가 빈 문자열인 경우 false를 반환 한다", () => {
      const case1 = findOneWritingApi.validate("");
      const case2 = findOneWritingApi.validate("  ");
      expect(case1).toBeFalsy();
      expect(case2).toBeFalsy();
    });

    it("데이터가 모두 존재 할 경우 true를 반환 한다", () => {
      const actual = findOneWritingApi.validate(id);
      expect(actual).toBeTruthy();
    });
  });

  describe("dispatch", () => {
    it("전달 된 id가 API 주소에 포함 된다", async () => {
      await findOneWritingApi.dispatch(id);
      expect(mockHttpMethod.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}/${id}`);
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const apiSuccess: DeepPartial<AxiosResponse> = { data: new WritingFixture(), status: OK };
      mockHttpMethod.get.mockReturnValue(apiSuccess);

      const actual = await findOneWritingApi.dispatch(id);
      expect(actual).toStrictEqual(apiSuccess);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockHttpMethod.get.mockRejectedValue(apiError);

      const actual = await findOneWritingApi.dispatch(id);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("receive", () => {
    it("status가 200인 경우 게시글 상세 페이지로 이동 한다", () => {
      const initWritingAction = jest.spyOn(writingActions, "initWritingDetail");
      const response: DeepPartial<AxiosResponse> = { data: new WritingFixture(), status: OK };

      findOneWritingApi.receive({ response: response as AxiosResponse });

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(initWritingAction).toHaveBeenCalledWith(response.data);
    });
  });
});
