import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../Profile";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import { useEffect } from "react";

function Book({ friend }) {
  const [pageNum, setPageNum] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const handle = useFullScreenHandle();

  const onClickLeft = () => {
    pageNum > 1 && setPageNum((pageNum) => pageNum - 2);
  };
  const onClickRight = () => {
    pageNum < friend.pages.length - 2 && setPageNum((pageNum) => pageNum + 2);
  };

  const onFullScreen = () => {
    setFullScreen((prev) => !prev);
    fullScreen ? handle.exit() : handle.enter();
  };

  // const onKeyDown = (event) => {
  //   if (event.keyCode === 27) {
  //     console.log("on Esc");
  //     setFullScreen((prev) => !prev);
  //   }
  //   if (event.keyCode === 122) {
  //     console.log("on F11");
  //     //setFullScreen((prev) => !prev);
  //   }
  // };
  // useEffect(() => {
  //   //window.addEventListener("keydown", onKeyDown);

  //   if (document.fullscreenElement !== null) {
  //     setFullScreen(true);
  //     console.log("전체화면");
  //   } else {
  //     setFullScreen(false);
  //     console.log("일반화면");
  //   }
  // }, [document.fullscreenElement]);

  console.log(fullScreen);
  return (
    <FullScreen handle={handle}>
      <Root fullScreen={fullScreen}>
        <Container>
          <ProfileWrapper>
            <Profile
              userId={friend.userId}
              profileImage={friend.profileImage}
              nickname={friend.nickname}
            />
            <FullScreenButton onClick={onFullScreen}>전체화면</FullScreenButton>
          </ProfileWrapper>
          <PageContainer>
            <Page
              book={friend}
              pageNum={pageNum}
              onclick={onClickLeft}
              side="left"
              buttonLeft="0px"
              buttonRight="auto"
              pageNumLeft="4px"
              pageNumRight="auto"
              fullScreen={fullScreen}
            />
            <Page
              book={friend}
              pageNum={pageNum + 1}
              onclick={onClickRight}
              side="right"
              buttonLeft="auto"
              buttonRight="0px"
              pageNumLeft="auto"
              pageNumRight="4px"
              fullScreen={fullScreen}
            />
          </PageContainer>
        </Container>
      </Root>
    </FullScreen>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  background: white;
  height: ${(props) => props.fullScreen && "95vh"};
`;

const Container = styled.div`
  border: 1px solid red;
  margin: 20px;
`;

const ProfileWrapper = styled.div`
  margin: 10px;
  margin-top: 15px;
  display: flex;
`;

const PageContainer = styled.div`
  display: flex;
`;

const FullScreenButton = styled.button`
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;

export default Book;
