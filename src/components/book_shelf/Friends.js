import React from "react";
import styled from "styled-components";
import Profile from "../Profile";
import { GoThreeBars } from "react-icons/go";

//const buttonValues = ["친구 끊기", "요청 취소", "친구 수락"];

const Friends = ({ friends, toggleFriends }) => {
  return (
    <Container>
      <CloseButton onClick={toggleFriends}>
        <GoThreeBars size={30} />
      </CloseButton>
      {friends.map((friend, index) => (
        <Friend key={index}>
          <Profile
            userId={friend.userId}
            profileImage={friend.profileImage}
            nickname={friend.nickname}
          />
          <Button>친구 해제</Button>
        </Friend>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-left: 1px solid grey;
`;

const CloseButton = styled.button`
  margin: 6px auto 15px -2px;
  background: none;
  border: none;
  border-radius: 100px;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Friend = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  margin-left: auto;
  border: none;
  border-radius: 100px;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default Friends;
