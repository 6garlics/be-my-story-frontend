import React from "react";
import styled from "styled-components";

const Page = ({ book, pageNum, onclick, left, right }) => {
  return (
    <Container>
      <ImageBox>
        <Image src={book.pages[pageNum].image} alt="" key={pageNum} />
        <Button onClick={onclick} left={left} right={right}></Button>
      </ImageBox>
      <PageNum left={left} right={right}>
        {pageNum + 1}
      </PageNum>
      <PageText>{book.pages[pageNum].text}</PageText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid grey;
`;

const ImageBox = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
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
  /* 문제점: 버튼의 세로길이가 이미지의 세로길이보다 살짝 길다.*/
  /* 마우스 hover시 강조 효과로 inner 그림자 주면 좋을 듯 */
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
`;

export default Page;
