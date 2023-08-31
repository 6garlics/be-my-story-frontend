import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const BookCover = ({ bookId, coverUrl, title }) => {
  //console.log("BookCover: ", book);
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/book/${bookId}/detail`);
      }}
    >
      <CoverImage src={coverUrl} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  /* border: 1px solid white; */
`;

const CoverImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 5%;
  &:hover {
    /* width: 120%;
    transform: translate(-10%, -10%);
    box-shadow: 0px 0px 50px -5px gold; */
  }
  transition: all 0.2s ease-in-out;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  width: 90%;
  height: 75px;
  text-align: center;
  margin-top: 5px;
  font-size: 20px;
  /* 여러줄 말줄임표 */
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all; // 문단으로 끊어져서 줄바꿈 됨
  /* transform: translate(-50%, -50%); */
  /* border: 1px solid white; */
  font-family: "Gaegu";
`;

export default BookCover;
