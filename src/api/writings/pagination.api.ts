import { useDispatch } from "react-redux";
import { OK } from "http-status";

import { receiveApiRequest } from "api/utils";
import { API_URL } from "constants/api";
import { writingActions } from "reducers/writing";
import { StrictApiManager } from "types/api";
import { WritingPagination } from "types/writing";

type PaginationWritingApi = StrictApiManager<number, WritingPagination>;

const paginationWritingApi: PaginationWritingApi = (httpMethod) => ({
  validate(page) {
    return 0 < page;
  },

  async dispatch(page) {
    const api = httpMethod.get(`${API_URL.WRITINGS}`, { params: { page } });
    const response = await receiveApiRequest(api);
    return response;
  },

  receive(response) {
    const dispatch = useDispatch();
    switch (response.status) {
      case OK: {
        dispatch(writingActions.initWritingPagination(response.data));
        break;
      }
    }
  },
});

export default paginationWritingApi;
