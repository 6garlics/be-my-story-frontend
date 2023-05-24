import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Page from "./Page";

function Book({ book }) {
  const [pageNum, setPageNum] = useState(0);
  const onClickLeft = () => {
    pageNum > 1 && setPageNum((pageNum) => pageNum - 2);
  };
  const onClickRight = () => {
    pageNum < book.pages.length - 2 && setPageNum((pageNum) => pageNum + 2);
  };
  return (
    <Container>
      <Profile to={`/bookshelf/${book.userId}`}>
        <ProfileIcon src={book.profileImage} />
        <ProfileName>{book.nickname}</ProfileName>
      </Profile>
      <PageContainer>
        <Page
          book={book}
          pageNum={pageNum}
          onclick={onClickLeft}
          left="0px"
          right="auto"
        />
        <Page
          book={book}
          pageNum={pageNum + 1}
          onclick={onClickRight}
          left="auto"
          right="0px"
        />
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 10px 20px;
`;

const Profile = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
`;

const PageContainer = styled.div`
  display: flex;
`;

export default Book;
