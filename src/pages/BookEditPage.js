import React, { useState, useEffect } from "react";
import PageEdit from "../components/book_edit/PageEdit";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { editBook } from "../api/books";
import { useSelector } from "react-redux";

const book = {
  bookId: 1,
  title: "임시 제목",
  coverUrl: "/images/dummy1.png",
  genre: "성장",
  date: "2023-06-29",
  pages: [
    {
      imgUrl: "/images/image1.png",
      text: "첫번째 페이지",
    },
    {
      imgUrl: "/images/image2.png",
      text: "두번째 페이지~~~",
    },
    {
      imgUrl: "/images/image3.png",
      text: "세번째 페이지~~~~~~",
    },
    {
      imgUrl: "/images/image4.png",
      text: "네번째 페이지~~~~~~~~~",
    },
    {
      imgUrl: "/images/image5.png",
      text: "다섯번째 페이지~~~~~~~~~",
    },
  ],
};

const bookTemp = {
  title: "자전거를 타며 성장하는 나의 이야기",

  coverUrl: "/images/dummy1.png",

  texts: [
    "첫번째 페이지",
    "두번째 페이지",
    "세번째 페이지",
    "네번째 페이지",
    "다섯번째 페이지",
  ],

  images: [
    "/images/finetuning1.png",
    "/images/finetuning2.png",
    "/images/finetuning3.png",
    "/images/finetuning4.png",
    "/images/finetuning5.png",
  ],
};

const BookEditPage = () => {
  //Redux의 상태 꺼내오기
  const bookId = useSelector((state) => state.book.bookId);
  const title = useSelector((state) => state.book.title);
  const texts = useSelector((state) => state.book.texts);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const images = useSelector((state) => state.book.images);

  //현재 열람하고 있는 페이지 번호 (0번째는 표지)
  const [pageNum, setPageNum] = useState(0);

  //각 텍스트의 위치 좌표 (0번째는 제목)
  const [positions, setPositions] = useState([
    ...texts.map((_) => {
      return { x: 0, y: 0 };
    }),
    { x: 0, y: 0 },
  ]);

  const navigate = useNavigate();

  // Redux의 상태를 꺼내서 book에 저장해야함
  // newBookDetail 참고

  // const location = useLocation();

  // const book = location.state.book;
  // useEffect(() => {
  //   console.log("받아온 데이터: ", book);
  // }, []);

  // const createBook = () => {
  //   navigate("/bookshelf/0");
  // };

  //동화책 수정 api 요청
  const handleEditBook = async () => {
    const body = {
      title: title,
      titleX: positions[0].x,
      titleY: positions[0].y,
      coverUrl: coverUrl,
      pages: texts.map((text, index) => ({
        text: text,
        imgUrl: images[index],
        x: positions[index + 1].x,
        y: positions[index + 1].y,
      })),
    };
    console.log("동화책 1개 수정 api 요청 바디", body);
    await editBook(bookId, body);
    navigate(`book/${bookId}/detail`);
  };

  const onLeftClick = () => {
    if (pageNum === 1) setPageNum((prev) => prev - 1); //내용에서 표지로
    else if (pageNum > 1) setPageNum((prev) => prev - 2);
  };
  const onRightClick = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1); //표지에서 내용으로
    else if (pageNum <= texts.length - 2) setPageNum((prev) => prev + 2);
  };

  return (
    <RootContainer>
      <Container>
        {/* 왼쪽 버튼 */}
        <Button onClick={onLeftClick}>
          <IoIosArrowBack />
        </Button>
        <Wrapper $smallWidth={pageNum === 0 || pageNum === texts.length}>
          {/* 표지 */}
          <PageEdit
            positions={positions}
            setPositions={setPositions}
            text={title}
            imgUrl={coverUrl}
            index={0}
            show={pageNum === 0}
          />
          {/* 내용 */}
          <>
            {texts.map((text, index) => {
              return (
                index % 2 === 0 && (
                  <PageWrapper>
                    {/* 왼쪽 페이지 */}
                    <PageEdit
                      key={index}
                      positions={positions}
                      setPositions={setPositions}
                      //page={book.pages[index]}
                      //page={{ text: text, imgUrl: images[index] }}
                      text={texts[index]}
                      imgUrl={images[index]}
                      index={index + 1}
                      show={index + 1 === pageNum}
                    />
                    {/* 오른쪽 페이지 */}
                    {index < texts.length - 1 && (
                      <PageEdit
                        key={index + 1}
                        positions={positions}
                        setPositions={setPositions}
                        //page={book.pages[index + 1]}
                        text={texts[index + 1]}
                        imgUrl={images[index + 1]}
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
        <Button onClick={onRightClick}>
          <IoIosArrowForward />
        </Button>
      </Container>
      <Submit type="submit" onClick={handleEditBook}>
        동화책 만들기
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

const EndingPage = styled.div`
  width: 100%;
  /* height: 0px; */
  /* padding-bottom: 50%; */
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  &:hover {
    color: white;
    background: #beddff;
    cursor: pointer;
  }
`;

const Submit = styled.button`
  padding: 10px;
  margin-top: 10px;
  font-size: 30px;
  border: none;
  border-radius: 10px;
  background-color: #beddff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export default BookEditPage;
