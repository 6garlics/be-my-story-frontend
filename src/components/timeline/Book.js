import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../Profile";

function Book({ friend }) {
  const [pageNum, setPageNum] = useState(0);

  const onClickLeft = () => {
    pageNum > 1 && setPageNum((pageNum) => pageNum - 2);
  };
  const onClickRight = () => {
    pageNum < friend.pages.length - 2 && setPageNum((pageNum) => pageNum + 2);
  };

  return (
    <Root>
      <Container>
        <ProfileWrapper>
          <Profile
            userId={friend.userId}
            profileImage={friend.profileImage}
            nickname={friend.nickname}
          />
        </ProfileWrapper>
        <PageContainer>
          <Page
            book={friend}
            pageNum={pageNum}
            onclick={onClickLeft}
            side="left"
            buttonLeft="0px"
            buttonRight="auto"
            pageNumLeft="20px"
            pageNumRight="auto"
          />
          <Page
            book={friend}
            pageNum={pageNum + 1}
            onclick={onClickRight}
            side="right"
            buttonLeft="auto"
            buttonRight="0px"
            pageNumLeft="auto"
            pageNumRight="20px"
          />
        </PageContainer>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border: 1px solid grey;
  background: white;
`;

const Container = styled.div`
  //border: 1px solid red;
  margin: 20px;
`;

const ProfileWrapper = styled.div`
  margin: 10px;
  margin-top: 15px;
  display: flex;
`;

const PageContainer = styled.div`
  display: flex;
`;

export default Book;
