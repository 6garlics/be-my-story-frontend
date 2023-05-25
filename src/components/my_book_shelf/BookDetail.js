import React from "react";
import { useLocation } from "react-router-dom";
import Book from "./../timeline/Book";

const BookDetail = () => {
  console.log(useLocation());
  return (
    <div>
      <Book friend={useLocation().state.book} />
    </div>
  );
};

export default BookDetail;
