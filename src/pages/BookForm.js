import React, { useState } from "react";
import BookPageForm from "../components/book_form/BookPageForm";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const pages = [
  {
    images: [
      "images/bike1.png",
      "images/bike2.png",
      "images/bike3.png",
      "images/bike4.png",
    ],
    text: "1. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
  },
  {
    images: [
      "images/bike2.png",
      "images/bike3.png",
      "images/bike4.png",
      "images/bike1.png",
    ],
    text: "2. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
  },
  {
    images: [
      "images/bike3.png",
      "images/bike4.png",
      "images/bike1.png",
      "images/bike2.png",
    ],
    text: "3. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
  },
  {
    images: [
      "images/bike4.png",
      "images/bike1.png",
      "images/bike2.png",
      "images/bike3.png",
    ],
    text: "4. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
  },
];

const BookForm = () => {
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  const createBook = () => {
    navigate("/");
  };

  const onClickLeft = () => {
    if (pageNum > 0) setPageNum((prev) => prev - 1);
  };
  const onClickRight = () => {
    if (pageNum < pages.length - 1) setPageNum((prev) => prev + 1);
  };
  console.log(pageNum);
  return (
    <RootContainer>
      <Container>
        <Button onClick={onClickLeft}>{`<`}</Button>
        <BookPageForm page={pages[pageNum]} />
        <Button onClick={onClickRight}>{`>`}</Button>
      </Container>
      <Submit onClick={createBook}>동화책 만들기</Submit>
    </RootContainer>
  );
};

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  font-size: 30px;
`;

const Submit = styled.button`
  margin-top: 10px;
`;

export default BookForm;
