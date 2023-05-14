import React from "react";
import styled from "styled-components";

const buttonValues = ["친구 끊기", "요청 취소", "친구 수락"];

const Friends = ({ friends }) => {
  return (
    <Container>
      {friends.map((friend, index) => (
        <Friend key={index}>
          <ProfileIcon src={friend.profileImage} />
          <ProfileName>{friend.userId}</ProfileName>
          <Button>{buttonValues[friend.friendStatus]}</Button>
        </Friend>
      ))}
    </Container>
  );
};

// friendStatus에 따른 정렬 필요.
//목록이 길어질 시 독립적으로 스크롤 가능해야 함.

const Container = styled.div`
  width: 300px;
  border-left: 1px solid grey;
`;
const Friend = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;
const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
  margin-left: auto;
`;

export default Friends;
