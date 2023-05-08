import React from "react";
import { styled } from "styled-components";
import Book from "../components/Book";

function Timeline(props) {
  return (
    <Container>
      <Book />
    </Container>
  );
}

const Container = styled.div`
  background: beige;
`;

export default Timeline;
