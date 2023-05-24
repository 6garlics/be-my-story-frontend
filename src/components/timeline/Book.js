import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Page from "./Page";

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
      <Profile to={`/bookshelf/${friend.userId}`}>
        <ProfileIcon src={friend.profileImage} />
        <ProfileName>{friend.nickname}</ProfileName>
      </Profile>
      <PageContainer>
        <Page
          book={friend}
          pageNum={pageNum}
          onclick={onClickLeft}
          left="0px"
          right="auto"
        />
        <Page
          book={friend}
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
