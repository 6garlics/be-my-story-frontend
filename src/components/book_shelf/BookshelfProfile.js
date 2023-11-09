import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { follow, getFollower, getFollowing, unfollow } from "../../api/users";
import FriendList from "./FriendList";
import ColorContext from "../../contexts/Color";
import { userSlice } from "../../redux/userSlice";

const BookshelfProfile = ({ userName, profileImg, friendStatus, bookCnt }) => {
  //0: 리스트 숨기기, 1: 팔로워 리스트, 2: 팔로잉 리스트
  const [showFriendList, setShowFriendList] = useState(0);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const myName = useSelector((state) => state.user.userName);
  const refresh = useSelector((state) => state.user.refresh);
  const colors = useContext(ColorContext);

  const dispatch = useDispatch();

  //팔로잉, 팔로워 리스트 조회
  useEffect(() => {
    async function fetchFriends() {
      //팔로잉 리스트 조회
      const followingData = await getFollowing(userName);
      setFollowing(followingData);
      //팔로워 리스트 조회
      const followerData = await getFollower(userName);
      setFollower(followerData);
    }
    fetchFriends();
  }, [refresh, userName]);

  //재렌더링
  const onRefresh = () => {
    dispatch(userSlice.actions.setRefresh());
  };

  //팔로우 하기
  const onFollow = async (userName) => {
    await follow(userName);
    onRefresh();
  };

  //언팔 하기
  const onUnfollow = async (userName) => {
    await unfollow(userName);
    onRefresh();
  };

  return (
    <Root $showFriendList={showFriendList !== 0}>
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
          <div>{bookCnt}</div>
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
      {myName &&
        userName !== myName &&
        (friendStatus === "following" ? (
          <FollowButton
            $background="white"
            $color="black"
            onClick={() => onUnfollow(userName)}
          >
            친구끊기
          </FollowButton>
        ) : (
          <FollowButton
            $background={colors.theme3}
            $color="white"
            onClick={() => onFollow(userName)}
          >
            친구맺기
          </FollowButton>
        ))}
      {/*{showFriendList !== 0 && (*/}
      <FriendListWrapper $showFriendList={showFriendList !== 0}>
        <FriendList
          friends={showFriendList === 1 ? follower : following}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
          showFriendList={showFriendList}
          setShowFriendList={setShowFriendList}
        />
      </FriendListWrapper>
      {/*})}*/}
    </Root>
  );
};

const Root = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: ${({ $showFriendList }) =>
    $showFriendList
      ? "1px solid rgba(255,255,255, 0)"
      : "1px solid rgba(255,255,255, 0.2)"};
  transition: all 0.3s;
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
  width: 14px;
  margin-left: 10px;
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
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const FriendListWrapper = styled.div`
  width: 100%;
  height: ${({ $showFriendList }) => ($showFriendList ? "100%" : "0px")};
  bottom: 0;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: absolute;
`;

export default BookshelfProfile;
