import React from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";

const Modal = ({ open, setOpen }) => {
  useEffect(() => {
    // disableScroll();
    // return () => enableScroll();

    // document.body.style = `overflow: hidden`;
    // return () => (document.body.style = `overflow: auto`);

    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <>
      <Layer
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      ></Layer>
      <Container>
        <Inner>
          <CloseBtn onClick={() => setOpen((prev) => !prev)}>
            <IoClose size={22} color="#78b9ff" />
          </CloseBtn>
          <Header>
            <Date>2023년 7월 23일 일요일</Date>
            <Genre>모험</Genre>
          </Header>

          <Title>제목: 자전거</Title>

          <Contents>
            오늘 밤에 자전거를 탔다. 자전거는 처음 탈 때는 좀 중심잡기가
            힘들었다. 그러나 재미있었다. 자전거를 잘 타서 엄마, 아빠 산책 갈 때
            나도 가야겠다.
          </Contents>
        </Inner>
      </Container>
    </>
  );
};

export default Modal;

const Layer = styled.div`
  z-index: 1;
  //display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  z-index: 2;
  width: 450px;
  height: 650px;
  /* background: black; */
  background: #78b9ff;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Inner = styled.div`
  /* z-index: 2; */
  width: 400px;
  height: 600px;
  padding: 45px 20px;
  box-sizing: border-box;
  /* border-radius: 9px; */
  /* outline: 17px solid #78b9ff; */
  background: #fff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  margin: 0;
  padding: 7px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
  /* border: 1px solid red; */
`;

const Header = styled.div`
  display: flex;
  padding: 10px 5px;
  border-top: 2px solid #78b9ff;
`;

const Date = styled.div``;

const Genre = styled.div`
  margin-left: auto;
  font-size: 12px;
  font-weight: bold;
  background: #78b9ff;
  color: white;
  padding: 0 7px;
  padding-top: 2px;
  text-align: center;
  border-radius: 20px;
`;

const Title = styled.div`
  padding: 20px 5px;
  border-top: 2px solid #78b9ff;
`;

const Contents = styled.div`
  padding: 0px 5px;
  flex: auto;
  border-bottom: 2px solid #78b9ff;
`;
