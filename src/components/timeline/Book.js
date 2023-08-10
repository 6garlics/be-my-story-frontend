import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "../common/Page";
import Profile from "../common/Profile";
import Cover from "./Cover";
import DiaryModal from "./DiaryModal";
import { IoIosMore } from "react-icons/io";
import { TbNotebook, TbNotes } from "react-icons/tb";
import { createCover, createImage } from "../../api/books";
import { main } from "../../ColorPalette.js";

function Book({
  bookId,
  title = "자전거 모험",
  texts = ["첫번째", "두번째", "세번째"],
}) {
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [cover, setCover] = useState("");
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(0);

  //팔레트
  // useEffect(() => {
  //   main();
  // }, []);

  const onLeftClick = () => {
    if (pageNum > 0) {
      setPageNum((prev) => prev - 1);
    }
  };
  const onRightClick = () => {
    if (pageNum < texts.length) {
      setPageNum((prev) => prev + 1);
    }
  };

  //표지 생성
  useEffect(() => {
    async function fetchCover() {
      try {
        const coverData = await createCover(bookId);
        setCover(coverData);
        setRefresh((prev) => prev + 1); //재렌더링
      } catch (err) {
        setCover("/images/dummy3.png");
      }
    }
    fetchCover();
  }, []);

  //일러스트 여러개 생성
  useEffect(() => {
    async function fetchImages() {
      texts.forEach(async (_, pageNum) => {
        let newImages = images;
        try {
          newImages[pageNum] = await createImage(bookId, pageNum);
          setImages(newImages);
          setRefresh((prev) => prev + 1); //재렌더링
        } catch (err) {
          newImages[pageNum] = "/images/bike1.png";
          setImages(newImages);
          setRefresh((prev) => prev + 1); //재렌더링
        }
      });
    }
    fetchImages();
  }, []);

  console.log("Book - coverUrl", cover.coverUrl);

  return (
    <Root>
      {/* <img id="img" src="/images/dummy1.png" />
      <canvas id="canvas"></canvas>
      <div id="palette"></div>
      <hr />
      <div id="complementary"></div> */}
      {open && <DiaryModal open={open} setOpen={setOpen} />}
      <Container $pageNum={pageNum}>
        <Header>
          <Profile
            userId={0}
            profileImage="https://t4.ftcdn.net/jpg/05/65/24/45/1000_F_565244595_9DSsL5nS0nefC3wvjRLybz6UZt1JHvxM.jpg"
            nickname="Jamie"
          />
          <Button onClick={() => setOpen((prev) => !prev)}>
            <IoIosMore size={25} color="white" />
          </Button>
        </Header>
        <Wrapper>
          {pageNum === 0 ? (
            <Cover
              coverUrl={cover && cover}
              title={title}
              onclick={onRightClick}
              side="right"
              buttonLeft="auto"
              buttonRight="0px"
            />
          ) : (
            <Page
              imgUrl={images[pageNum - 1].imgUrl}
              text={texts[pageNum - 1]}
              pageNum={pageNum}
              onLeftClick={onLeftClick}
              onRightClick={onRightClick}
            />
          )}
        </Wrapper>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: ${(props) => (props.$pageNum === 0 ? "50%" : "100%")};
  padding: 50px 0;
  box-sizing: border-box;
  transition: all 0.5s ease-in-out;
`;

const Header = styled.div`
  margin: 10px 0px;
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-left: auto;
  margin-top: 12px;
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Book;
