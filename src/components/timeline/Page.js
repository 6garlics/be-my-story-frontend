import React from "react";
import styled from "styled-components";
import { FullScreen } from "react-full-screen";

const Page = ({
  book,
  pageNum,
  onclick,
  side,
  buttonLeft,
  buttonRight,
  pageNumLeft,
  pageNumRight,
  fullScreen,
}) => {
  return (
    <Container fullScreen={fullScreen}>
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
  position: relative;
  width: ${(props) => (props.fullScreen ? "700px" : "500px")};
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
  /* 윈도우 가로 크기 늘렸을때 5,6 페이지만 크기 작아지는 현상 발생 */
  /* 이미지가 실제크기 이상으로 안늘어나는 듯 */
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
  /* 문제점: 버튼의 세로길이가 이미지의 세로길이보다 살짝 길다.*/
`;

const PageNum = styled.div`
  margin: 3px;
  position: absolute;
  bottom: 2px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  text-align: center;
`;

const PageText = styled.div`
  text-align: center;
  font-size: 20px;
  word-break: keep-all;
  height: 6rem;
  //outline: 1px solid grey;
`;

export default Page;
