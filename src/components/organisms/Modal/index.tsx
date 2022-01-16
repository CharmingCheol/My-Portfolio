import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import * as S from "./index.style";

export interface Props {
  children: React.ReactNode;
  className?: string;
  isOpened: boolean;
  size?: "small" | "small_wide" | "medium" | "medium_wide" | "large" | "large_wide";
}

interface Portal {
  children: React.ReactNode;
  className?: string;
}

const Portal = (props: Portal) => {
  const { children, className, ...other } = props;
  const [container] = useState(() => {
    const element = document.createElement("div");
    if (className) element.classList.add(className);
    return element;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
};

const Modal = (props: Props) => {
  const { children, className, isOpened, size = "medium", ...other } = props;
  return isOpened ? (
    <Portal className={className}>
      <S.Overlay>
        <S.Content size={size}>{children}</S.Content>
      </S.Overlay>
    </Portal>
  ) : null;
};

export default Modal;
