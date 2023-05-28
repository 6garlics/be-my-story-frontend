import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BookCover = ({ coverImage, title, book }) => {
  console.log("BookCover: ", book);
  return (
    <Container>
      <NavLink
        to={`/book/${book.id}/detail`}
        state={{ book: book }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CoverImage src={coverImage} />
        <Title>{title}</Title>
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  width: 33.333%;
  padding: 20px;
  box-sizing: border-box;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 10%;
`;

const Title = styled.div`
  display: inline-block;
`;

export default BookCover;
