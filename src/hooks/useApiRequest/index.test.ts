import { act, renderHook } from "@testing-library/react-hooks";
import useApiRequest from "./index";

describe("hooks/useApiRequest", () => {
  it("dispatch 함수 호출 시, state의 상태값이 변경된다", () => {
    const api: () => Promise<any> = () => new Promise(() => {});
    const { result } = renderHook(() => useApiRequest(api));

    // type만 전달
    act(() => {
      result.current[1]({ type: "REQUEST" });
    });
    expect(result.current[0]).toStrictEqual({
      requestData: undefined,
      type: "REQUEST",
    });

    // type과 requestData를 같이 전달
    act(() => {
      result.current[1]({ type: "REQUEST", requestData: { data: "requestData" } });
    });
    expect(result.current[0]).toStrictEqual({
      requestData: "requestData",
      type: "REQUEST",
    });
  });

  it("useEffect가 실행 될 때, api 요청이 성공값으로 반환한다", async () => {
    const res = {
      status: 200,
      data: {
        isAdmin: true,
      },
    };
    const api: () => Promise<any> = () => Promise.resolve(res);
    const { result, waitForNextUpdate } = renderHook(() => useApiRequest(api));
    act(() => {
      result.current[1]({ type: "REQUEST" });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toStrictEqual({
      responseData: { isAdmin: true },
      status: 200,
      type: "SUCCESS",
    });
  });

  it("useEffect가 실행 될 때, api 요청이 실패값으로 반환한다", async () => {
    const res = {
      message: "error message",
    };
    const api: () => Promise<any> = () => Promise.reject(res);
    const { result, waitForNextUpdate } = renderHook(() => useApiRequest(api));
    act(() => {
      result.current[1]({ type: "REQUEST" });
    });
    await waitForNextUpdate();
    expect(result.current[0]).toStrictEqual({
      error: { message: "error message" },
      type: "FAILURE",
    });
  });
});
