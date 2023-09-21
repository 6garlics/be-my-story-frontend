import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Book from "../components/timeline/Book";
import { getMyInfo, getUserInfo } from "./../api/users";
import { createCover, createImage } from "../api/AIbooks";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { setSaved, thunkCreateImage } from "../redux/bookSlice";
import { postBook } from "../api/books";

const NewBookDetail = () => {
  // const [coverUrl, setCoverUrl] = useState();
  // const [images, setImages] = useState();
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newImages, setNewImages] = useState();
  const [bookId, setBookId] = useState();

  //Redux의 상태 꺼내오기
  const title = useSelector((state) => state.book.title);
  const texts = useSelector((state) => state.book.texts);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const images = useSelector((state) => state.book.images);
  const imageCnt = useSelector((state) => state.book.imageCnt);
  const saved = useSelector((state) => state.book.saved);
  console.log(coverUrl);
  console.log(images);

  useEffect(() => {
    async function saveBook() {
      //동화책이 완성됐지만 아직 저장되지 않았다면
      if (title && texts.length !== 0 && imageCnt === texts.length && !saved) {
        //최초 동화책 저장
        const body = {
          diaryId: location.state.diaryId,
          title: title,
          genre: location.state.genre,
          coverUrl: coverUrl,
          date: location.state.date,
          pages: texts.map((text, index) => ({
            text: text,
            imgUrl: images[index],
            x: 0,
            y: 0,
          })),
        };
        console.log(body);
        const BookData = await postBook(body);
        setBookId(BookData);
        setSaved(true); //저장됐다고 표시
      }
    }
    saveBook();
  }, [imageCnt]);

  //누락된 일러스트 재요청
  // useEffect(() => {
  //   location.texts.forEach(async (text, pageNum) => {
  //     if (images[pageNum] === "") {
  //       dispatch(
  //         thunkCreateImage({
  //           pageNum: pageNum,
  //           body: {
  //             text: text,
  //           },
  //         })
  //       );
  //     }
  //   });
  // }, []);

  return (
    <Root>
      <Book
        bookId={location.state.bookId}
        userName={location.state.userName}
        title={location.state.title}
        texts={location.state.texts}
        coverUrl={coverUrl}
        images={images}
      />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

export default NewBookDetail;
