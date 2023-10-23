import React from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import { IoClose } from "react-icons/io5";

const CommentList = ({ setShowComments }) => {
  //더미데이터
  const comments = [
    { userName: "cat", content: "우와 동화책 완전 재밌어요" },
    { userName: "dog", content: "그림 엄청 예쁘네용" },
    { userName: "bird", content: "굿굿bb" },
  ];
  return (
    <Root>
      <Header>
        댓글 3개
        <CloseBtn onClick={() => setShowComments((prev) => !prev)}>
          <IoClose size={23} color="black" />
        </CloseBtn>
      </Header>
      {comments.map((comment) => (
        <Comment userName={comment.userName} content={comment.content} />
      ))}
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  margin-left: auto;
  padding: 20px;
  box-sizing: border-box;
  color: black;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.7vw;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseBtn = styled.button`
  margin-left: auto;
  padding: 3px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default CommentList;
