import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { follow, getFollower, getFollowing, getMyInfo } from "../../api/users";
import { checkFriend } from "./../../api/users";

const Profile = ({ profileImg, userName }) => {
  const [showFriendList, setShowFriendList] = useState(0);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    async function fetchFriends() {
      //팔로잉 조회
      const followingData = await getFollowing();
      setFollowing(followingData);
      //팔로워 조회
      const followerData = await getFollower();
      setFollower(followerData);
      //친구 여부 조회
      // const isFriendData = await checkFriend();
      // setIsFriend(isFriendData);
      //내정보 조회
      const myData = await getMyInfo();
      setMyName(myData.userName);
    }
    fetchFriends();
  }, []);

  //팔로우 하기
  const onFollow = async () => {
    await follow(userName);
  };

  //언팔 하기
  const onUnfollow = async () => {
    // await unfollow(userName);
  };

  return (
    <Root>
      <ProfileIcon src={profileImg} />
      <ProfileNameWrapper>
        <ProfileName>{userName}</ProfileName>
        {userName === myName && (
          <Settings>
            <Img src="/icons/settings.png" />
          </Settings>
        )}
      </ProfileNameWrapper>
      <ProfileInfo>
        <Books>
          <div>동화책</div>
          <div>42</div>
        </Books>
        <Follower onClick={() => setShowFriendList((prev) => 1)}>
          <div>팔로워</div>
          <div>{follower.length}</div>
        </Follower>
        <Following onClick={() => setShowFriendList((prev) => 2)}>
          <div>팔로잉</div>
          <div>{following.length}</div>
        </Following>
      </ProfileInfo>
      {userName !== myName &&
        (isFriend ? (
          <FollowButton onClick={onUnfollow}>친구끊기</FollowButton>
        ) : (
          <FollowButton onClick={onFollow}>친구맺기</FollowButton>
        ))}
      {showFriendList === 1 && (
        <FollowerList>
          <div>팔로워 리스트</div>
          {follower.map((f) => (
            <div>{f.userName}</div>
          ))}
          <CloseBtn onClick={() => setShowFriendList((prev) => 0)}>X</CloseBtn>
        </FollowerList>
      )}
      {showFriendList === 2 && (
        <FollowingList>
          <div>팔로잉 리스트</div>
          {following.map((f) => (
            <div>{f.userName}</div>
          ))}
          <CloseBtn onClick={() => setShowFriendList((prev) => 0)}>X</CloseBtn>
        </FollowingList>
      )}
    </Root>
  );
};

const Root = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid grey;
  width: 350px;
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
  text-align: center;
`;

const Follower = styled.div`
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const Following = styled.div`
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
