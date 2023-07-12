import React, { useState, useEffect } from "react";
import BookPageForm from "../components/book_form/BookPageForm";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// const book = {
//   storyBook: {
//     bookId: 1,
//     subject: "자전거를 타며 성장하는 나의 이야기",
//     story_type: "성장",
//     date: "2023-06-29",
//   },
//   pages: [
//     {
//       pageId: 1,
//       idx: 0,
//       img_url: "images/finetuning1.png",
//       text: "첫번째 페이지",
//     },
//     {
//       pageId: 2,
//       idx: 1,
//       img_url: "images/finetuning2.png",
//       text: "두번째 페이지~~~",
//     },
//     {
//       pageId: 3,
//       idx: 2,
//       img_url: "images/finetuning3.png",
//       text: "세번째 페이지~~~~~~",
//     },
//     {
//       pageId: 4,
//       idx: 3,
//       img_url: "images/finetuning4.png",
//       text: "네번째 페이지~~~~~~~~~",
//     },
//   ],
// };

const BookForm = () => {
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const book = location.state.book;
  useEffect(() => {
    console.log("받아온 데이터: ", book);
  }, []);

  const createBook = () => {
    navigate("/bookshelf/0");
  };

  const onClickLeft = () => {
    if (pageNum > 0) setPageNum((prev) => prev - 1);
  };
  const onClickRight = () => {
    if (pageNum < book.pages.length - 1) setPageNum((prev) => prev + 1);
  };

  // console.log(pageNum);

  return (
    <RootContainer>
      <Title>{book.storyBook.subject}</Title>
      <Container>
        <Button onClick={onClickLeft}>
          <IoIosArrowBack />
        </Button>
        {book.pages.map((page, index) => {
          return (
            <BookPageForm
              key={index}
              page={page}
              index={index}
              pageNum={pageNum}
            />
          );
        })}
        <Button onClick={onClickRight}>
          <IoIosArrowForward />
        </Button>
      </Container>
      <Submit type="submit" onClick={createBook}>
        동화책 만들기
      </Submit>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  margin: 20px 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
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

export default BookForm;
