import React from "react";
import { styled } from "styled-components";
import FriendListItem from "./FriendListItem";
import { IoClose } from "react-icons/io5";

const FriendList = ({
  friends,
  onFollow,
  onUnfollow,
  showFriendList,
  setShowFriendList,
}) => {
  return (
    <Root $show={showFriendList !== 0}>
      <Header>
        {showFriendList === 1 ? (
          <div>팔로워 리스트</div>
        ) : (
          <div>팔로잉 리스트</div>
        )}
        <CloseBtn onClick={() => setShowFriendList((prev) => 0)}>
          <IoClose size={22} />
        </CloseBtn>
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
  height: 100%;
  color: black;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  box-sizing: border-box;
  border-radius: 0.7vw;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 20px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  margin-top: -2px;
  margin-right: -6px;
  &:hover {
    cursor: pointer;
  }
`;

export default FriendList;
