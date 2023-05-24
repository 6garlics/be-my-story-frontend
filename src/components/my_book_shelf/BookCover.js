import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const BookCover = ({ coverImage, title }) => {
  return (
    <Container>
      <NavLink
        to="/book/1/detail"
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
`;

const Title = styled.div``;

export default BookCover;
