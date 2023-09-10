import React from "react";
import { styled } from "styled-components";
import FriendListItem from "./FriendListItem";

const FriendList = ({
  friends,
  onFollow,
  onUnfollow,
  showFriendList,
  setShowFriendList,
}) => {
  return (
    <Root>
      <Header>
        {showFriendList === 1 ? (
          <div>팔로워 리스트</div>
        ) : (
          <div>팔로잉 리스트</div>
        )}
        <CloseBtn onClick={() => setShowFriendList((prev) => 0)}>X</CloseBtn>
      </Header>
      {friends.map((friend) => (
        <FriendListItem
          userName={friend.userName}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          friendStatus={friend.friendStatus}
        />
      ))}
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  background: white;
  position: absolute;
  padding: 15px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default FriendList;
