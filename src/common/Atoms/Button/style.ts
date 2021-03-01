import styled from "styled-components";

interface ButtonParms {
  buttonColor: string;
  disabledColor: string;
}

export const Button = styled.button<ButtonParms>`
  padding: 4px 16px;
  cursor: pointer;
  color: white;
  background: ${(props) => props.buttonColor};
  &:disabled {
    background: ${(props) => props.disabledColor};
    cursor: default;
  }
`;
