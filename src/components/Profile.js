import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Profile = ({ userId, profileImage, nickname }) => {
  return (
    <Container>
      <NLink to={`/bookshelf/${userId}`}>
        <ProfileIcon src={profileImage} />
      </NLink>
      <NLink>
        <ProfileName>{nickname}</ProfileName>
      </NLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  //padding: 10px;
`;

const NLink = styled(NavLink)`
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  color: black;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
`;

export default Profile;
