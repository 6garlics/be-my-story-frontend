import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { postComment } from "../../api/reply";
import { useDispatch } from "react-redux";
import { userSlice } from "./../../redux/userSlice";

const CommentInput = ({ bookId }) => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  //모댓글 등록
  const addComment = async () => {
    await postComment(bookId, {
      content: content,
      date: "2023-11-09",
    });
    dispatch(userSlice.actions.setRefresh());
    setContent("");
  };

  return (
    <Wrapper>
      <Input
        placeholder="댓글을 써보아요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addComment();
          }
        }}
      />
      {/* <AddButton onClick={addComment}>+</AddButton> */}
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  height: 32px;
  padding: 0px 12px;
  box-sizing: border-box;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  font-family: inherit;
  font-size: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999999;
  }
`;

const AddButton = styled.button`
  margin-left: 10px;
`;
