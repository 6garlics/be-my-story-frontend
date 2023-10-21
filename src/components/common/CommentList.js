import React from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import { IoClose } from "react-icons/io5";

const CommentList = ({ setShowComments }) => {
  return (
    <Root>
      <Header>
        댓글 3개
        <CloseBtn onClick={() => setShowComments((prev) => !prev)}>
          <IoClose size={23} color="black" />
        </CloseBtn>
      </Header>
      <Comment />
      <Comment />
      <Comment />
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
  background: rgba(255, 255, 255, 0.7);
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
