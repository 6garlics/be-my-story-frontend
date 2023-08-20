import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";

const Cover = ({ coverUrl, title, onclick, buttonLeft, buttonRight }) => {
  // console.log("coverUrl", coverUrl);

  return (
    <Container>
      <ImageBox>
        {coverUrl ? (
          <Image src={coverUrl} alt="" />
        ) : (
          <Loader>
            <DotLoader color="#78B9FF" size={100} />
          </Loader>
        )}
        <Title>{title}</Title>
        <Button
          onClick={onclick}
          left={buttonLeft}
          right={buttonRight}
        ></Button>
      </ImageBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 3% 3% 3% 3%;
  border: 1px solid grey;
`;

const Loader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3% 3% 3% 3%;
`;

const Title = styled.div`
  position: absolute;
  width: 60%;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
  word-break: keep-all;
  text-align: center;
  font-family: "Gaegu";
  font-size: 40px;
`;

const Button = styled.button`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: 100%;
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

export default Cover;
