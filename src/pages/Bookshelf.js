import React, { useState } from "react";
//import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BookCover from "../components/book_shelf/BookCover";
import Friends from "../components/book_shelf/Friends";
import { users } from "../data/UsersData";
import { FaUserFriends } from "react-icons/fa";
import { getBookshelf } from "./../api/books";
import { getUserInfo } from "./../api/users";
import { useEffect } from "react";
import { useContext } from "react";
import ColorContext from "../contexts/Color";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

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
  const [showingFriends, setShowingFriends] = useState(false);
  const [books, setBooks] = useState();

  const colors = useContext(ColorContext);

  const toggleFriends = () => {
    setShowingFriends((prev) => !prev);
  };

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
        // setBooks(data);
        setBooks(booksData);
      } catch (err) {}
    }
    fetchBooks();
  }, []);

  return books ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile>
          <ProfileIcon src={profileImg} />
          <ProfileName>{userName}</ProfileName>
          <ProfileInfo>
            <Follower>팔로워 225명</Follower>
            <Following>팔로잉 274명</Following>
            <FriendsButton onClick={toggleFriends}>
              <FaUserFriends size={30} color="white" />
              <FriendsText $color={colors.theme3}>친구목록</FriendsText>
            </FriendsButton>
          </ProfileInfo>
        </Profile>
        {/* <BookList>
          {books.map((book) => (
            <BookCover
              key={book.bookId}
              bookId={book.bookId}
              coverUrl={book.coverUrl}
              title={book.title}
            />
          ))}
        </BookList> */}
        <CalenderWrapper $background={colors.theme4}>
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
        </CalenderWrapper>
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

const Profile = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid grey;
  width: 100%;
  height: calc(100vh - 60px);
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  flex: none;
  font-size: 30px;
`;

const ProfileInfo = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;

const Follower = styled.div`
  width: 70px;
  text-align: center;
`;

const Following = styled.div`
  width: 70px;
  text-align: center;
`;

const FriendsButton = styled.button`
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 20%;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

const FriendsText = styled.div`
  font-size: 13px;
  /* color: ${(props) => props.$color}; */
  color: white;
`;

const BookList = styled.div`
  width: 90vw;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
`;

const CalenderWrapper = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  .react-calendar {
    width: 60%;
    /* border: 1px solid grey; */
    border-radius: 20px;
    padding: 10px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    /* display: flex;
    justify-content: start;
    margin-left: 1px;
    color: black;
    abbr {
      text-decoration: none;
    } */
    display: none;
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
