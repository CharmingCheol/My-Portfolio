import React from "react";
import { Link } from "react-router-dom";

import Button from "components/atoms/Button";
import { useWritingSelector } from "pages/Writing/index.reducer";

const WriteLinkButton = () => {
  const writing = useWritingSelector((state) => state.writingDetail);

  return (
    <Button>
      <Link to={{ pathname: `${process.env.WRITE_PAGE}`, state: writing }}>수정</Link>
    </Button>
  );
};

export default WriteLinkButton;
