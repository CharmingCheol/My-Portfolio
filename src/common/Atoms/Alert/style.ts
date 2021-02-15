import styled, { css } from "styled-components";
import palette from "@utils/styles/palette";

export const Alert = styled.li<{ status: "success" | "error" }>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 30%;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  span {
    word-break: keep-all;
    margin-right: 8px;
  }
  svg {
    margin-left: auto;
  }
  ${(props) => {
    if (props.status === "success") {
      return css`
        background: ${palette.blue3};
        color: ${palette.blue6};
        font-weight: bold;
      `;
    }
    if (props.status === "error") {
      return css`
        background: ${palette.red3};
        color: ${palette.red6};
        font-weight: bold;
      `;
    }
  }}
`;
