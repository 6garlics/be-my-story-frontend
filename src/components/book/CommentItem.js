import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { deleteComment } from "../../api/reply";
import smallTrash from "../../assets/smallTrash.svg";
import { userSlice } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const CommentItem = ({ userName, profileImg, content, replyId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //댓글 삭제
  const onDeleteComment = () => {
    async function removeComment() {
      if (window.confirm("댓글을 삭제할까요?")) {
        await deleteComment(replyId);
      }
      dispatch(userSlice.actions.setRefresh());
    }
    removeComment();
  };

  const onMouseOver = () => {
    setIsHovering(true);
  };

  const onMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Root onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <ProfileImg onClick={() => navigate(`/bookshelf/${userName}`)}>
        <Img src={profileImg} />
      </ProfileImg>
      <Wrapper>
        <UserName onClick={() => navigate(`/bookshelf/${userName}`)}>
          {userName}
        </UserName>
        <Content>{content}</Content>
      </Wrapper>
      <Button onClick={onDeleteComment} $show={isHovering}>
        <img src={smallTrash} alt="" />
      </Button>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  padding: 12px 0px;
  box-sizing: border-box;
`;

const ProfileImg = styled.div`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100px;
  margin-left: 10px;
`;

const UserName = styled.div`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  font-size: 18px;
`;

const Button = styled.div`
  margin-left: auto;
  margin-top: 14px;
  visibility: ${({ $show }) => !$show && "hidden"};
  &:hover {
    cursor: pointer;
  }
`;

export default CommentItem;
