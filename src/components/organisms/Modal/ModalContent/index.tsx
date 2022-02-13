import React, { useEffect, useRef, ReactNode } from "react";
import { useDispatch } from "react-redux";

import { closeModal } from "reducers/globalUI";

import * as S from "./index.style";

export interface Props {
  /**
   * 모달 바깥 클릭 / esc 입력 시, 모달이 닫히도록 설정
   * props를 false로 줄 경우, 위 이벤트 동작에도 모달이 닫히지 않음
   */
  autoClose?: boolean;

  children: ReactNode;
}

const ModalContent = (props: Props) => {
  const { autoClose = true, children } = props;

  const dispatch = useDispatch();

  const modalContentRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 / esc 입력 시, 모달이 닫히도록 설정
  useEffect(() => {
    const currentRef = modalContentRef.current;
    if (currentRef && autoClose) {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;
        const isContains = currentRef.contains(target);
        if (!isContains) {
          dispatch(closeModal());
        }
      };

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          dispatch(closeModal());
        }
      };

      window.addEventListener("click", handleOutsideClick);
      window.addEventListener("keydown", handleKeydown);

      return () => {
        window.removeEventListener("click", handleOutsideClick);
        window.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [autoClose, dispatch]);

  return <S.Content ref={modalContentRef}>{children}</S.Content>;
};

export default ModalContent;
