import { useDispatch } from "react-redux";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { writingActions } from "reducers/writing";
import { ApiManager } from "types/api";
import { Writing } from "types/writing";

type FindOneWritingApi = ApiManager<string, Writing>;

const findOneWritingApi: FindOneWritingApi = (httpMethod) => ({
  validate(id) {
    if (!id) {
      return false;
    }
    return id.trim().length !== 0;
  },

  async dispatch(id) {
    const api = httpMethod.get(`${API_URL.WRITINGS}/${id}`);
    const response = await receiveApiRequest(api);
    return response;
  },

  receive({ response, success, error }) {
    const dispatch = useDispatch();
    switch (response.status) {
      case OK: {
        dispatch(writingActions.initWritingDetail(response.data));
        success && success();
        break;
      }
      case NOT_FOUND:
      case INTERNAL_SERVER_ERROR: {
        error && error();
        break;
      }
    }
  },
});

export default findOneWritingApi;
