import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Page from "./Page";
import Profile from "../common/Profile";
import Cover from "./Cover";
import Modal from "./Modal";
import { IoIosMore } from "react-icons/io";
import { TbNotebook, TbNotes } from "react-icons/tb";
import { createCover, createImage } from "../../api/books";
import { main } from "../../ColorPalette.js";

function Book({ bookId, title, texts }) {
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [cover, setCover] = useState("");
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(0);

  //팔레트
  // useEffect(() => {
  //   main();
  // }, []);

  const onClickLeft = () => {
    if (pageNum > 1) {
      setPageNum((prev) => prev - 2); //앞장으로 넘어가기
      // setRefresh((prev) => prev + 1); //재렌더링
    } else {
      setPageNum((prev) => prev - 1); //내용에서 표지로 넘어가기
    }
  };
  const onClickRight = () => {
    if (pageNum === 0) {
      setPageNum((prev) => prev + 1); // 표지에서 내용으로 넘어가기
      // setRefresh((prev) => prev + 1); //재렌더링
    } else if (pageNum <= texts.length - 2) {
      setPageNum((prev) => prev + 2); //뒷장으로 넘어가기
      // setRefresh((prev) => prev + 1); //재렌더링
    }
  };

  //api 호출
  useEffect(() => {
    //표지 생성
    async function fetchCover() {
      const coverData = await createCover(bookId);
      setCover(coverData);
      setRefresh((prev) => prev + 1); //재렌더링
    }
    fetchCover();
  }, []);

  useEffect(() => {
    //일러스트 여러개 생성
    async function fetchImages() {
      texts.forEach(async (_, pageNum) => {
        let newImages = images;
        newImages[pageNum] = await createImage(bookId, pageNum);
        setImages(newImages);
        setRefresh((prev) => prev + 1); //재렌더링
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
      {open && <Modal open={open} setOpen={setOpen} />}
      <Container>
        <Header>
          <Profile
            userId={0}
            profileImage="https://t4.ftcdn.net/jpg/05/65/24/45/1000_F_565244595_9DSsL5nS0nefC3wvjRLybz6UZt1JHvxM.jpg"
            nickname="Jamie"
          />
          <Button onClick={() => setOpen((prev) => !prev)}>
            <IoIosMore size={25} color="#78b9ff" />
          </Button>
        </Header>
        {pageNum === 0 ? (
          <Cover
            coverUrl={cover && cover}
            title={title}
            onclick={onClickRight}
            side="right"
            buttonLeft="auto"
            buttonRight="0px"
          />
        ) : (
          <PageContainer>
            <Page
              imgUrl={images[pageNum - 1] && images[pageNum - 1].imgUrl}
              refresh={refresh}
              bookId={bookId}
              text={texts[pageNum - 1]}
              pageNum={pageNum}
              onclick={onClickLeft}
              side="left"
              buttonLeft="0px"
              buttonRight="auto"
              pageNumLeft="20px"
              pageNumRight="auto"
            />
            {
              pageNum < texts.length && (
                <Page
                  imgUrl={images[pageNum] && images[pageNum].imgUrl}
                  refresh={refresh}
                  bookId={bookId}
                  text={texts[pageNum]}
                  pageNum={pageNum + 1}
                  onclick={onClickRight}
                  side="right"
                  buttonLeft="auto"
                  buttonRight="0px"
                  pageNumLeft="auto"
                  pageNumRight="20px"
                />
              )
              //: (
              //   // 엔딩페이지
              //   <Page
              //     imgUrl="https://as2.ftcdn.net/v2/jpg/05/27/32/19/1000_F_527321970_wMLCe02I03RKjG7Ft64fmDmCITmAYeGM.jpg"
              //     bookId={bookId}
              //     text=""
              //     pageNum=""
              //     onclick={onClickRight}
              //     side="right"
              //     buttonLeft="auto"
              //     buttonRight="0px"
              //     pageNumLeft="auto"
              //     pageNumRight="20px"
              //   />
              // )
            }
          </PageContainer>
        )}
      </Container>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

const Container = styled.div`
  margin: 20px;
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

const PageContainer = styled.div`
  display: flex;
`;

export default Book;
