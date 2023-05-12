import React, { useState } from "react";
import { styled } from "styled-components";

function Book({ book }) {
  const [pageNum, setPageNum] = useState(1);
  return (
    <Container>
      <Profile>
        <ProfileIcon src={book.profileImage} />
        <ProfileName>{book.userId}</ProfileName>
      </Profile>
      <PageContainer>
        <Button
          onClick={() => {
            pageNum >= 3 && setPageNum((pageNum) => pageNum - 2);
          }}
        >{`<`}</Button>
        <Page>
          <Image
            src={
              book.pages.filter((page, index) => {
                return index + 1 === pageNum;
              })[0].image
            }
            alt=""
            key={pageNum}
          />
          <PageNum>{pageNum}</PageNum>
          <PageText>
            {
              book.pages.filter((page, index) => {
                return index + 1 === pageNum;
              })[0].text
            }
          </PageText>
        </Page>
        <Page>
          <Image
            src={
              book.pages.filter((page, index) => {
                return index + 1 === pageNum + 1;
              })[0].image
            }
            alt=""
            key={pageNum + 1}
          />
          <PageNum>{pageNum + 1}</PageNum>
          <PageText>
            {
              book.pages.filter((page, index) => {
                return index + 1 === pageNum + 1;
              })[0].text
            }
          </PageText>
        </Page>
        <Button
          onClick={() => {
            pageNum < book.pages.length - 1 &&
              setPageNum((pageNum) => pageNum + 2);
          }}
        >{`>`}</Button>
      </PageContainer>
    </Container>
  );
}

const Container = styled.div``;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  background: grey;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
`;

const PageContainer = styled.div`
  display: flex;
`;

const Page = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const PageText = styled.div`
  text-align: center;
  font-size: 20px;
  word-break: keep-all;
`;

const PageNum = styled.div`
  text-align: center;
`;

const Button = styled.button``;

export default Book;
