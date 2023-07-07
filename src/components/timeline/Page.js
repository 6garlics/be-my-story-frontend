import React from "react";
import styled from "styled-components";

const Page = ({
  book,
  pageNum,
  onclick,
  side,
  buttonLeft,
  buttonRight,
  pageNumLeft,
  pageNumRight,
}) => {
  return (
    <Container>
      <ImageBox>
        <Image
          src={book.pages[pageNum].image}
          alt=""
          key={pageNum}
          side={side}
        />
        <Button
          onClick={onclick}
          left={buttonLeft}
          right={buttonRight}
        ></Button>
        <PageNum left={pageNumLeft} right={pageNumRight}>
          {pageNum + 1}
        </PageNum>
      </ImageBox>
      <PageText>{book.pages[pageNum].text}</PageText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //position: relative;
  width: 500px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) =>
    props.side === "left" ? "3% 0% 0% 3%" : "0% 3% 3% 0%"};
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: 50%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;

const PageNum = styled.div`
  margin: 3px;
  position: absolute;
  bottom: 12px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  text-align: center;
`;

const PageText = styled.div`
  text-align: center;
  font-size: 20px;
  word-break: keep-all;
  height: 6rem;
`;

export default Page;
