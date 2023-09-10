import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import ColorContext from "../../contexts/Color";
import Profile from "../common/Profile";
import { getMyInfo } from "./../../api/users";

const FriendListItem = ({ userName, onFollow, onUnfollow, friendStatus }) => {
  const [myName, setMyName] = useState();
  const colors = useContext(ColorContext);

  useEffect(() => {
    async function fetchMyName() {
      try {
        const data = await getMyInfo();
        setMyName(data.userName);
      } catch (e) {}
    }
    fetchMyName();
  }, []);

  return (
    <Root>
      <Profile userName={userName} />
      {friendStatus !== "self" &&
        (friendStatus === "none" ? (
          <FollowBtn
            onClick={() => onFollow(userName)}
            $background={colors.theme2}
          >
            친구맺기
          </FollowBtn>
        ) : (
          <FollowBtn onClick={() => onUnfollow(userName)} $background="#aaaaaa">
            친구끊기
          </FollowBtn>
        ))}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FollowBtn = styled.button`
  background: ${(props) => props.$background};
  width: 70px;
  padding: 3px 7px;
  border: none;
  border-radius: 7px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export default FriendListItem;
