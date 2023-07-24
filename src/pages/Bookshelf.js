import React, { useState } from "react";
//import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BookCover from "../components/book_shelf/BookCover";
import Friends from "../components/book_shelf/Friends";
import { users } from "../data/UsersData";
import { FaUserFriends } from "react-icons/fa";
import { getBookshelf } from "./../api/users";

const Bookshelf = () => {
  const { id } = useParams();
  console.log("id : ", id);
  const [showingFriends, setShowingFriends] = useState(false);
  //const [user, setUser] = useState();
  const user = users[id];

  const toggleFriends = () => {
    setShowingFriends((prev) => !prev);
  };

  // Postman Mock Server 사용시 aixos 호출
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
  useEffect(async () => {
    const data = await getBookshelf(1);
    console.log(data);
  }, []);

  return user ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile>
          <ProfileIcon src={user.profileImage} />
          <ProfileName>{user.nickname}</ProfileName>
          <FriendsButton onClick={toggleFriends}>
            <FaUserFriends size={30} />
            <FriendsText>친구목록</FriendsText>
          </FriendsButton>
        </Profile>
        <BookList>
          {user.myBooks.map((book) => (
            <BookCover
              key={book.id}
              coverImage={book.pages[0].img_url}
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
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;

export default Bookshelf;
