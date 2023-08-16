import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "../common/Page";
import Profile from "../common/Profile";
import Cover from "./Cover";
import DiaryModal from "./DiaryModal";
import { IoIosMore } from "react-icons/io";
import { TbNotebook, TbNotes } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../api/users";
import { getMyInfo } from "./../../api/users";

function Book({
  userName = "임시 사용자명",
  title = "자전거 모험",
  texts = ["첫번째", "두번째", "세번째"],
  coverUrl,
  images,
}) {
  const [isModal, setIsModal] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [profileImg, setProfileImg] = useState();
  // const [refresh, setRefresh] = useState(0);

  //팔레트
  // useEffect(() => {
  //   main();
  // }, []);

  //유저 정보 조회
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await getUserInfo(userName);
        setProfileImg(userData.profileImg);
      } catch (err) {}
    }
    fetchUserInfo();
  }, []);

  const onLeftClick = () => {
    if (pageNum > 0) {
      setPageNum((prev) => prev - 1);
    }
  };
  const onRightClick = () => {
    if (pageNum < texts.length) {
      setPageNum((prev) => prev + 1);
    }
  };

  return (
    <Root>
      {/* <img id="img" src="/images/dummy1.png" />
      <canvas id="canvas"></canvas>
      <div id="palette"></div>
      <hr />
      <div id="complementary"></div> */}
      {isModal && <DiaryModal isModal={isModal} setIsModal={setIsModal} />}
      <Container $pageNum={pageNum}>
        <Header>
          <Profile userName={userName} profileImg={profileImg} />
          <Button onClick={() => setIsModal((prev) => !prev)}>
            <IoIosMore size={25} color="white" />
          </Button>
        </Header>
        <Wrapper>
          {pageNum === 0 ? (
            <Cover
              coverUrl={coverUrl && coverUrl}
              title={title}
              onclick={onRightClick}
              side="right"
              buttonLeft="auto"
              buttonRight="0px"
            />
          ) : (
            <Page
              imgUrl={images.length !== 0 && images[pageNum - 1].imgUrl}
              text={texts[pageNum - 1]}
              pageNum={pageNum}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          )}
        </Wrapper>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: ${(props) => (props.$pageNum === 0 ? "50%" : "100%")};
  padding: 50px 0;
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
`;

const Header = styled.div`
  margin: 10px 0px;
  margin-top: 15px;
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
`;

export default Book;
