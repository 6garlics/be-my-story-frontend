import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const BookCover = ({ bookId, coverUrl, title }) => {
  //console.log("BookCover: ", book);
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/book/${bookId}/detail`);
      }}
    >
      {/* <NavLink
        to={`/book/${bookId}/detail`}
        style={{ textDecoration: "none", color: "white" }}
      > */}
      <CoverImage src={coverUrl} />
      {/* <Title>{title}</Title> */}
      {/* </NavLink> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;
`;

const CoverImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 5%;
  &:hover {
    /* width: 120%;
    transform: translate(-10%, -10%);
    box-shadow: 0px 0px 50px -5px gold; */
  }
  transition: all 0.2s ease-in-out;
`;

const Title = styled.div`
  width: 90%;
  font-size: 18px;
  text-align: center;
  margin-top: 5px;
  position: absolute;
  font-size: 17px;
  font-weight: bold;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Gaegu";
`;

export default BookCover;
