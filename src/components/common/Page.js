import React from "react";
import { styled } from "styled-components";

const Page = ({ imgUrl }) => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="/images/dummy3.png" />
      </ImageWrapper>
      <TextWrapper>
        <Text>
          이것은 동화 이것은 동화 이것은 동화 이것은 동화이것은 동화이것은 동화
          이것은 동화 이것은 동화 이것은 동화 이것은 동화이것은 동화이것은 동화
        </Text>
      </TextWrapper>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  display: flex;
  border: 1px solid red;
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 50%;
  border: 1px solid blue;
`;

const Image = styled.img`
  width: 100%;
`;

const TextWrapper = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
  padding: 30px;
  box-sizing: border-box;
  background: skyblue;
`;

const Text = styled.div`
  border: 1px solid white;
  white-space: normal;
  color: black;
  font-size: 18px;
  line-height: 30px;
`;
