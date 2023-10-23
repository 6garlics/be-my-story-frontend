import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "../common/Profile";
import Cover from "./Cover";
import DiaryModal from "./DiaryModal";
import { IoIosMore } from "react-icons/io";
import { getUserInfo } from "../../api/users";
import { useNavigate } from "react-router-dom";

function BookCover({ bookId, userName, title, coverUrl }) {
  const [isModal, setIsModal] = useState(false);
  const [profileImg, setProfileImg] = useState();

  const navigate = useNavigate();

  //유저 정보 조회
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await getUserInfo(userName);
        setProfileImg(userData.profileImg);
      } catch (err) {}
    }
    fetchUserInfo();
  }, [userName]);

  return (
    <Container className="book-cover">
      {isModal && <DiaryModal isModal={isModal} setIsModal={setIsModal} />}
      <Header className="header">
        <Profile userName={userName} profileImg={profileImg} />
        {/* <Button onClick={() => setIsModal((prev) => !prev)}>
          <IoIosMore size={25} color="white" />
        </Button> */}
      </Header>
      <Wrapper>
        <Cover
          coverUrl={coverUrl && coverUrl}
          title={title}
          onclick={() => navigate(`/book/${bookId}/detail`)}
        />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  /* width: ${(props) => (props.$pageNum === 0 ? "100%" : "200%")}; */
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-left: auto;
  margin-top: 12px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 3% 3% 3% 3%;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3);
`;

export default BookCover;
