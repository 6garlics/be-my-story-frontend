import React from "react";
import { styled } from "styled-components";

const CommentItem = ({ userName, content }) => {
  return (
    <Root>
      <ProfileImg>
        <Img src="/images/logo.png" />
      </ProfileImg>
      <Wrapper>
        <UserName>{userName}</UserName>
        <Content>{content}</Content>
      </Wrapper>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  margin: 24px 0px;
`;

const ProfileImg = styled.div`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 4px;
`;

const Img = styled.img`
  width: 100%;
`;

const Wrapper = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  font-size: 18px;
`;

export default CommentItem;
