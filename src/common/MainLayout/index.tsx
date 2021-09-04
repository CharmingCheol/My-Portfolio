import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fnGetMainLayoutPage } from "utils";
import * as S from "./index.style";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;
  const location = useLocation();

  const isCenterLayout = useMemo(() => {
    return fnGetMainLayoutPage(location.pathname);
  }, [location.pathname]);

  return <S.Main isCenterLayout={isCenterLayout}>{children}</S.Main>;
};

export default MainLayout;
