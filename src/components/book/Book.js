import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../common/Profile";
import Cover from "./Cover";
import DiaryModal from "./DiaryModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import CommentList from "./CommentList";
import { deleteBook, getDiary } from "../../api/books";
import { bookSlice } from "../../redux/bookSlice";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import chat from "../../assets/chat.svg";
import edit from "../../assets/edit.svg";
import trash from "../../assets/trash.svg";
import diaryIcon from "../../assets/diary.svg";
import ArrowButton from "../common/ArrowButton";
import letter from "../../assets/letter.svg";
import MailForm from "./LetterForm";

function Book({
  userName,
  bookId,
  title,
  titlePos,
  coverUrl,
  musicUrl,
  pages,
}) {
  const [isModal, setIsModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [pageNum, setPageNum] = useState(0); //현재 열람하고 있는 페이지 번호 (0번째는 표지)
  const [diary, setDiary] = useState();
  const [showMailForm, setShowMailForm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myName = useSelector((state) => state.user.userName);

  const audioRef = useRef();

  // 음악 재생
  const onPlayMusic = () => {
    // audioRef.src =
    //   "https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/5956e444-881d-11ee-a705-7b2ff80a7a30.wav";
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      // audioRef.current.currentTime = 0;
    }
    setIsPlaying((prev) => !prev);
  };

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
    dispatch(bookSlice.actions.setPrevLength(pages.length)); //기존 길이 저장
    dispatch(bookSlice.actions.setLength(pages.length));
    dispatch(bookSlice.actions.addPage()); //뒷이야기 생성할 빈페이지 추가
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
    if (pageNum === 1) setPageNum((prev) => prev - 1); //내용에서 표지로
    else if (pageNum >= 3) setPageNum((prev) => prev - 2);
  };
  const onRightClick = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1); //표지에서 내용으로
    else if (pageNum <= pages.length - 2) setPageNum((prev) => prev + 2);
  };

  return (
    <Root>
      {isModal && <DiaryModal diary={diary} setIsModal={setIsModal} />}
      {/* 편지쓰기 */}
      <MailForm
        bookId={bookId}
        userName={userName}
        showMailForm={showMailForm}
        setShowMailForm={setShowMailForm}
      />
      <CloseBtn onClick={() => navigate(-1)}>
        <IoIosArrowBack size={30} color="white" />
      </CloseBtn>
      <Wrapper>
        {/* 왼쪽 버튼 */}
        <ArrowButtonWrapper>
          <ArrowButton onClick={onLeftClick} side="left" hide={pageNum === 0} />
        </ArrowButtonWrapper>
        <Container $pageNum={pageNum}>
          {/* 헤더 */}
          <Header>
            <Profile userName={userName} />
            <Buttons>
              {/* 친구 동화책에만 보이는 버튼 */}
              {myName && myName !== userName && (
                // 편지 쓰기 버튼
                <Button>
                  <Icon
                    src={letter}
                    onClick={() => setShowMailForm((prev) => !prev)}
                  />
                </Button>
              )}
              {/* 음악 재생 버튼 */}
              <Button onClick={onPlayMusic}>
                <Icon src={isPlaying ? pause : play} />
              </Button>
              <audio
                ref={audioRef}
                loop
                preload
                src="https://bemystory-s3-data.s3.ap-northeast-2.amazonaws.com/5956e444-881d-11ee-a705-7b2ff80a7a30.wav"
              ></audio>
              {/* 댓글 보기 버튼 */}
              <Button onClick={() => setShowComments((prev) => !prev)}>
                <Icon src={chat} />
              </Button>
              {/* 내 동화책에만 보이는 버튼 */}
              {myName && myName === userName && (
                <>
                  {/* 일기 보기 버튼 */}
                  <Button onClick={() => setIsModal((prev) => !prev)}>
                    <Icon src={diaryIcon} />
                  </Button>
                  {/* 동화 수정 버튼 */}
                  <Button onClick={onEdit}>
                    <Icon src={edit} />
                  </Button>
                  {/* 동화 삭제 버튼 */}
                  <Button onClick={onDelete}>
                    <Icon src={trash} />
                  </Button>
                </>
              )}
            </Buttons>
          </Header>
          <Main>
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
              <>
                {pages.map(
                  (page, index) =>
                    index % 2 === 0 && (
                      <PageWrapper>
                        <Page
                          page={pages[index]}
                          index={index + 1}
                          show={index + 1 === pageNum}
                        />
                        <Page
                          page={pages[index + 1]}
                          index={index + 2}
                          show={index + 1 === pageNum}
                        />
                      </PageWrapper>
                    )
                )}
              </>
            )}
          </Main>
        </Container>
        {/* 오른쪽 버튼 */}
        <ArrowButtonWrapper>
          <ArrowButton
            onClick={onRightClick}
            side="right"
            hide={pageNum !== 0 && pageNum >= pages.length - 1}
          />
        </ArrowButtonWrapper>
      </Wrapper>
      {/* 댓글창 */}
      <CommentListWrapper $showComments={showComments}>
        <CommentList bookId={bookId} setShowComments={setShowComments} />
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
`;

const Container = styled.div`
  width: ${(props) => (props.$pageNum === 0 ? "35%" : "70%")};
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;

const Header = styled.div`
  height: 50px;
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

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const CommentListWrapper = styled.div`
  flex: none;
  width: ${(props) => (props.$showComments ? "300px" : "0px")};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  height: 100%;
  margin-left: auto;
`;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const ArrowButtonWrapper = styled.div`
  margin-top: 60px;
`;

export default Book;
