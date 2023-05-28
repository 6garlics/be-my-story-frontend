import React from "react";
import styled from "styled-components";
import Profile from "../Profile";

const buttonValues = ["친구 끊기", "요청 취소", "친구 수락"];

const Friends = ({ friends, toggleFriends }) => {
  return (
    <Container>
      <CloseButton onClick={toggleFriends}>X</CloseButton>
      {friends.map((friend, index) => (
        <Friend key={index}>
          <Profile
            userId={friend.userId}
            profileImage={friend.profileImage}
            nickname={friend.nickname}
          />
          <Button>{buttonValues[friend.friendStatus]}</Button>
        </Friend>
      ))}
    </Container>
  );
};

// friendStatus에 따른 정렬 필요.
//목록이 길어질 시 독립적으로 스크롤 가능해야 함.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-left: 1px solid grey;
`;

const CloseButton = styled.button`
  margin-left: auto;
`;

const Friend = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  margin-left: auto;
`;

export default Friends;
