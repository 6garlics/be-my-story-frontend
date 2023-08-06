import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Profile = ({ userId, profileImage, nickname }) => {
  return (
    <Container>
      <NLink to={`/bookshelf/${userId}`}>
        <ProfileIcon src={profileImage} />
      </NLink>
      <NLink to={`/bookshelf/${userId}`}>
        <ProfileName>{nickname}</ProfileName>
      </NLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NLink = styled(NavLink)`
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  color: black;
`;

const ProfileIcon = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
  margin-bottom: 6px;
  font-size: 18px;
`;

export default Profile;
