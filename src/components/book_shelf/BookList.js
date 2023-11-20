import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { styled } from "styled-components";
import BookCover from "./BookCover";

const BookList = ({ books }) => {
  const wrapper = useRef();

  //스크롤 위치 기억
  const rememberScroll = () => {
    localStorage.setItem("bookshelfScroll", wrapper.current.scrollTop);
  };

  //스크롤 위치 복원
  useEffect(() => {
    if (wrapper.current) {
      wrapper.current.scrollTop = localStorage.getItem("bookshelfScroll");
    }
  }, [books]);

  return (
    <Wrapper ref={wrapper} onScroll={rememberScroll}>
      {books.map((book) => (
        <BookCoverWrapper>
          <BookCover
            key={book.bookId}
            bookId={book.bookId}
            coverUrl={book.coverUrl}
            title={book.title}
          />
        </BookCoverWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  /* height: 800px; */
  flex: 5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 60px;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden; //가로 스크롤바 숨기기
  //스크롤바 디자인
  &::-webkit-scrollbar {
    width: 20px;
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(151, 161, 255, 0.6);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
`;

const BookCoverWrapper = styled.div`
  padding: 3%;
  box-sizing: border-box;
  @media (min-width: 2001px) {
    width: 16%;
  }
  @media (max-width: 2000px) {
    width: 20%;
  }
  @media (max-width: 1700px) {
    width: 25%;
  }
  @media (max-width: 1400px) {
    width: 33%;
  }
  @media (max-width: 1100px) {
    width: 50%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export default BookList;
