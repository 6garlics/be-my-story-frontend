import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";

const Cover = ({ title, titlePos, coverUrl, onclick }) => {
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
        <Title $titlePos={titlePos}>{title}</Title>
        <Button onClick={onclick}></Button>
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

const Title = styled.div.attrs(
  (props) =>
    props.$titlePos && {
      style: {
        top: props.$titlePos.y + "px",
        left: props.$titlePos.x + "px",
      },
    }
)`
  ${(props) =>
    !props.$titlePos &&
    "left: 50%; transform: translate(-50%, 0%); margin-top: 2vw"};
  position: absolute;
  width: 60%;
  padding: 0.5vw;
  font-size: 3.2vw;
  font-weight: bold;
  word-break: keep-all;
  text-align: center;
  font-family: "Gaegu";
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 30px 25px rgba(0, 0, 0, 0.2);
  border-radius: 5em;
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

export default Cover;
