import React from "react";
import BookPageForm from "../components/book_form/BookPageForm";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const BookForm = () => {
  const navigate = useNavigate();
  const createFairytale = () => {
    navigate("/");
  };
  return (
    <Container>
      <BookPageForm />
      <Submit onClick={createFairytale}>동화책 만들기</Submit>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Submit = styled.button`
  margin-top: 10px;
`;

export default BookForm;
