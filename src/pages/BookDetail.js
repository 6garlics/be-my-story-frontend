import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Book from "../components/book/Book";
import { getBook } from "../api/books";

const BookDetail = () => {
  const { bookId } = useParams();
  console.log("bookId", bookId);

  const [book, setBook] = useState();

  //동화책 1개 조회
  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await getBook(bookId);
        setBook(data);
      } catch (err) {}
    }
    fetchBook();
  }, [bookId]);

  return (
    <Root>
      {book && (
        <Book
          userName={book.userName}
          bookId={book.bookId}
          title={book.title}
          titlePos={{ x: book.titleX, y: book.titleY }}
          coverUrl={book.coverUrl}
          musicUrl={book.musicUrl && book.musicUrl}
          pages={book.pages}
        />
      )}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export default BookDetail;
