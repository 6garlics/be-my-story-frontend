import React, { useState, useEffect } from "react";
import PageEdit from "../components/book_edit/PageEdit";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { editBook } from "../api/books";

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

const BookEditPage = ({ bookId }) => {
  const [pageNum, setPageNum] = useState(0); //0은 표지의 인덱스
  const [positions, setPositions] = useState([
    ...book.pages.map((_) => {
      return { x: 0, y: 0 };
    }),
    { x: 0, y: 0 },
  ]);
  const [print, setPrint] = useState();
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

  const onSave = async () => {
    // await editBook(bookId, {
    //   title: book.title,
    //   titlePos: positions[0],
    //   coverUrl: book.coverUrl,
    //   pages: book.pages.map((page, index) => {
    //     return { ...page, textPos: positions[index + 1] };
    //   }),
    // });
    setPrint({
      title: book.title,
      titlePos: positions[0],
      coverUrl: book.coverUrl,
      pages: book.pages.map((page, index) => {
        return { ...page, textPos: positions[index + 1] };
      }),
    });
  };

  console.log(print);

  const onLeftClick = () => {
    if (pageNum <= 1) setPageNum((prev) => prev - 1); //내용에서 표지로
    else setPageNum((prev) => prev - 2);
  };
  const onRightClick = () => {
    if (pageNum === 0) setPageNum((prev) => prev + 1); //표지에서 내용으로
    else if (pageNum <= book.pages.length - 2) setPageNum((prev) => prev + 2);
  };

  // console.log(pageNum);

  return (
    <RootContainer>
      <Container>
        {/* 왼쪽 버튼 */}
        <Button onClick={onLeftClick}>
          <IoIosArrowBack />
        </Button>
        {/* 표지 */}
        <PageEdit
          positions={positions}
          setPositions={setPositions}
          page={{ text: book.title, imgUrl: book.coverUrl }}
          index={0}
          show={pageNum === 0}
        />
        {/* 내용 */}
        {book.pages.map((page, index) => {
          return (
            index % 2 === 0 && (
              <PageWrapper>
                {/* 왼쪽 페이지 */}
                <PageEdit
                  key={index}
                  positions={positions}
                  setPositions={setPositions}
                  page={book.pages[index]}
                  index={index + 1}
                  show={index + 1 === pageNum}
                />
                {/* 오른쪽 페이지 */}
                {index < book.pages.length - 1 && (
                  <PageEdit
                    key={index + 1}
                    positions={positions}
                    setPositions={setPositions}
                    page={book.pages[index + 1]}
                    index={index + 2}
                    show={index + 1 === pageNum}
                  />
                )}
              </PageWrapper>
            )
          );
        })}
        {/* 오른쪽 버튼 */}
        <Button onClick={onRightClick}>
          <IoIosArrowForward />
        </Button>
      </Container>
      <Submit type="submit" onClick={onSave}>
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
`;

const PageWrapper = styled.div`
  display: flex;
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
