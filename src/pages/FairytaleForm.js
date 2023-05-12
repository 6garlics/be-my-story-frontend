import React from "react";
import FairytalePageForm from "../components/FairytalePageForm";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const FairytaleForm = () => {
  const navigate = useNavigate();
  const createFairytale = () => {
    navigate("/");
  };
  return (
    <Container>
      <FairytalePageForm />
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

export default FairytaleForm;
