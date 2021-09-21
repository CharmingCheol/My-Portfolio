import { useEffect, useReducer, Dispatch } from "react";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type DispatchType = "REQUEST" | "SUCCESS" | "FAILURE" | null;
type Return<Response> = [State<Response>, Dispatch<State<Response>>];

interface State<Response> {
  error?: AxiosError;
  requestData?: AxiosRequestConfig;
  url?: any;
  responseData?: Response;
  status?: number;
  type: DispatchType;
}

interface Reducer<Response> {
  (state: State<Response>, action: State<Response>): State<Response>;
}

function reducer<Response>(state: State<Response>, action: State<Response>): State<Response> {
  switch (action.type) {
    case "REQUEST": {
      return { requestData: action.requestData, url: action.url, type: action.type };
    }
    case "SUCCESS": {
      return { responseData: action.responseData, status: action.status, type: action.type };
    }
    case "FAILURE": {
      return { error: action.error, type: action.type };
    }
    default: {
      return state;
    }
  }
}

const useApiRequest = <Response>(api: (...args: any[]) => Promise<AxiosResponse>): Return<Response> => {
  const initialState: State<Response> = {
    type: null,
  };
  const [state, dispatch] = useReducer<Reducer<Response>>(reducer, initialState);

  useEffect(() => {
    if (state.type === "REQUEST") {
      const requestApi = async () => {
        try {
          const { status, data } = await api(state.url, state.requestData);
          if (status < 300) dispatch({ responseData: data, status, type: "SUCCESS" });
        } catch (error) {
          dispatch({ type: "FAILURE", error: error as AxiosError });
        }
      };
      requestApi();
    }
  }, [api, state.requestData, state.url, state.type]);

  return [state, dispatch];
};

export default useApiRequest;
