import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import { createImage } from "../../api/books";

const Page = ({
  bookId,
  imgUrl,
  text,
  pageNum,
  onclick,
  side,
  buttonLeft,
  buttonRight,
  pageNumLeft,
  pageNumRight,
}) => {
  //const [loading, setLoading] = useState(true);
  //const [imgUrl, setImgUrl] = useState(null);

  // useEffect(() => {
  //   //일러스트 생성
  //   const data = createImage(bookId, pageNum - 1);
  //   setImgUrl(data.imgUrl);
  // }, []);

  return (
    <Container>
      <ImageBox side={side}>
        {imgUrl ? (
          <Image src={imgUrl} alt="" key={pageNum} side={side} />
        ) : (
          <Loader>
            <DotLoader color="#78B9FF" size={100} />
          </Loader>
        )}
        <Button
          onClick={onclick}
          left={buttonLeft}
          right={buttonRight}
        ></Button>
        <PageNum left={pageNumLeft} right={pageNumRight}>
          {pageNum}
        </PageNum>
      </ImageBox>
      <PageText>{text}</PageText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 500px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  /* box-sizing: border-box; */
  overflow: hidden;
  outline: 1px solid grey;
  border-radius: ${(props) =>
    props.side === "left" ? "3% 0% 0% 3%" : "0% 3% 3% 0%"};
  /* display: flex; */
`;

const Loader = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  /* flex: 1; */
  /* height: 100%; */
  //background: beige;
  /* height: 90vh; */
  color: grey;
  font-size: 20px;
  //font-weight: bold;
  /* border: 1px solid blue; */
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
