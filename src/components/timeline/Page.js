import React from "react";
import styled from "styled-components";

const Page = ({
  book,
  pageNum,
  onclick,
  buttonLeft,
  buttonRight,
  pageNumLeft,
  pageNumRight,
}) => {
  return (
    <Container>
      <ImageBox>
        <Image src={book.pages[pageNum].image} alt="" key={pageNum} />
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
  width: 300px;
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
