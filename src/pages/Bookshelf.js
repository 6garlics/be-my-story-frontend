import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCover from "../components/my_book_shelf/BookCover";
import Friends from "../components/my_book_shelf/Friends";
import { users } from "../data/Users";

//friendStatus: 서로친구(0), 내가 친구요청(1), 나에게 친구요청(2)

const Bookshelf = () => {
  const { id } = useParams();
  console.log("id : ", id);
  const [showingFriends, setShowingFriends] = useState(false);
  //const [user, setUser] = useState();
  const user = users[id];

  const toggleFriends = () => {
    setShowingFriends((prev) => !prev);
  };

  // const getUser = async () => {
  //   const response = await axios(
  //     `https://1d805cb7-0534-49b3-93af-7b95cf7604c4.mock.pstmn.io/users/${id}`
  //   );
  //   setUser(response.data);
  //   console.log("Bookshelf: ", response.data);
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  return user ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile>
          <ProfileIcon src={user.profileImage} />
          <ProfileName>{user.nickname}</ProfileName>
          <FriendsButton onClick={toggleFriends}>친구목록</FriendsButton>
        </Profile>
        <BookList>
          {user.myBooks.map((book) => (
            <BookCover
              key={book.id}
              coverImage={book.pages[0].image}
              title={book.title}
              book={book}
            />
          ))}
        </BookList>
      </Container>
      {showingFriends && (
        <Friends friends={user.myFriends} toggleFriends={toggleFriends} />
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
  width: 50px;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;

export default Bookshelf;
