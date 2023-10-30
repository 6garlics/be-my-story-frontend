import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BookCover from "../components/book_shelf/BookCover";
import { getBookshelf } from "../api/books";
import { getUserInfo } from "./../api/users";
import { useEffect } from "react";
import { useContext } from "react";
import ColorContext from "../contexts/Color";
import "react-calendar/dist/Calendar.css";
import BookshelfProfile from "../components/book_shelf/BookshelfProfile";
import { useSelector } from "react-redux";

const Bookshelf = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState();
  const [books, setBooks] = useState();
  const refresh = useSelector((state) => state.user.refresh);

  const colors = useContext(ColorContext);

  //유저 정보 조회
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getUserInfo(userName);
        console.log(data);
        setProfile(data);
      } catch (err) {}
    }
    fetchUserInfo();
  }, [refresh, userName]);

  //책장 조회
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBookshelf(userName);
        console.log(data);
        setBooks(data);
      } catch (err) {}
    }
    fetchBooks();
  }, [userName]);

  return books ? (
    <div style={{ display: "flex" }}>
      <Container>
        <BookshelfProfile
          userName={userName}
          profileImg={profile.profileImg}
          friendStatus={profile.friendStatus}
          bookCnt={books.length}
        />
        <Wrapper>
          {books.map((book) => (
            <BookCoverWrapper>
              <BookCover
                key={book.bookId}
                bookId={book.bookId}
                coverUrl={book.coverUrl}
                title={book.title}
              />
            </BookCoverWrapper>
          ))}
        </Wrapper>
      </Container>
    </div>
  ) : (
    <div>loading</div>
  );
};

const Container = styled.div`
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
`;

const Wrapper = styled.div`
  height: 100%;
  flex: 5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 60px;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden; //가로 스크롤바 숨기기
  //스크롤바 디자인
  &::-webkit-scrollbar {
    width: 20px;
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(151, 161, 255, 0.6);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
`;

const BookCoverWrapper = styled.div`
  padding: 3%;
  box-sizing: border-box;
  @media (min-width: 2001px) {
    width: 16%;
  }
  @media (max-width: 2000px) {
    width: 20%;
  }
  @media (max-width: 1700px) {
    width: 25%;
  }
  @media (max-width: 1400px) {
    width: 33%;
  }
  @media (max-width: 1100px) {
    width: 50%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export default Bookshelf;
