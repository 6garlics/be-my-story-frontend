import React from "react";
import { useLocation } from "react-router-dom";
import Book from "../timeline/Book";

const BookDetail = () => {
  console.log(useLocation());
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Book
          bookId={useLocation().state.bookId}
          texts={useLocation().state.texts}
        />
      </div>
    </div>
  );
};

export default BookDetail;
