import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Book from "../components/timeline/Book";
import { getBook } from "./../api/books";

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
  }, []);

  return (
    <Root>
      <Container>
        {book && (
          <Book
            userName={book.userName}
            title={book.title}
            texts={book.texts}
            coverUrl={book.coverUrl}
            images={book.images}
          />
        )}
      </Container>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  transform: translate(0, -35px);
`;

export default BookDetail;
