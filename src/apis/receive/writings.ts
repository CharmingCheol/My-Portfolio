import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";
import { CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, OK } from "http-status";

import { blogActions, useBlogDispatch } from "pages/Blog/index.reducer";
import { useWritingDispatch, writingActions } from "pages/Writing/index.reducer";
import { Writing, WritingPagination } from "types/writing";

const WritingsApiReceive = () => {
  const history = useHistory();
  const blogDispatch = useBlogDispatch();
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

    initPagination: (response: AxiosResponse<WritingPagination>) => {
      switch (response.status) {
        case OK: {
          blogDispatch(blogActions.initWritingPagination(response.data));
          break;
        }
        case NOT_FOUND:
        case INTERNAL_SERVER_ERROR: {
          blogDispatch(blogActions.initWritingPagination({ list: [], totalCount: 0 }));
          break;
        }
      }
    },

    nextPagination: (response: AxiosResponse<WritingPagination>) => {
      switch (response.status) {
        case OK: {
          blogDispatch(blogActions.updateWritingList(response.data.list));
          break;
        }
        case NOT_FOUND:
        case INTERNAL_SERVER_ERROR: {
          blogDispatch(blogActions.updateWritingList([]));
          break;
        }
      }
    },

    create: (response: AxiosResponse<Writing>) => {
      switch (response.status) {
        case CREATED: {
          history.replace(`/writing/${response.data.id}`);
          break;
        }
      }
    },

    update: (response: AxiosResponse<Writing>) => {
      switch (response.status) {
        case CREATED: {
          history.replace(`/writing/${response.data.id}`);
          break;
        }
      }
    },

    delete: (response: AxiosResponse<null>) => {
      switch (response.status) {
        case NO_CONTENT: {
          history.replace("/");
          break;
        }
      }
    },
  };
};

export default WritingsApiReceive;
