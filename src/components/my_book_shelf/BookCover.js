import React from "react";
import styled from "styled-components";

const BookCover = ({ coverImage, title }) => {
  return (
    <Container>
      <CoverImage src={coverImage} />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 33.333%;
  padding: 20px;
`;
const CoverImage = styled.img`
  width: 100%;
`;

const Title = styled.div``;

export default BookCover;
