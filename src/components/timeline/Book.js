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
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CommentList from "../common/CommentList";
import { BsChat } from "react-icons/bs";
import { deleteBook, getDiary } from "../../api/books";

function Book({
  bookId,
  userName = "임시 사용자명",
  title = "자전거 모험",
  texts = ["첫번째", "두번째", "세번째"],
  coverUrl,
  images,
}) {
  const [myName, setMyName] = useState();
  const [isModal, setIsModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [profileImg, setProfileImg] = useState();
  const [diary, setDiary] = useState();
  // const [refresh, setRefresh] = useState(0);

  const navigate = useNavigate();

  console.log(images);

  //팔레트
  // useEffect(() => {
  //   main();
  // }, []);

  //일기 조회
  useEffect(() => {
    async function fetchDiary() {
      const data = await getDiary(bookId);
      setDiary(data);
    }
    // fetchDiary();
  }, []);

  //내 정보 조회
  useEffect(() => {
    async function fetchMyInfo() {
      try {
        const myData = await getMyInfo();
        setMyName(myData.userName);
      } catch (err) {}
    }
    fetchMyInfo();
  }, []);

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

  //동화 삭제
  const onDelete = async () => {
    try {
      if (window.confirm("동화를 삭제하시겠습니까?")) {
        await deleteBook(bookId);
        navigate(-1);
      }
    } catch (e) {}
  };

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
      {isModal && <DiaryModal diary={diary} setIsModal={setIsModal} />}
      <CloseBtn onClick={() => navigate(-1)}>
        <IoIosArrowBack size={30} color="white" />
      </CloseBtn>
      <Wrapper>
        <Container $pageNum={pageNum}>
          <Header>
            <Profile userName={userName} profileImg={profileImg} />
            <Buttons>
              <Button onClick={() => setShowComments((prev) => !prev)}>
                <BsChat size={25} color="white" />
              </Button>
              {myName && myName === userName && (
                <Button onClick={onDelete}>
                  <DeleteBtn src="/icons/delete.png" />
                </Button>
              )}
              <Button onClick={() => setIsModal((prev) => !prev)}>
                <IoIosMore size={27} color="white" />
              </Button>
            </Buttons>
          </Header>
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
              imgUrl={images.length !== 0 && images[pageNum - 1]}
              text={texts[pageNum - 1]}
              pageNum={pageNum}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          )}
        </Container>
      </Wrapper>
      <CommentListWrapper $showComments={showComments}>
        {showComments && <CommentList setShowComments={setShowComments} />}
      </CommentListWrapper>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 70px;
  left: 5px;
  padding: 7px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: ${(props) => (props.$pageNum === 0 ? "35%" : "70%")};
  display: flex;
  flex-direction: column;
  /* transform: translate(0, -35px); */
  transition: all 0.5s ease-in-out;
`;

const Header = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const Buttons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 12px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteBtn = styled.img`
  width: 25px;
`;

const CommentListWrapper = styled.div`
  width: ${(props) => (props.$showComments ? "30%" : "0px")};
  transition: all 0.2s ease-in-out;
  height: 100%;
  margin-left: auto;
  background: white;
`;

export default Book;
