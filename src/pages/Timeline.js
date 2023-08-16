import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import Book from "../components/timeline/Book";
import { friends } from "../data/FriendsData";
import { getBooks } from "../api/books";

//const id = 0;
const texts = ["1", "2", "3", "4", "5"];

function Timeline() {
  const [books, setBooks] = useState([]);

  //전체 동화책 조회
  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container>
        {books.map((book, index) => (
          <Book
            key={index}
            bookId={book.bookId}
            userName={book.userName}
            title={book.title}
            texts={book.texts}
            coverUrl={book.coverUrl}
            imgUrls={book.images}
            newBook={false}
          />
        ))}
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 85%;
`;

export default Timeline;
