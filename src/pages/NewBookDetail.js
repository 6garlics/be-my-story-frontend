import React from "react";
import Book from "../components/timeline/Book";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

const NewBookDetail = () => {
  //Redux의 상태 꺼내오기
  const userName = useSelector((state) => state.user.userName);
  const bookId = useSelector((state) => state.book.bookId);
  const title = useSelector((state) => state.book.title);
  const texts = useSelector((state) => state.book.texts);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const images = useSelector((state) => state.book.images);
  console.log(coverUrl);
  console.log(images);

  return (
    <Root>
      <Book
        userName={userName}
        bookId={bookId}
        title={title}
        texts={texts}
        coverUrl={coverUrl}
        images={images}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export default NewBookDetail;
