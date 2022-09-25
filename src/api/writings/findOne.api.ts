import { useDispatch } from "react-redux";
import { OK } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { writingActions } from "reducers/writing";
import { StrictApiManager } from "types/api";
import { Writing } from "types/writing";

type FindOneWritingApi = StrictApiManager<string, Writing>;

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

  receive(response) {
    const dispatch = useDispatch();
    switch (response.status) {
      case OK: {
        dispatch(writingActions.initWriting(response.data));
        break;
      }
    }
  },
});

export default findOneWritingApi;
