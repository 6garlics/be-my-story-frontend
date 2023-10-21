import React from "react";
import { styled } from "styled-components";

const Comment = () => {
  return (
    <Root>
      <ProfileImg>
        <Img src="/images/logo.png" />
      </ProfileImg>
      <Wrapper>
        <UserName>Jamie0829</UserName>
        <Content>
          우와 동화책이 너무
          멋져요!우와아아ㅏ아아ㅏ아아아아ㅏ아아아아아ㅏ아아ㅏ아아아ㅏ아아ㅏㅏ아아아아아아아ㅏㅇ
        </Content>
      </Wrapper>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  margin: 10px 0px;
`;

const ProfileImg = styled.div`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 5px;
`;

const Img = styled.img`
  width: 100%;
`;

const Wrapper = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-size: 16px;
`;

const Content = styled.div``;

export default Comment;
