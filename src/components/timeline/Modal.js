import React from "react";
import { useEffect } from "react";
import { styled } from "styled-components";

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
      <Container>모달</Container>
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
  width: 400px;
  height: 248px;
  border-radius: 9px;
  background: #fff;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
