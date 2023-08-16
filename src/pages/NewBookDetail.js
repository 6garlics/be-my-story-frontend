import React from "react";
import { useLocation } from "react-router-dom";
import Book from "../components/timeline/Book";

const NewBookDetail = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Book
          bookId={location.state.bookId}
          title={location.state.title}
          texts={location.state.texts}
          newBook={true}
        />
      </div>
    </div>
  );
};

export default NewBookDetail;
