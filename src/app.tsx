import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getChceckIP } from "apis";
import { useApiRequest } from "hooks";
import StyleReset from "styles/reset";
import Routes from "./routes";

const App = () => {
  const [state, dispatch] = useApiRequest(getChceckIP);
  const history = useHistory();

  useEffect(() => {
    switch (state.type) {
      case "SUCCESS": {
        console.log("");
        break;
      }
      case "FAILURE": {
        history.replace("/blog/error");
        break;
      }
      default: {
        if (!state.type) dispatch({ type: "REQUEST", requestData: { timeout: 1000 * 2 } });
        break;
      }
    }
  }, [dispatch, history, state.type]);

  return (
    <>
      <StyleReset />
      <Routes />
    </>
  );
};

export default App;
