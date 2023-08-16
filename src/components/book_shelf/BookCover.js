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
  width: 33.333%;
  padding: 20px;
  box-sizing: border-box;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 10%;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 5px;
`;

export default BookCover;
