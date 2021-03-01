import React, { useCallback, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@common/Atoms/Button";
import Date from "@common/Atoms/Date";
import HashTagList from "@common/Molecules/HashTagList";
import Modal from "@common/Organisms/Modal";
import { AlertListContext } from "@reducers/AlertList";
import { addAlert } from "@reducers/AlertList/action";
import * as S from "./style";

export interface PostDetailHeaderProps {
  date: string;
  deletePostDetail: () => void;
  hashTagList: string[];
  title: string;
}

const PostDetailHeader = ({ date, deletePostDetail, hashTagList, title }: PostDetailHeaderProps) => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const { dispatch } = useContext(AlertListContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [disabledDeleteBtn, setDisabledDeleteBtn] = useState(false);

  // 삭제 텍스트 클릭
  const clickDeleteText = useCallback(() => {
    setToggleModal((prev) => !prev);
  }, []);

  // [삭제] 버튼 클릭
  const clickDeleteButton = useCallback(() => {
    try {
      setDisabledDeleteBtn(true);
      deletePostDetail();
    } catch {
      dispatch(addAlert({ status: "error", text: "서버와의 에러가 발생하였습니다" }));
      setDisabledDeleteBtn(true);
    }
  }, [deletePostDetail, dispatch]);

  return (
    <>
      <S.Layout>
        <h1>{title}</h1>
        <div className="date-wrapper">
          <Date dateText={date} className="created-at" />
          <Link className="modify-btn" to={`/blog/write/post?id=${id}&category=${category}`}>
            수정
          </Link>
          <S.DeleteText onClick={clickDeleteText}>삭제</S.DeleteText>
        </div>
        <HashTagList hashTagList={hashTagList} />
        <Modal modalClassName={toggleModal ? "active" : ""}>
          <p>게시글을 삭제하시겠습니까?</p>
          <div className="delete-button-wrapper">
            <Button onClick={clickDeleteText}>취소</Button>
            <Button disabled={disabledDeleteBtn} onClick={clickDeleteButton}>
              삭제
            </Button>
          </div>
        </Modal>
      </S.Layout>
    </>
  );
};

export default PostDetailHeader;
