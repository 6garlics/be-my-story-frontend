import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BookCover = ({ bookId, coverUrl, title }) => {
  //console.log("BookCover: ", book);
  return (
    <Container>
      <NavLink
        to={`/book/${bookId}/detail`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <CoverImage src={coverUrl} />
        <Title>{title}</Title>
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  height: 330px;
  padding: 60px 20px;
  box-sizing: border-box;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 10%;
  &:hover {
    width: 120%;
    transform: translate(-10%, -10%);
    box-shadow: 0px 0px 50px -5px gold;
  }
  transition: all 0.2s ease-in-out;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 5px;
`;

export default BookCover;
