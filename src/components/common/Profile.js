import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Profile = ({ userName, profileImg }) => {
  return (
    <Container>
      <NLink to={`/bookshelf/${userName}`}>
        <ProfileIcon src={profileImg} />
      </NLink>
      <NLink to={`/bookshelf/${userName}`}>
        <ProfileName>{userName}</ProfileName>
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
  color: white;
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
