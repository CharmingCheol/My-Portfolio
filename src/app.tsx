import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getChceckIP } from "apis";
import { useApiRequest } from "hooks";
import { useAppDispatch } from "store";
import { changeIsAdmin } from "reducers/optionSlice";
import StyleReset from "styles/reset";
import Routes from "./routes";

const App = () => {
  const [state, apiDispatch] = useApiRequest<{ isAdmin: boolean }>(getChceckIP);
  const storeDispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    switch (state.type) {
      case "SUCCESS": {
        const isAdmin = state.responseData?.isAdmin;
        if (isAdmin !== undefined) {
          if (!isAdmin) history.replace("/");
          storeDispatch(changeIsAdmin(isAdmin));
        }
        break;
      }
      case "FAILURE": {
        if (location.pathname === "/write") history.replace("/");
        storeDispatch(changeIsAdmin(false));
        break;
      }
      default: {
        if (!state.type) apiDispatch({ type: "REQUEST", requestData: { timeout: 1000 * 2 } });
        break;
      }
    }
  }, [apiDispatch, state, storeDispatch]);

  return (
    <>
      <StyleReset />
      <Routes />
    </>
  );
};

export default App;
