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
          buttonLeft="0px"
          buttonRight="auto"
          pageNumLeft="4px"
          pageNumRight="auto"
        />
        <Page
          book={friend}
          pageNum={pageNum + 1}
          onclick={onClickRight}
          buttonLeft="auto"
          buttonRight="0px"
          pageNumLeft="auto"
          pageNumRight="4px"
        />
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 20px;
`;

const ProfileWrapper = styled.div`
  margin: 10px;
  margin-top: 15px;
`;

const PageContainer = styled.div`
  display: flex;
`;

export default Book;
