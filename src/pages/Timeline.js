import React from "react";
import { styled } from "styled-components";
import Book from "../components/Book";
const books = [
  {
    userId: "Jamie",
    profileImage: "images/Profile.jpg",
    pages: [
      {
        image: "images/image1.png",
        text: "피터팬과 아이들은 함께 하늘로 날아 올랐어요.",
      },
      {
        image: "images/image2.png",
        text: "피터팬은 후크선장을 악어에게 데리고 갔어요.",
      },
      {
        image: "images/image3.png",
        text: "“과자로 만들어진 집이네?”",
      },
      {
        image: "images/image4.png",
        text: "남매는 마녀에게 붙잡혀 버렸어요.",
      },
      {
        image: "images/image5.png",
        text: "아기 돼지 삼형제는 집을 지으러 떠났어요.",
      },
      {
        image: "images/image6.png",
        text: "형제들은 마침내 집을 완성했답니다.",
      },
    ],
  },
];

function Timeline() {
  return (
    <Container>
      {books.map((book) => (
        <Book book={book} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background: beige;
`;

export default Timeline;
