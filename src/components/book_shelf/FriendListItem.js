import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import ColorContext from "../../contexts/Color";
import Profile from "../common/Profile";

const FriendListItem = ({ userName, onFollow, onUnfollow, friendStatus }) => {
  const colors = useContext(ColorContext);

  return (
    <Root>
      <Profile userName={userName} />
      {friendStatus !== "self" &&
        (friendStatus === "none" ? (
          <FollowBtn
            onClick={() => onFollow(userName)}
            $background={colors.theme2}
          >
            팔로우
          </FollowBtn>
        ) : (
          <FollowBtn onClick={() => onUnfollow(userName)} $background="#aaaaaa">
            언팔로우
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
  padding: 3px 7px;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  font-family: inherit;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

export default FriendListItem;
