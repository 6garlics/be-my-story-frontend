import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Book from "../components/Book";

function Timeline() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const response = await fetch(
      "https://8d2f9c4b-049f-4bd4-81c4-e22ed6603982.mock.pstmn.io/books"
    );
    console.log(response);
    const json = await response.json();
    setBooks(json);
    console.log(json);
  };
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Container>
      {books.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  /* background: beige; */
`;

export default Timeline;
