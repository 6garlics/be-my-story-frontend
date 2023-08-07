import React from "react";
import { styled } from "styled-components";

const Page = ({
  imgUrl = "/images/dummy3.png",
  text = "시작시작이것은 동화 이것은 동화 이것은 동화 이것은 동화이것은 동화이것은 동화 이것은 동화 이것은 동화 이것은 동화 이것은 동화이것은 동화이것은 동화 이것은 동화 이것은 동화 이것은 동화 이것은 동화이것은 동화이것은 동화 이것은 동화 이것은 동화 이것은 동화 이것은 동화 끝끝끝",
  pageNum = 1,
  onLeftClick,
  onRightClick,
}) => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={imgUrl} />
        <Button onClick={onLeftClick} $left="0px" $right="auto">
          왼쪽
        </Button>
      </ImageWrapper>
      <TextWrapper>
        <Text>{text}</Text>
        <PageNum>{pageNum}</PageNum>
        <Button onClick={onRightClick} $left="auto" $right="0px">
          오른쪽
        </Button>
      </TextWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  border: 1px solid red;
  width: 90%;
  min-width: 500px;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 50%;
  padding-bottom: 50%;
  height: 0;
  border: 3px solid blue;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
`;

const TextWrapper = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
  box-sizing: border-box;
  background: skyblue;
  color: black;
  position: relative;
`;

const Text = styled.div`
  border: 1px solid white;
  white-space: normal;
  font-size: 18px;
  line-height: 30px;
  position: absolute;
  padding: 30px;
  box-sizing: border-box;
  max-height: 100%;
  border: 3px solid red;
`;

const PageNum = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const Button = styled.button`
  position: absolute;
  width: 70%;
  height: 100%;
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  opacity: 0;
  &:hover {
    cursor: pointer;
  }
`;
