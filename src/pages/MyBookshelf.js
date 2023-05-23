import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCover from "../components/my_book_shelf/BookCover";
import Friends from "../components/my_book_shelf/Friends";

//friendStatus: 서로친구(0), 내가 친구요청(1), 나에게 친구요청(2)

const userId = 1;

const MyBookshelf = () => {
  //const { userId } = useParams();
  console.log("userId : ", userId);
  const [showing, setShowing] = useState(false);
  const [myInfo, setMyInfo] = useState();

  const toggleFriends = () => {
    setShowing((prev) => !prev);
  };

  const getMyInfo = async () => {
    const response = await axios(
      `https://8d2f9c4b-049f-4bd4-81c4-e22ed6603982.mock.pstmn.io/user/${userId}`
    );
    setMyInfo(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getMyInfo();
  }, []);
  return myInfo ? (
    <div style={{ display: "flex" }}>
      <Container>
        <Profile>
          <ProfileIcon src={myInfo.profileImage} />
          <ProfileName>{myInfo.nickname}</ProfileName>
          <FriendsButton onClick={toggleFriends}>친구목록</FriendsButton>
        </Profile>
        <Bookshelf>
          {myInfo.myBooks.map((book) => (
            <BookCover
              key={book.id}
              coverImage={book.pages[0].image}
              title={book.title}
            />
          ))}
        </Bookshelf>
      </Container>
      {showing && (
        <Friends friends={myInfo.myFriends} toggleFriends={toggleFriends} />
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

const Bookshelf = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;

export default MyBookshelf;
