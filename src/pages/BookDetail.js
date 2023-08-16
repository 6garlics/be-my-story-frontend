import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {book && (
          <Book
            userName={book.userName}
            title={book.title}
            texts={book.texts}
            coverUrl={book.coverUrl}
            images={book.images}
          />
        )}
      </div>
    </div>
  );
};

export default BookDetail;
