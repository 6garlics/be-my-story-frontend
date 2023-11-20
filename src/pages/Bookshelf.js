import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getBookshelf } from "../api/books";
import { getUserInfo } from "./../api/users";
import { useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import BookshelfProfile from "../components/book_shelf/BookshelfProfile";
import { useSelector } from "react-redux";
import BookList from "../components/book_shelf/BookList";

const Bookshelf = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState();
  const [books, setBooks] = useState();
  const refresh = useSelector((state) => state.user.refresh);

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
        <BookList books={books} />
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

export default Bookshelf;
