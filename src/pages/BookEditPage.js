import React, { useState } from "react";
import PageEdit from "../components/book_edit/PageEdit";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { editBook } from "../api/books";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ColorContext from "../contexts/Color";
import ArrowButton from "../components/common/ArrowButton";

const BookEditPage = () => {
  //Redux의 상태 꺼내오기
  const bookId = useSelector((state) => state.book.bookId);
  const title = useSelector((state) => state.book.title);
  const titleX = useSelector((state) => state.book.titleX);
  const titleY = useSelector((state) => state.book.titleY);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const pages = useSelector((state) => state.book.pages);
  const length = useSelector((state) => state.book.length);
  const saved = useSelector((state) => state.book.saved);

  const colors = useContext(ColorContext);

  //현재 열람하고 있는 페이지 번호 (0번째는 표지)
  const [pageNum, setPageNum] = useState(0);

  //각 텍스트의 위치 좌표 (0번째는 제목)
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const navigate = useNavigate();

  //동화책 수정 api 요청
  const handleEditBook = async () => {
    const body = {
      title: title,
      titleX: positions[0].x,
      titleY: positions[0].y,
      coverUrl: coverUrl,
      pages: pages
        .map((page, index) => ({
          ...page,
          x: positions[index + 1].x,
          y: positions[index + 1].y,
        }))
        .slice(0, length),
    };
    console.log("동화책 1개 수정 api 요청 바디", body);
    await editBook(bookId, body);
    navigate(`/book/${bookId}/detail`);
  };

  const onLeftClick = () => {
    if (pageNum === 1) setPageNum((prev) => prev - 1); //내용에서 표지로
    else if (pageNum > 1) setPageNum((prev) => prev - 2);
  };
  const onRightClick = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1); //표지에서 내용으로
    else if (pageNum <= length - 2) setPageNum((prev) => prev + 2);
  };

  return (
    <RootContainer>
      <Container>
        {/* 왼쪽 버튼 */}
        <ArrowButton onClick={onLeftClick} side="left" />
        <Wrapper $smallWidth={pageNum === 0 || pageNum === length}>
          {/* 표지 */}
          <PageEdit
            positions={positions}
            setPositions={setPositions}
            page={{ text: title, imgUrl: coverUrl, x: titleX, y: titleY }}
            index={0}
            show={pageNum === 0}
          />
          {/* 내용 */}
          <>
            {pages.map((page, index) => {
              return (
                index % 2 === 0 && (
                  <PageWrapper>
                    {/* 왼쪽 페이지 */}
                    <PageEdit
                      key={index}
                      positions={positions}
                      setPositions={setPositions}
                      page={pages[index]}
                      index={index + 1}
                      show={index + 1 === pageNum}
                    />
                    {/* 오른쪽 페이지 */}
                    {index < length - 1 && (
                      <PageEdit
                        key={index + 1}
                        positions={positions}
                        setPositions={setPositions}
                        page={pages[index + 1]}
                        index={index + 2}
                        show={index + 1 === pageNum}
                      />
                    )}
                  </PageWrapper>
                )
              );
            })}
          </>
        </Wrapper>
        {/* 오른쪽 버튼 */}
        <ArrowButton onClick={onRightClick} side="right" />
      </Container>
      <Submit
        type="submit"
        onClick={handleEditBook}
        disabled={!saved}
        $background={colors.theme1}
      >
        완성하기
      </Submit>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  width: ${(props) => (props.$smallWidth ? "35%" : "70%")};
`;

const PageWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  color: white;
  background: ${({ $background }) => $background};
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Submit = styled.button`
  padding: 8px 14px;
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  font-family: inherit;
  border: none;
  border-radius: 30px;
  color: white;
  background: ${({ $background }) => $background};
  &:hover {
    cursor: pointer;
  }
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

export default BookEditPage;
