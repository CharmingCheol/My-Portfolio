import React, { useLayoutEffect } from "react";

import { useWritingsApiReceive } from "apis/receive";
import { WritingsApiSend } from "apis/send";

import BlogProvider from "./index.reducer";
import WritingList from "./writing-list";

const BlogPage = () => {
  const WritingsApiReceive = useWritingsApiReceive();

  useLayoutEffect(() => {
    (async () => {
      const dafaultPage = 1;
      const response = await WritingsApiSend.pagination(dafaultPage);
      WritingsApiReceive.initPagination(response);
    })();
  }, []);

  return <WritingList />;
};

const BlogPageWrapper = () => (
  <BlogProvider>
    <BlogPage />
  </BlogProvider>
);

export default BlogPageWrapper;
