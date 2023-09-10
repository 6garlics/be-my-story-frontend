import React, { useState } from "react";
//import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BookCover from "../components/book_shelf/BookCover";
import Friends from "../components/book_shelf/Friends";
import { users } from "../data/UsersData";
import { FaUserFriends } from "react-icons/fa";
import { getBookshelf } from "../api/books";
import { getUserInfo } from "./../api/users";
import { useEffect } from "react";
import { useContext } from "react";
import ColorContext from "../contexts/Color";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Profile from "../components/book_shelf/Profile";

const booksData = [
  {
    bookId: 40,
    date: "2023-08-23",
    coverUrl:
      "https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/ecbe3715-ec56-4b6f-a1ed-09fa3fedea6f.jpg",
    title: "용감한 소녀 제니와 마법 세계의 모험",
  },
  {
    bookId: 37,
    date: "2023-08-19",
    coverUrl:
      "https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/8991d946-99bf-4dad-b73b-c1e25d96c03c.jpg",
    title: "자전거 타고 떠나는 신비로운 모험",
  },
  {
    bookId: 38,
    date: "2023-08-18",
    coverUrl:
      "https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/d4ae09d8-e60c-4965-9118-b2a426a93792.jpg",
    title: "용감한 소녀 제니의 자전거 모험: 꿈을 향한 힘찬 여정",
  },
  {
    bookId: 39,
    date: "2023-08-16",
    coverUrl:
      "https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/211a45e0-f496-48ab-98f3-e00b77c3670d.jpg",
    title: "눈속의 요정들과 함께하는 자전거 모험기",
  },
];

const Bookshelf = () => {
  const { userName } = useParams();
  const [profileImg, setProfileImg] = useState();
  const [books, setBooks] = useState();

  const colors = useContext(ColorContext);

  //유저 정보 조회
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getUserInfo(userName);
        console.log(data);
        setProfileImg(data.profileImg);
      } catch (err) {}
    }
    fetchUserInfo();
  }, []);

  //책장 조회
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBookshelf(userName);
        console.log(data);
        setBooks(data);
        // setBooks(booksData);
      } catch (err) {}
    }
    fetchBooks();
  }, []);

  return books ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile profileImg={profileImg} userName={userName} />
        <Wrapper $background={colors.theme4}>
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
        {/* <CalendarWrapper>
          <Calendar
            calendarType="hebrew"
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={({ date, view }) => {
              const book = books.find(
                (book) => book.date === moment(date).format("YYYY-MM-DD")
              );
              if (book) {
                return (
                  <BookCover
                    key={book.bookId}
                    bookId={book.bookId}
                    coverUrl={book.coverUrl}
                    title={book.title}
                  />
                );
              } else {
                return (
                  <div
                    style={{
                      width: "100%",
                      height: "0px",
                      paddingBottom: "100%",
                    }}
                  ></div>
                );
              }
            }}
          />
          </CalendarWrapper> */}
      </Container>
      {/* {showingFriends && (
        <Friends
          friends={userInfo.myFriends && userInfo.myFriends}
          toggleFriends={toggleFriends}
        />
      )} */}
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
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* ( 크롬, 사파리, 오페라, 엣지 ) 동작 */
  }
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
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

const CalendarWrapper = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  .react-calendar {
    width: 60%;
    border-radius: 20px;
    padding: 10px;
    /* background: rgba(255, 255, 255, 0.5); */
  }
  .react-calendar__navigation {
    margin: 0;
  }
  .react-calendar__navigation__label {
    font-size: 15px;
    font-weight: bold;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: none;
  }
  .react-calendar__month-view__weekdays {
    border-bottom: 1px solid lightgrey;
  }

  .react-calendar__month-view__weekdays__weekday {
    display: flex;
    justify-content: start;
    margin-left: 1px;
    color: black;
    abbr {
      text-decoration: none;
    }
    /* display: none; */
  }
  .react-calendar__month-view__days {
    margin-top: 10px;
  }
  .react-calendar__tile--now {
    background: none;
  }
  .react-calendar__tile {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 2px;
    abbr {
      position: absolute;
      width: 20px;
      height: 20px;
      padding-top: 3px;
      top: 0px;
      left: 6px;
      z-index: 1;
      background: white;
      border-radius: 0 0 3px 3px;
    }
  }
`;

export default Bookshelf;
