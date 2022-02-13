import styled from "styled-components";

import { palette } from "styles/palette";

export const Content = styled.div`
  min-width: 280px;
  max-width: 40%;
  padding: 28px 24px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  background: ${palette.white_20};
`;
