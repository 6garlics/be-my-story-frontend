import React from "react";
import { useLocation } from "react-router-dom";
import Book from "../timeline/Book";

const BookDetail = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Book
          bookId={location.state.bookId}
          title={location.state.title}
          texts={location.state.texts}
          isCreated={true}
        />
      </div>
    </div>
  );
};

export default BookDetail;
