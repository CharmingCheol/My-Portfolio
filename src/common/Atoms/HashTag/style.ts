import styled from "styled-components";
import palatte from "@utils/styles/palette";

export const HashTag = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 24px;
  padding: 0px 8px;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid ${palatte.blue5};
  border-radius: 8px;
  background: transparent;
  color: ${palatte.blue5};
`;
