import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/users";

const Profile = ({ userName }) => {
  const [profileImg, setProfileImg] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getUserInfo(userName);
        setProfileImg(data.profileImg);
      } catch (e) {}
    }
    fetchUserInfo();
  }, [userName]);

  return (
    <Container>
      <Wrapper onClick={() => navigate(`/bookshelf/${userName}`)}>
        <ProfileIcon src={profileImg} />
      </Wrapper>
      <Wrapper onClick={() => navigate(`/bookshelf/${userName}`)}>
        <ProfileName>{userName}</ProfileName>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ProfileIcon = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;

const ProfileName = styled.div`
  margin-left: 10px;
  margin-bottom: 2px;
  font-size: 22px;
`;

export default Profile;
