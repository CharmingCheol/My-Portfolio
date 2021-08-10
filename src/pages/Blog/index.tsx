import React, { useCallback, useState } from "react";
import Pagination from "components/molecules/Pagination";

const Blog = () => {
  const [nowPagination, setNowPagination] = useState(1);

  const handleClickPagination = useCallback(() => {}, []);

  return (
    <div>
      <div>blog</div>
      <Pagination now={1} total={15} onClick={handleClickPagination} />
    </div>
  );
};

export default Blog;
