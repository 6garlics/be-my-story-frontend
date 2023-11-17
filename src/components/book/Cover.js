import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import "../../fonts/font.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Cover = ({ title, titlePos, coverUrl }) => {
  const container = useRef();
  const [fontSize, setFontSize] = useState();

  // 삽화 크기에 따라 폰트 크기 변경
  useEffect(() => {
    const observer = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setFontSize(Math.floor(width * 0.1));
      }
    });
    observer.observe(container.current);
  }, []);

  return (
    <Container ref={container}>
      <ImageBox>
        {coverUrl ? (
          <Image src={coverUrl} alt="" loading="lazy" />
        ) : (
          <Loader>
            <DotLoader color="#78B9FF" size={100} />
          </Loader>
        )}
        <Title $titlePos={titlePos} $fontSize={fontSize}>
          {title}
        </Title>
      </ImageBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.15);
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  padding-bottom: 100%;
  overflow: hidden;
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
`;

const Title = styled.div.attrs(
  (props) =>
    props.$titlePos && {
      style: {
        top: props.$titlePos.y + "%",
        left: props.$titlePos.x + "%",
        fontSize: props.$fontSize + "px",
      },
    }
)`
  position: absolute;
  width: 90%;
  padding: 0.5vw;
  font-weight: bold;
  word-break: keep-all;
  text-align: center;
  font-family: "SKYBORI";
  letter-spacing: 0.1vw;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 30px 25px rgba(0, 0, 0, 0.2);
  border-radius: 5em;
`;

export default Cover;
