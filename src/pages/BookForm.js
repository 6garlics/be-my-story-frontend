import React, { useState } from "react";
import BookPageForm from "../components/book_form/BookPageForm";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

// const pages = [
//   {
//     images: [
//       "images/bike1.png",
//       "images/bike2.png",
//       "images/bike3.png",
//       "images/biek4.png",
//     ],
//     text: "1. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
//   },
//   {
//     images: [
//       "images/bike2.png",
//       "images/bike3.png",
//       "images/bike4.png",
//       "images/bike1.png",
//     ],
//     text: "2. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
//   },
//   {
//     images: [
//       "images/bike3.png",
//       "images/bike4.png",
//       "images/bike1.png",
//       "images/bike2.png",
//     ],
//     text: "3. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
//   },
//   {
//     images: [
//       "images/bike4.png",
//       "images/bike1.png",
//       "images/bike2.png",
//       "images/bike3.png",
//     ],
//     text: "4. 한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요.",
//   },
// ];

const pages = [
  {
    images: [
      "images/finetuning1.png",
      "images/finetuning2.png",
      "images/finetuning3.png",
      "images/finetuning4.png",
    ],
    text: `한 번도 타보지 않았던 자전거에 처음으로 올랐다.
처음에는 중심을 잡는 것조차 어려웠다.
그러나 그 과정에서의 어색함과 불안감도 놀라운 재미로 변해갔다.
자전거의 미묘한 균형을 유지하며 나아가는 느낌은 환상적이었다.`,
  },
  {
    images: [
      "images/finetuning2.png",
      "images/finetuning3.png",
      "images/finetuning4.png",
      "images/finetuning1.png",
    ],
    text: `자전거 타는 것이 이렇게 즐거울 줄은 몰랐다.
매일 아빠와 엄마가 산책을 가는 것을 보면서
나도 함께 가고 싶다고 생각했다.
자신감이 생기자 엄마와 아빠에게 부탁을 해보기로 했다.`,
  },
  {
    images: [
      "images/finetuning3.png",
      "images/finetuning4.png",
      "images/finetuning1.png",
      "images/finetuning2.png",
    ],
    text: `"엄마, 아빠! 저도 자전거 타고 산책 가고 싶어요!"
내가 부탁하는 모습을 보며 둘은 크게 놀랐다.
하지만 그들은 내 열정을 이해해주었고,
더 이상 나를 막지 않기로 했다.`,
  },
  {
    images: [
      "images/finetuning4.png",
      "images/finetuning1.png",
      "images/finetuning2.png",
      "images/finetuning3.png",
    ],
    text: `이제부터 나도 자전거를 타고 산책을 할 수 있게 되었다.
힘차게 페달을 밟으면 바람을 맞으며
자유롭게 희망의 길을 달릴 수 있다.
자전거를 타면서 새로운 모험을 만나고
즐거움을 만끽할 수 있다는 사실에
두근거리는 마음이 넘쳐난다.`,
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
        {pages.map((page, index) => {
          return (
            <BookPageForm
              key={index}
              page={page}
              index={index}
              pageNum={pageNum}
            />
          );
        })}
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
