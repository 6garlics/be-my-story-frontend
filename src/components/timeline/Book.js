import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "../common/Page";
import Profile from "../common/Profile";
import Cover from "./Cover";
import DiaryModal from "./DiaryModal";
import { IoIosMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CommentList from "../common/CommentList";
import { BsChat } from "react-icons/bs";
import { deleteBook, getDiary } from "../../api/books";
import pencil from "../../assets/pencil.svg";
import { bookSlice } from "../../redux/bookSlice";

function Book({ userName, bookId, title, titlePos, coverUrl, pages }) {
  const [isModal, setIsModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [pageNum, setPageNum] = useState(0); //현재 열람하고 있는 페이지 번호 (0번째는 표지)
  const [diary, setDiary] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myName = useSelector((state) => state.user.userName);

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
    //본인 동화인 경우에만 일기 조회
    if (myName === userName) {
      fetchDiary();
    }
  }, [bookId, myName, userName]);

  //동화 수정
  const onEdit = () => {
    // 열람 중인 동화책 데이터를 redux에 담기
    dispatch(bookSlice.actions.setBookId(bookId));
    dispatch(bookSlice.actions.setTitle(title));
    dispatch(bookSlice.actions.setTitleX(titlePos.x));
    dispatch(bookSlice.actions.setTitleY(titlePos.y));
    dispatch(bookSlice.actions.setCover(coverUrl));
    dispatch(bookSlice.actions.setPages(pages));
    dispatch(bookSlice.actions.setLength(pages.length));
    dispatch(bookSlice.actions.setSaved(true));
    navigate("/book-edit");
  };

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
    if (pageNum <= 1) setPageNum((prev) => prev - 1); //내용에서 표지로
    else setPageNum((prev) => prev - 2);
  };
  const onRightClick = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1); //표지에서 내용으로
    else if (pageNum <= pages.length - 2) setPageNum((prev) => prev + 2);
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
          {/* 헤더 */}
          <Header>
            <Profile userName={userName} />
            <Buttons>
              {/* 댓글 보기 버튼 */}
              <Button onClick={() => setShowComments((prev) => !prev)}>
                <BsChat size={25} color="white" />
              </Button>
              {/* 본인 동화책에만 보이는 버튼들 */}
              {myName && myName === userName && (
                <>
                  {/* 동화 수정 버튼 */}
                  <Button onClick={onEdit}>
                    <DeleteBtn src={pencil} />
                  </Button>
                  {/* 동화 삭제 버튼 */}
                  <Button onClick={onDelete}>
                    <DeleteBtn src="/icons/delete.png" />
                  </Button>
                  {/* 일기 보기 버튼 */}
                  <Button onClick={() => setIsModal((prev) => !prev)}>
                    <IoIosMore size={27} color="white" />
                  </Button>
                </>
              )}
            </Buttons>
          </Header>
          {pageNum === 0 ? (
            // 표지
            <Cover
              title={title}
              titlePos={titlePos}
              coverUrl={coverUrl && coverUrl}
              onclick={onRightClick}
            />
          ) : (
            // 내용
            <PageWrapper>
              {/* 왼쪽 버튼 */}
              <PageButton onClick={onLeftClick} $side="left" />
              {/* 왼쪽 페이지 */}
              <Page page={pages[pageNum - 1]} pageNum={pageNum} />
              {/* 오른쪽 페이지 */}
              <Page page={pages[pageNum]} pageNum={pageNum + 1} />
              {/* 오른쪽 버튼 */}
              <PageButton onClick={onRightClick} $side="right" />
            </PageWrapper>
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
  //transition: all 0.5s ease-in-out;
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

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 0px;
  padding-bottom: 50%;
  /* border: 10px solid #78b9ff; */
  /* border-radius: 2vw; */
  position: relative;
`;

const PageButton = styled.button`
  position: absolute;
  z-index: 2;
  width: 25%;
  height: 0px;
  padding-bottom: 50%;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
  ${(props) => (props.$side === "left" ? "left: 0px" : "right: 0px")}
`;

export default Book;
