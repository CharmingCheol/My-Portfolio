import React, { useLayoutEffect } from "react";

import { getWritingList } from "fireConfig/writings";
import { writingActions } from "reducers/writing";
import { useAppDispatch } from "store";

import WritingList from "./writing-list";

const Blog = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const callGetWritingList = async () => {
      try {
        const response = await getWritingList({ now: 1, size: 10 });
        dispatch(writingActions.initWritingPagination(response));
      } catch {
        dispatch(writingActions.clearWritingPagination());
      }
    };
    callGetWritingList();
  }, [dispatch]);

  return <WritingList />;
};

export default Blog;
