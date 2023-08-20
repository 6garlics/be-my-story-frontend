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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../components/book_shelf/carousel";

const Bookshelf = () => {
  const { userName } = useParams();
  const [userInfo, setUserInfo] = useState();
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
        setUserInfo(data);
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
      } catch (err) {}
    }
    fetchBooks();
  }, []);

  return books ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile>
          <ProfileIcon src={userInfo.profileImage} />
          <ProfileName>{userInfo.userName}</ProfileName>
          <FriendsButton onClick={toggleFriends}>
            <FaUserFriends size={30} color="white" />
            <FriendsText $color={colors.theme3}>친구목록</FriendsText>
          </FriendsButton>
        </Profile>
        <BookList>
          <Slider {...settings}>
            {books.map((book) => (
              <BookCover
                key={book.bookId}
                bookId={book.bookId}
                coverUrl={book.coverUrl}
                title={book.title}
              />
            ))}
          </Slider>
        </BookList>
      </Container>
      {showingFriends && (
        <Friends
          friends={userInfo.myFriends && userInfo.myFriends}
          toggleFriends={toggleFriends}
        />
      )}
    </div>
  ) : (
    <div>loading</div>
  );
};

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 364px;
  height: 278px;
  .slick-dots {
    .slick-active {
      button::before {
        color: white;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
  .slick-cloned {
    display: none !important;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  padding: 60px;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  flex: none;
  font-size: 30px;
  margin-left: 20px;
`;

const FriendsButton = styled.button`
  margin-left: auto;
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
`;

export default Bookshelf;
