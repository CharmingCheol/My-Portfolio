import { AxiosError, AxiosResponse } from "axios";
import { BAD_REQUEST, OK } from "http-status";

import { API_URL } from "constants/api";
import { createWritingFixtureList } from "fixtures/writing";
import { writingActions } from "reducers/writing";

import PaginationWritingApi from "./pagination.api";

const mockHttpMethod = {
  get: jest.fn((entity) => entity),
};

const mockUseDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => mockUseDispatch),
}));

describe("PaginationWritingApi", () => {
  const page = 1;
  let paginationWritingApi: ReturnType<typeof PaginationWritingApi>;

  beforeEach(() => {
    const httpMethod = mockHttpMethod as any;
    paginationWritingApi = PaginationWritingApi(httpMethod);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("validate", () => {
    it("page가 1보다 작은 숫자인 경우 false를 반환 한다", () => {
      const zero = paginationWritingApi.validate(0);
      const minus = paginationWritingApi.validate(-1);
      expect(zero).toBeFalsy();
      expect(minus).toBeFalsy();
    });

    it("page가 1이상인 숫자인 경우 true를 반환 한다", () => {
      const actual = paginationWritingApi.validate(1);
      expect(actual).toBeTruthy();
    });
  });

  describe("dispatch", () => {
    it("API 호출 시 page 파라미터가 쿼리스트링으로 추가 된다", async () => {
      await paginationWritingApi.dispatch(page);
      expect(mockHttpMethod.get).toHaveBeenCalledWith(`${API_URL.WRITINGS}`, { params: { page } });
    });

    it("API 응답이 성공할 경우 전달 받은 데이터를 반환 한다", async () => {
      const writingList = createWritingFixtureList(10);
      const apiSuccess: DeepPartial<AxiosResponse> = { data: writingList, status: OK };
      mockHttpMethod.get.mockReturnValue(apiSuccess);

      const actual = await paginationWritingApi.dispatch(page);
      expect(actual).toStrictEqual(apiSuccess);
    });

    it("API 응답이 실패할 경우 에러 데이터를 반환 한다", async () => {
      const apiError: DeepPartial<AxiosError> = { isAxiosError: true, response: { status: BAD_REQUEST } };
      mockHttpMethod.get.mockRejectedValue(apiError);

      const actual = await paginationWritingApi.dispatch(page);
      expect(actual.status).toBe(BAD_REQUEST);
    });
  });

  describe("receive", () => {
    it("status가 200인 경우 pagination 데이터 추가 액션이 호출 된다", () => {
      const mockAction = jest.spyOn(writingActions, "initWritingPagination");
      const response: DeepPartial<AxiosResponse> = { data: createWritingFixtureList(10), status: OK };

      paginationWritingApi.receive({ response: response as AxiosResponse });

      expect(mockUseDispatch).toHaveBeenCalled();
      expect(mockAction).toHaveBeenCalledWith(response.data);
    });
  });
});
