import React from "react";
import { useState } from "react";
import { styled } from "styled-components";

const Profile = ({ profileImg, userName }) => {
  const [isFriendList, setIsFriendList] = useState(0);

  console.log(isFriendList);

  return (
    <Root>
      <ProfileIcon src={profileImg} />
      <ProfileNameWrapper>
        <ProfileName>{userName}</ProfileName>
        <Settings>
          <Img src="/icons/settings.png" />
        </Settings>
      </ProfileNameWrapper>
      <ProfileInfo>
        <Books>
          동화책
          <br />
          237
        </Books>
        <Follower onClick={() => setIsFriendList((prev) => 1)}>
          팔로워
          <br />
          225
        </Follower>
        <Following onClick={() => setIsFriendList((prev) => 2)}>
          팔로잉
          <br />
          274
        </Following>
        {/* <FriendsButton onClick={toggleFriends}>
      <FaUserFriends size={30} color="white" />
      <FriendsText $color={colors.theme3}>친구목록</FriendsText>
    </FriendsButton> */}
      </ProfileInfo>
      <FollowButton>친구맺기</FollowButton>
      {isFriendList === 1 && (
        <FollowerList>
          팔로워 리스트
          <CloseBtn onClick={() => setIsFriendList((prev) => 0)}>X</CloseBtn>
        </FollowerList>
      )}
      {isFriendList === 2 && (
        <FollowingList>
          팔로잉 리스트
          <CloseBtn onClick={() => setIsFriendList((prev) => 0)}>X</CloseBtn>
        </FollowingList>
      )}
    </Root>
  );
};

const Root = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid grey;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
`;

const ProfileIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.div`
  flex: none;
  font-size: 30px;
`;

const Settings = styled.div`
  width: 16px;
  margin-left: 10px;
  margin-top: 7px;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100%;
  display: block;
`;

const ProfileInfo = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Books = styled.div`
  /* width: 60px; */
  text-align: center;
`;

const Follower = styled.div`
  /* width: 60px; */
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Following = styled.div`
  /* width: 60px; */
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const FollowButton = styled.button`
  width: 70%;
  height: 30px;
  border-radius: 10px;
  border: none;
  background: white;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const FollowerList = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  background: white;
  position: absolute;
`;

const FollowingList = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  background: white;
  position: absolute;
`;

const CloseBtn = styled.button``;

export default Profile;
