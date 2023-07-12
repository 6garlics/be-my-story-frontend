import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../Profile";

function Book({ book }) {
  const [pageNum, setPageNum] = useState(0);

  const onClickLeft = () => {
    pageNum > 1 && setPageNum((pageNum) => pageNum - 2);
  };
  const onClickRight = () => {
    pageNum < book.pages.length - 2 && setPageNum((pageNum) => pageNum + 2);
  };

  return (
    <Root>
      <Container>
        <ProfileWrapper>
          <Profile
            userId={0}
            profileImage="https://t4.ftcdn.net/jpg/05/65/24/45/1000_F_565244595_9DSsL5nS0nefC3wvjRLybz6UZt1JHvxM.jpg"
            nickname="Jamie"
          />
        </ProfileWrapper>
        <PageContainer>
          <Page
            book={book}
            pageNum={pageNum}
            maxPage={book.pages.length}
            onclick={onClickLeft}
            side="left"
            buttonLeft="0px"
            buttonRight="auto"
            pageNumLeft="20px"
            pageNumRight="auto"
          />
          <Page
            book={book}
            pageNum={pageNum + 1}
            maxPage={book.pages.length}
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
  background: white;
`;

const Container = styled.div`
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
