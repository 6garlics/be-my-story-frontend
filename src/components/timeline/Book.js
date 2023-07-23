import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../Profile";
import Cover from "./Cover";

function Book({ book }) {
  const [open, setOpen] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  const onClickLeft = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 2); //앞장으로 넘어가기
    else setPageNum((prev) => prev - 1); //표지로 넘어가기
  };
  const onClickRight = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1);
    else if (pageNum <= book.pages.length - 2) setPageNum((prev) => prev + 2);
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
        {pageNum === 0 ? (
          <Cover
            img_url="/images/dummy3.png"
            title="자전거를 타고 떠나요"
            onclick={onClickRight}
            side="right"
            buttonLeft="auto"
            buttonRight="0px"
          />
        ) : (
          <PageContainer>
            <Page
              img_url={book.pages[pageNum - 1].img_url}
              text={book.pages[pageNum - 1].text}
              pageNum={pageNum}
              onclick={onClickLeft}
              side="left"
              buttonLeft="0px"
              buttonRight="auto"
              pageNumLeft="20px"
              pageNumRight="auto"
            />
            {pageNum < book.pages.length && (
              <Page
                img_url={book.pages[pageNum].img_url}
                text={book.pages[pageNum].text}
                pageNum={pageNum + 1}
                onclick={onClickRight}
                side="right"
                buttonLeft="auto"
                buttonRight="0px"
                pageNumLeft="auto"
                pageNumRight="20px"
              />
            )}
          </PageContainer>
        )}
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
