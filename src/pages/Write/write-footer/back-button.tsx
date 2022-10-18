import React from "react";
import { useHistory } from "react-router-dom";

import Button from "components/atoms/Button";

const BackButton = () => {
  const history = useHistory();

  const handleClickGoBackButton = () => {
    history.goBack();
  };

  return (
    <Button onClick={handleClickGoBackButton} color="main_away">
      뒤로가기
    </Button>
  );
};

export default BackButton;
