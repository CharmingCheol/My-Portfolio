import { AxiosResponse } from "axios";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";

import { useWritingDispatch, writingActions } from "pages/Writing/index.reducer";
import { Writing } from "types/writing";

const WritingsApi = () => {
  const writingDispatch = useWritingDispatch();

  return {
    findOne: (response: AxiosResponse<Writing>) => {
      switch (response.status) {
        case OK: {
          writingDispatch(writingActions.initWritingDetail(response.data));
          break;
        }
        case NOT_FOUND:
        case INTERNAL_SERVER_ERROR: {
          writingDispatch(writingActions.setIsNotFound(true));
          break;
        }
      }
    },
  };
};

export default WritingsApi;
